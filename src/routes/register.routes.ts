import { Router, Request, Response } from 'express';
import { validateRegister, hashPassword, saveUser } from '../helpers/registerHelpers';
export const registerRoutes = Router();


registerRoutes.post('/register', async (req: Request, res: Response) => {

    try {
        // validate user
        const registerValidation = await validateRegister(req);
        if (registerValidation) return res.status(registerValidation.status).json({ error: registerValidation.error });

        // hash contraseña
        const hashedPassword = await hashPassword(req.body.password);

        await saveUser(req, res, hashedPassword);


    } catch (error) {
        res.status(400).json({error})
    }
})
