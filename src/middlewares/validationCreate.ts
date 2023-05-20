import { NextFunction, Request, Response } from 'express';
import { RecadoService } from '../services/recado.service';
import { RecadoController } from '../controllers/recado.controller';
import { database } from '../models/dbMock.class';

const service = new RecadoService(database);
const controller = new RecadoController(service);

export const validationCreate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	if (email) {
		const userEmail = controller.service.database.userAll.find(
			(user) => user.email === email
		);
		if (userEmail) {
			return res.status(200).json({ message: 'Email de usuário já usado.' });
		}
		if (!email.match(/\S+@\S+\.\S+/)) {
			return res.status(400).json({ message: 'Email inválido' });
		}
	}
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
