const jwt = require('jsonwebtoken')
import { Router, Request, Response, NextFunction } from 'express';
const User = require('../models/user');

declare module 'express' {
    export interface Request {
      User?: any; 
    }
  }

// middleware to validate token (rutas protegidas)
const verifyToken = (req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.User = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;