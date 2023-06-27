import { NextFunction, Request, Response } from 'express';
import { DatabaseConnection } from '../../../main/database';
import { TableUser } from '../../shared/database/entities/TableUser';
import { TableRecado } from '../../shared/database/entities/TableRecado';

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

export const validateGetByIdRecado = async (id_recado: string) => {
	if (
		(await DatabaseConnection.client
			.getRepository(TableRecado)
			.findOne({ where: { uid: id_recado } })) === null
	) {
		throw new Error('Recado não encontrado');
	}
};
