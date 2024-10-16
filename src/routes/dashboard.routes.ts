import { Router, Request, Response } from 'express'
export const dashboadRoutes = Router()

dashboadRoutes.get('/dashboard', (req: Request, res: Response) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.body.User
        }
    })
})

