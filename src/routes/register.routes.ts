import { Router } from 'express';
export const registerRoutes = Router();
import { registerPostController } from "../controllers/registerControllers";

registerRoutes.post('/register', registerPostController )

