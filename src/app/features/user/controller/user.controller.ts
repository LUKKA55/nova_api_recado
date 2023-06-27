import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { IUser } from '../../../models/interfaces/user.interface';
import { ParsedQs } from 'qs';
import { getIdByToken } from '../../../utils/getIdByToken';
import { validateDataUser, validateGetByIdUser } from '../middlewares';

export class UserController {
	constructor(public service: UserService) {
		this.service = service;
	}

	async createUser_handle(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body;
			await validateDataUser(name, email, password);
			const response = await this.service.createUser_execute({
				name,
				email,
				password,
			});

			return res.status(200).json({ message: 'Cadastrado com SUCESSO.' });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getAllUser_handle(req: Request, res: Response) {
		try {
			const response = await this.service.getAllUser_execute();
			return res.status(200).json({ ok: true, data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getUserById_handle(req: Request, res: Response) {
		try {
			const id = req.params.id;
			await validateGetByIdUser(id);
			const response = await this.service.getUserById_execute(id);
			return res.status(200).json({ data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async deleteUser_handle(req: Request, res: Response) {
		try {
			const id = getIdByToken(req.headers.authorization as string);
			await this.service.deleteUser_execute(id);
			return res.status(200).json({
				message: `Usuário deletado com SUCESSO`,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async updateUser_handle(req: Request, res: Response) {
		try {
			const id = getIdByToken(req.headers.authorization as string);
			const { name, email, password } = req.body;
			await validateDataUser(name, email, password);
			const response = await this.service.updateUser_execute({
				id,
				name,
				email,
				password,
			});
			return res.status(200).json({
				message: `Usuário alterado com SUCESSO`,
				data: response,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async loginUser_handle(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body;
			const response = await this.service.loginUser_execute({
				name,
				email,
				password,
			} as IUser);
			return res.status(200).json({
				message: `Login feito com SUCESSO.`,
				data: response,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}
}
