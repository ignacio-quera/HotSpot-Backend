import { Router, Request } from 'express'
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
export const loginRoutes = Router();

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})


export const validateLogin = async (req: Request) => {
    try{

        const { error } = schemaLogin.validate(req.body);
        if (error) return { status: 400, error: error.details[0].message };
        
    const user = await User.findOne({ email: req.body.email });
    if (!user) return { status: 400, error: 'Usuario no encontrado' };
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return { status: 400, error: 'Contraseña no válida' };
    
    return { status: 200, user };
    }
    catch (error) {
        throw new Error('Error validating user');
    }
};
