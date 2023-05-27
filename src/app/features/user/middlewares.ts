import { NextFunction, Request, Response } from 'express';
import { RecadoService } from '../recado/service/recado.service';
import { RecadoController } from '../recado/controller/recado.controller';
import { recado_repository } from '../recado/recado.repository';

const service = new RecadoService(recado_repository);
const controller = new RecadoController(service);

export const validationCreate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { password } = req.body;

	if (password) {
		if (
			String(password).split('').length < 8 ||
			String(password).split(' ').length > 2
		) {
			return res.status(400).json({ message: 'Senha inválida' });
		}
	}
	next();
};

export const validationBody = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (Object.values(req.body).some((ele) => !ele)) {
		return res.status(418).json({ message: 'Preencha todos os campos.' });
	}
	next();
};
