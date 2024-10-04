import { Request, Response } from 'express'
const { Event } = require('../../models/events');

const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

const getEvent = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener evento' });
    }
}

const createEvent = async (req: Request, res: Response) => {
    try {
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            coordinates: req.body.coordinates
        });
        const savedEvent = await event.save();
        res.json(savedEvent);
    }  catch (error) {
        res.status(400).json({ error: 'Error al crear evento' });
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar evento' });
    }
}

const updateEvent = async (req: Request, res: Response) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar evento' });
    }
}            

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent
};