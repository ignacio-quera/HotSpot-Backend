import { Request, Response } from "express";
const  Location = require("../models/locations");
const LocationReview = require("../models/locationReviews");
import { generatePresignedUrl } from "../services/imageUploader";
const { sendPushNotifications } = require('../services/pushNotificationService');


export const locationsGetController = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const locationGetController = async (req: Request, res: Response) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: "Ubicación no encontrada" });
        }
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener ubicación" });
    }
};

export const locationPostController = async (req: Request, res: Response) => {
    try {
        const location = new Location({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            coordinates: req.body.coordinates
        });
        if (req.body.fileType) {
            const fileName = `location-${location._id}`;
            const fileType = req.body.fileType;
            const imageURL = await generatePresignedUrl(fileName, fileType);
            if (imageURL != "error") {
                await location.save()
                const locationWithImage = {
                    ...location._doc,
                    imageURL
                }
                console.log(locationWithImage);
                res.json(locationWithImage);
            }
            else{
                throw new Error("Error al subir imagen");
            }
        }
        else {
            await location.save();
            res.json(location);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error al crear ubicación" });
    }
};


export const locationDeleteController = async (req: Request, res: Response) => {
    try {
        const locationId = req.params.id;
        const location = await Location.findByIdAndDelete(locationId);
        const deletedLocationReviews = await LocationReview.deleteMany({ locationId });
        console.log(deletedLocationReviews);
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar ubicación" });
    }
};

export const locationPutController = async (req: Request, res: Response) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!location) {
            return res.status(404).json({ error: "Ubicación no encontrada" });
        }
        await location.save();
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar ubicación" });
    }
};

// export const locationPicturePostController = async (req: Request, res: Response) => {
//     try {
//         const location = await Location.findById(req.params.id);
//         if (!location) {
//             return res.status(404).json({ error: "Ubicación no encontrada" });
//         }
//         await generatePresignedUrl(req, res);

//     } catch (error) {
//         res.status(400).json({ error: "Error al subir imagen" });
//     }
// };
