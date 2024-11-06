const jwt = require('jsonwebtoken')
import { Router, Request, Response, NextFunction } from 'express';
const User = require('../models/user');

declare module 'express' {
    export interface Request {
      User?: any; 
    }
  }


export const verifyToken = (req: Request, res: Response, next: NextFunction ) => {

    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')[1]
    
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.User = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}
