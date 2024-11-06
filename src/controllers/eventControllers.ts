import { Request, Response } from 'express';
const Event = require('../models/events');

export const eventsGetController = async (req: Request, res: Response) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno' })
    }
}

export const eventGetController = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json(event);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al obtener evento' });
    }
}

export const eventPostController = async (req: Request, res: Response) => {
    try {
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            coordinates: req.body.coordinates,
            date: req.body.date
        });
        const savedEvent = await event.save();
        res.json(savedEvent);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al crear evento' });
    }
}

export const eventDeleteController = async (req: Request, res: Response) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        res.json(event);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al eliminar evento' });
    }
}

export const eventPutController = async (req: Request, res: Response) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        await event.save();
        res.json(event);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al actualizar evento' });
    }
} 