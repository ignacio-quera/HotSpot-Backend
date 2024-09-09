import { Router, Request, Response } from 'express'
const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req: Request, res: Response) => {
    try{ 

        // validaciones
        const { error } = schemaLogin.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message })
        
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

        // const token = jwt.sign({
        //     name: user.name,
        //     id: user._id
        // }, process.env.TOKEN_SECRET)
        const token = jwt.sign({ _id: user._id }, 
            process.env.TOKEN_SECRET, 
            { expiresIn: '1h' });

        
        res.header('auth-token', token).json({
            error: null,
            data: {token}
        })
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
})

module.exports = router;