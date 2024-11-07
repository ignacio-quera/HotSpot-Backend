import { Request, Response } from "express";
const  LocationReview = require("../models/locationReviews");
import { updateLocationScore } from "../helpers/locationReviewHelpers";

export const locationReviewsGetController = async (req: Request, res: Response) => {
    try {
        const locationId = req.params.locationId;
        const locationReviews = await LocationReview.find({ locationId });
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
        res.json(locationReview);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error al obtener reseña" });
    }
};

export const locationReviewPostController = async (req: Request, res: Response) => {
    try {
        const locationReview = new LocationReview({
            title: req.body.title,
            description: req.body.description,
            locationId: req.params.locationId,
            rating: req.body.rating,
            userId: req.User._id
        });
        const savedLocationReview = await locationReview.save();
        await updateLocationScore(req.params.locationId);
        res.json(savedLocationReview);
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
        const locationReview = await LocationReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!locationReview) {
            return res.status(404).json({ error: "Reseña no encontrada" });
        }
        await locationReview.save();
        const locationId = locationReview.locationId;
        await updateLocationScore(locationId);
        res.json(locationReview);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar reseña" });
    }
};
