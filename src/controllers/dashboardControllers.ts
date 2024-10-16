import { Request, Response } from 'express'
export const dashboardGetController = async (req: Request, res: Response) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.body.User
        }
    })
}

