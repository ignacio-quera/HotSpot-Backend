import express from 'express';
import { loginRoutes } from './login.routes';
import { registerRoutes } from './register.routes';
import { dashboadRoutes } from './dashboard.routes';

export const routes = express.Router();

routes.use(loginRoutes);
routes.use(registerRoutes);
routes.use(dashboadRoutes);