import express from 'express';
import userRoutes from './user.routes';
import recadoRoutes from './recado.routes';

export const makeRoutes = (api: express.Application) => {
	api.use('/users', userRoutes);
	api.use('/recados', recadoRoutes);
};
