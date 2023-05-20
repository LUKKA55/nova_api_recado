import { NextFunction, Request, Response } from 'express';
import { RecadoService } from '../services/recado.service';
import { RecadoController } from '../controllers/recado.controller';
import { database } from '../models/dbMock.class';

const service = new RecadoService(database);
const controller = new RecadoController(service);

export const validationIdUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user_id = req.params.user_id;
	const validationId = controller.service.database.userAll.find(
		(user) => user.id === user_id
	);
	if (!validationId) {
		return res.status(400).send('ID do usuário não encontrado.');
	}
	next();
};
