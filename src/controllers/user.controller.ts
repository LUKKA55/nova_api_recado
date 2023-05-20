import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { ParsedQs } from 'qs';

export class UserController {
	constructor(public service: UserService) {
		this.service = service;
	}

	createUser_handle(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const response = this.service.createUser_execute({
			name,
			email,
			password,
		});

		if (response) {
			return res
				.status(200)
				.json({ message: 'Cadastrado com SUCESSO.', data: response });
		}

		return res.status(404).send('Usuário não cadastrado.');
	}

	getAllUser_handle(req: Request, res: Response) {
		const response = this.service.getAllUser_execute();
		if (!response) {
			return res.status(200).send('Sem usuários.');
		}
		return res.status(200).json({ ok: true, data: response });
	}

	getUserById_handle(req: Request, res: Response) {
		const id = req.params.id;
		const response = this.service.getUserById_execute(id);
		if (!response) {
			return res.status(404).send('User não encontrado');
		}
		return res.status(200).json({ data: response });
	}

	deleteUser_handle(req: Request, res: Response) {
		const id = req.params.id;
		const response = this.service.deleteUser_execute(id);
		if (!response) {
			return res.status(404).send('ERROR no delete');
		}
		return res.status(200).json({
			message: `Usuário de id ${id} deletado com SUCESSO`,
			data: response,
		});
	}

	updateUser_handle(req: Request, res: Response) {
		const id = req.params.id;
		const { name, email, password } = req.body;

		const response = this.service.updateUser_execute({
			id,
			name,
			email,
			password,
		});
		if (!response) {
			return res.status(404).send('ERROR no update');
		}
		return res.status(200).json({
			message: `Usuário de id ${id} alterado com SUCESSO`,
			data: response,
		});
	}
	loginUser_handle(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const response = this.service.loginUser_execute({
			name,
			email,
			password,
		} as IUser);
		if (!response) {
			return res.status(200).json({ message: 'ERROR no login' });
		}
		return res.status(200).json({
			message: `Login feito com SUCESSO.`,
			data: response,
		});
	}
}
