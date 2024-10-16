import { Router, Request, Response } from 'express'
const jwt = require('jsonwebtoken');
import { validateLogin } from '../helpers/loginHelpers';
export const loginRoutes = Router();


loginRoutes.post('/login', async (req: Request, res: Response) => {
    try{ 

        // Validaciones
        const loginValidation = await validateLogin(req);
        if (loginValidation.status != 200){
            return res.status(loginValidation.status).json({ error: loginValidation.error });
        }
        const user = loginValidation.user;

        // Crear token
        const token = jwt.sign({ _id: user._id }, 
            process.env.TOKEN_SECRET, 
            { expiresIn: '1h' });

        // Enviar Response
        res.header('auth-token', token).json({
            error: null,
            data: {token}
        })
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
    
})

