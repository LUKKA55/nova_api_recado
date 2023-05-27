import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { IUser } from '../../../models/interfaces/user.interface';
import { ParsedQs } from 'qs';

export class UserController {
	constructor(public service: UserService) {
		this.service = service;
	}

	async createUser_handle(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const response = await this.service.createUser_execute({
			name,
			email,
			password,
		});

		if (response instanceof Error) {
			return res.status(404).json({ message: response.message });
		}
		return res
			.status(200)
			.json({ message: 'Cadastrado com SUCESSO.', data: response });
	}

	async getAllUser_handle(req: Request, res: Response) {
		const response = await this.service.getAllUser_execute();

		if (!response.length) {
			return res.status(200).send('Sem usuários.');
		}
		return res.status(200).json({ ok: true, data: response });
	}

	async getUserById_handle(req: Request, res: Response) {
		const id = req.params.id;
		const response = await this.service.getUserById_execute(id);
		if (!response) {
			return res.status(404).json({ message: 'User não encontrado' });
		}
		return res.status(200).json({ data: response });
	}

	async deleteUser_handle(req: Request, res: Response) {
		const id = req.params.id;
		const response = await this.service.deleteUser_execute(id);
		if (!response) {
			return res.status(404).json({ message: 'ERROR no delete' });
		}
		return res.status(200).json({
			message: `Usuário de id ${id} deletado com SUCESSO`,
		});
	}

	async updateUser_handle(req: Request, res: Response) {
		const id = req.params.id;
		const { name, email, password } = req.body;

		const response = await this.service.updateUser_execute({
			id,
			name,
			email,
			password,
		});
		if (response instanceof Error) {
			return res.status(404).json({ message: response.message });
		}
		return res.status(200).json({
			message: `Usuário de id ${id} alterado com SUCESSO`,
			data: response,
		});
	}

	async loginUser_handle(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const response = await this.service.loginUser_execute({
			name,
			email,
			password,
		} as IUser);
		if (!response) {
			return res.status(404).json({ message: 'ERROR no login' });
		}
		return res.status(200).json({
			message: `Login feito com SUCESSO.`,
			data: response,
		});
	}
}
