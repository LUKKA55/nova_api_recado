import { NextFunction, Request, Response } from 'express';
import { RecadoService } from '../recado/service/recado.service';
import { RecadoController } from '../recado/controller/recado.controller';
import { recado_repository } from '../recado/recado.repository';
import { envs } from '../../envs/envs';
import jwt from 'jsonwebtoken';
import { DatabaseConnection } from '../../../main/database';
import { TableUser } from '../../shared/database/entities/TableUser';

const service = new RecadoService(recado_repository);
const controller = new RecadoController(service);

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

export const validateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.headers.authorization as string;
	const secret = envs.JWT_KEY as string;
	jwt.verify(authorization, secret, (error, decoded) => {
		if (error) {
			return res
				.status(401)
				.json({ message: 'Erro de token faça login novamente.' });
		}
		next();
	});
};

export const validateDataUser = async (
	name: string,
	email: string,
	password: string
) => {
	if (name) {
		if (
			(await DatabaseConnection.client
				.getRepository(TableUser)
				.findOne({ where: { name: name } })) !== null
		) {
			throw new Error('Nome já existe');
		}
	}
	if (email) {
		if (
			(await DatabaseConnection.client
				.getRepository(TableUser)
				.findOne({ where: { email: email } })) !== null
		) {
			throw new Error('Email já existe');
		}
	}
	if (password) {
		if (password.length < 8 || password.split(' ').length >= 2) {
			throw new Error('Password inválido');
		}
	}
};

export const validateGetByIdUser = async (id: string) => {
	if (
		(await DatabaseConnection.client.getRepository(TableUser).findOne({
			where: { uid: id },
		})) === null
	) {
		throw new Error('User não encontrado');
	}
};
