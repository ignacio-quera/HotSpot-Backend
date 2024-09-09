const router = require('express').Router();
import { Router, Request, Response } from 'express'

router.get('/', (req: Request, res: Response) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.User
        }
    })
})

module.exports = router