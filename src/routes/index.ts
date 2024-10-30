import express from 'express';
import { loginRoutes } from './login.routes';
import { registerRoutes } from './register.routes';
import { dashboadRoutes } from './dashboard.routes';
import { eventRoutes } from './event.routes';
import { locationRoutes } from './location.routes';

export const routes = express.Router();

routes.use(loginRoutes);
routes.use(registerRoutes);
routes.use(dashboadRoutes);
routes.use(eventRoutes);
routes.use(locationRoutes);