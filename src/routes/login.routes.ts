import { Router } from 'express';
export const loginRoutes = Router();
import { loginPostController } from "../controllers/loginControllers";

loginRoutes.post('/login', loginPostController);
