import { Request, Response } from 'express';
import { RecadoService } from '../service/recado.service';
import { IRecado } from '../../../models/interfaces/recado.interface';
import { getIdByToken } from '../../../utils/getIdByToken';
import { validateGetByIdUser } from '../../user/middlewares';
import { validateGetByIdRecado } from '../middlewares';

export class RecadoController {
	constructor(public service: RecadoService) {
		this.service = service;
	}

	async insertRecado_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const { title, text } = req.body;
			const response = await this.service.insertRecado_execute({
				title,
				text,
				user_id,
			} as IRecado);

			return res.status(200).json({ ok: true, data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getAllRecado_handle(req: Request, res: Response) {
		try {
			const response = await this.service.getAllRecado_execute();
			if (!response.length) {
				return res.status(200).json({ message: 'Sem recados.' });
			}
			return res.status(200).json({ data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getAllRecadoByUser_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const response = await this.service.getAllRecadoByUser_execute(
				user_id as string
			);
			if (!response.length) {
				return res.status(200).json({ message: 'Usuário sem recados.' });
			}
			return res.status(200).json({ data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getAllRecadoById_handle(req: Request, res: Response) {
		try {
			const recado_id = req.params.recado_id;
			await validateGetByIdRecado(recado_id);
			const response = await this.service.getAllRecadoById_execute(
				recado_id as string
			);
			return res.status(200).json({ data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async deleteOneRecado_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const recado_id = req.params.recado_id;
			await validateGetByIdRecado(recado_id);
			const response = await this.service.deleteOneRecado_execute(
				recado_id,
				user_id
			);
			return res
				.status(200)
				.json({ message: 'Deletado com sucesso.', response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async updateRecado_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const id = req.params.recado_id;
			await validateGetByIdRecado(id);
			const { title, text } = req.body;
			const response = await this.service.updateRecado_execute(
				{
					id,
					title,
					text,
				} as IRecado,
				user_id
			);
			return res
				.status(200)
				.json({ message: 'atualizado com sucesso', data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async arquivaRecado_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const recado_id = req.params.recado_id;
			await validateGetByIdRecado(recado_id);
			const response = await this.service.arquivaRecado_execute(
				recado_id,
				user_id
			);
			return res.status(200).json({ message: 'Arquivado', data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async desarquivarRecado_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const recado_id = req.params.recado_id;
			await validateGetByIdRecado(recado_id);
			const response = await this.service.desarquivarRecado_execute(
				recado_id,
				user_id
			);
			return res.status(200).json({ message: 'Desarquivado', data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getAllRecadoByUserStatusTrue_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const response = await this.service.getAllRecadoByUserStatusTrue_execute(
				user_id as string
			);
			if (!response.length) {
				return res.status(200).json({ message: 'Sem recados ativos.' });
			}
			return res.status(200).json({ data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getAllRecadoByUserStatusFalse_handle(req: Request, res: Response) {
		try {
			const user_id = getIdByToken(req.headers.authorization as string);
			const response = await this.service.getAllRecadoByUserStatusFalse_execute(
				user_id as string
			);
			if (!response.length) {
				return res.status(200).json({ message: 'Sem recados arquivados.' });
			}
			return res.status(200).json({ data: response });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(404).json({ message: error.message });
			}
		}
	}

	async getAllRecadoFilterTrueUser_handle(req: Request, res: Response) {
		const user_id = getIdByToken(req.headers.authorization as string);
		const title = req.query.title;
		const response = await this.service.getAllRecadoFilterTrueUser_execute(
			user_id,
			title as string
		);
		if (!response.length) {
			return res.status(200).json({ message: 'Nenhum recado encontrado.' });
		}
		return res.status(200).json({ data: response });
	}

	async getAllRecadoFilterFalseUser_handle(req: Request, res: Response) {
		const user_id = getIdByToken(req.headers.authorization as string);
		const title = req.query.title;
		const response = await this.service.getAllRecadoFilterFalseUser_execute(
			user_id,
			title as string
		);
		if (!response.length) {
			return res.status(200).json({ message: 'Nenhum recado encontrado.' });
		}
		return res.status(200).json({ data: response });
	}
}
