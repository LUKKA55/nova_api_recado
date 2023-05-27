import express from 'express';
import userRoutes from '../../app/features/user/user.routes';
import recadoRoutes from '../../app/features/recado/recado.routes';
import { UserController } from '../../app/features/user/controller/user.controller';
import { UserService } from '../../app/features/user/service/user.service';
import { user_repository } from '../../app/features/user/user.repository';
import { RecadoService } from '../../app/features/recado/service/recado.service';
import { RecadoController } from '../../app/features/recado/controller/recado.controller';
import { recado_repository } from '../../app/features/recado/recado.repository';

export const makeRoutes = (api: express.Application) => {
	try {
		api.use('/users', userRoutes);
		api.use('/recados', recadoRoutes);
	} catch (error) {
		if (error instanceof Error) {
			return console.log(`Error config routes message ${error.message}`);
		}
	}
};
