import { Request, Response } from "express";
const { Location } = require("../../models/locations");

const getAllLocations = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

const getLocation = async (req: Request, res: Response) => {
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

const createLocation = async (req: Request, res: Response) => {
    try {
        const location = new Location({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            coordinates: req.body.coordinates
        });
        const savedLocation = await location.save();
        res.json(savedLocation);
    } catch (error) {
        res.status(400).json({ error: "Error al crear ubicación" });
    }
};


const deleteLocation = async (req: Request, res: Response) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar ubicación" });
    }
};

const updateLocation = async (req: Request, res: Response) => {
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

module.exports = {
    getAllLocations,
    getLocation,
    createLocation,
    deleteLocation,
    updateLocation
};