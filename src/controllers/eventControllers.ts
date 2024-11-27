import { Request, Response } from 'express';
const Event = require('../models/events');
const User = require('../models/user');
const UserEvent = require('../models/userEvents');

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


        await event.save();

        const userEvent = new UserEvent({
            userId: req.User._id,
            eventId: event._id
        });

        await userEvent.save();

        res.json(event);
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

export const eventSubscribeController = async (req: Request, res: Response) => {
    try {
        const event = await
        Event.findByIdAndUpdate(req.body.eventId, { $push: { subscribers: req.User._id } }, { new: true });
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        await event.save();

        const user = await User.findByIdAndUpdate(req.User._id, { $push: { subscribedEvents: req.body.eventId } }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await user.save();

        res.status(200).json({ message: 'Usuario suscrito al evento' });
        res.json(event);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al suscribirse al evento' });
    }
}

export const eventUnsubscribeController = async (req: Request, res: Response) => {
    try {
        const event = await
        Event.findByIdAndUpdate
        (req.body.eventId, { $pull: { subscribers: req.User._id } }, { new: true });
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        await event.save();

        const user = await
        User.findByIdAndUpdate(req.User._id, { $pull: { subscribedEvents: req.body.eventId } }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.save();
        res.status(200).json({ message: 'Usuario desuscrito del evento' });
        res.json(event);

    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al desuscribirse del evento' });
    }
}

export const eventLikeController = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.body.eventId);

        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        if (event.points.includes(req.User._id)) {
            return res.status(400).json({ error: 'El usuario ya ha dado like a este evento' });
        }

        event.points.push(req.User._id);

        if (event.negpoints.includes(req.User._id)) {
            event.negpoints.pull(req.User._id);
        }        

        console.log(event)
        await event.save();

        res.status(204).json({ message: 'Like añadido al evento' });
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al dar like al evento' });
    }

}

export const eventUnlikeController = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.body.eventId);

        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        if (!event.points.includes(req.User._id) && !event.negpoints.includes(req.User._id)) {
            return res.status(204).json({ error: 'El usuario no ha interactuado con este evento' });
        }


        if (event.points.includes(req.User._id)) {
            event.points.pull(req.User._id);
        }

        if (event.negpoints.includes(req.User._id)) {
            event.negpoints.pull(req.User._id);

        }

        await event.save();

        res.status(200).json({ message: 'Like eliminado del evento' });
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al quitar like al evento' });
    }
}

export const eventDislikeController = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.body.eventId);

        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        if (event.negpoints.includes(req.User._id)) {
            return res.status(204).json({ error: 'El usuario ya ha dado dislike a este evento' });
        }

        event.negpoints.push(req.User._id);

        if (event.points.includes(req.User._id)) {
            event.points.pull(req.User._id);
        }

        await event.save();

        res.status(200).json({ message: 'Dislike añadido al evento' });

    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Error al dar dislike al evento' });
    }
};