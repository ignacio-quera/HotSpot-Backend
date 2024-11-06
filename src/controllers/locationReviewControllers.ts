import { Request, Response } from "express";
const  LocationReview = require("../models/locationReviews");
import { updateLocationScore } from "../helpers/locationReviewHelpers";

export const locationReviewsGetController = async (req: Request, res: Response) => {
    try {
        const locationReviews = await LocationReview.find({where: {locationId: req.params.locationId}});
        res.json(locationReviews);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const locationReviewGetController = async (req: Request, res: Response) => {
    try {
        const locationReview = await LocationReview.findById(req.params.id);
        if (!locationReview) {
            return res.status(404).json({ error: "Review no encontrada" });
        }
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener reseña" });
    }
};

export const locationReviewPostController = async (req: Request, res: Response) => {
    try {
        const locationReview = new LocationReview({
            title: req.body.title,
            description: req.body.description,
            locationId: req.params.locationId,
            rating: req.body.rating
        });
        const savedLocationReview = await locationReview.save();
        res.json(savedLocationReview);
        await updateLocationScore(req.body.locationId);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error al crear reseña" });
    }
};


export const locationReviewDeleteController = async (req: Request, res: Response) => {
    try {
        const locationReview = await LocationReview.findByIdAndDelete(req.params.id);
        res.json(locationReview);
        await updateLocationScore(req.body.locationId);
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar reseña" });
    }
};

export const locationReviewPutController = async (req: Request, res: Response) => {
    try {
        const location = await LocationReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!location) {
            return res.status(404).json({ error: "Reseña no encontrada" });
        }
        await location.save();
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar reseña" });
    }
};
