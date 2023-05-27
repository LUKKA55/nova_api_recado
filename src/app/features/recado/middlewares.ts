import { NextFunction, Request, Response } from 'express';

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
