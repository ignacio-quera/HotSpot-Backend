import { Router, Request, Response } from 'express';
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
export const registerRoutes = Router();

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})



export const validateRegister = async (req: Request) => {
    try {
        const { error } = schemaRegister.validate(req.body)
        
        if (error) return { status: 400, error: error.details[0].message }
        
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return { status: 400, error: 'Email ya registrado' }
    }
    catch (error) {
        throw new Error('Error validating user');
    }
};

export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    catch (error) { 
        throw new Error('Error hashing password');
    }
}

export const saveUser = async (req: Request, res: Response, hashedPassword: string) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        });
    }
    catch (error) {
        throw new Error('Error saving user');
    }
}
