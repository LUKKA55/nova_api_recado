import { DatabaseConnection } from '../../../main/database';
import { IUser } from '../../models/interfaces/user.interface';
import { User } from '../../models/user.class';
import { TableUser } from '../../shared/database/entities/TableUser';
import newDate from '../../utils/newDate';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { envs } from '../../envs/envs';

export class UserRepository {
	async getAllUser(): Promise<IUser[]> {
		const allUser = await DatabaseConnection.client
			.getRepository(TableUser)
			.find();

		if (!allUser.length) {
			throw new Error('Sem usuários');
		}

		const compileUser = allUser.map((user) => {
			return new User(
				user.name,
				user.email,
				user.password,
				user.uid,
				user.created_at,
				user.updated_at
			);
		});
		return compileUser;
	}

	async getUserById(id: string) {
		const userById = await DatabaseConnection.client
			.getRepository(TableUser)
			.findOne({
				where: { uid: id },
			});
		if (userById !== null) {
			const compileUser = new User(
				userById.name,
				userById.email,
				userById.password,
				userById.uid,
				userById.created_at,
				userById.updated_at
			);
			return compileUser;
		}
	}

	async createUser({ name, email, password }: IUser) {
		const createUser = DatabaseConnection.client
			.getRepository(TableUser)
			.create({
				uid: v4(),
				name: name,
				email: email,
				password: password,
				created_at: newDate(),
				updated_at: newDate(),
			})
			.save();
	}

	async deleteUser(id: string) {
		const deleteUser = await DatabaseConnection.client
			.getRepository(TableUser)
			.delete({
				uid: id,
			});
		return deleteUser;
	}

	async updateUser({ id, name, email, password }: IUser) {
		await DatabaseConnection.client.getRepository(TableUser).update(
			{ uid: id },
			{
				name: name ? name : undefined,
				email: email ? email : undefined,
				password: password ? password : undefined,
				updated_at: newDate(),
			}
		);
		const findUpdate = await DatabaseConnection.client
			.getRepository(TableUser)
			.findOne({
				where: { uid: id },
			});

		if (findUpdate !== null) {
			const compileUser = new User(
				findUpdate.name,
				findUpdate.email,
				findUpdate.password,
				findUpdate.uid,
				findUpdate.created_at,
				findUpdate.updated_at
			);
			return compileUser;
		}
	}

	async loginUser({ name, email, password }: IUser) {
		const loginUser = await DatabaseConnection.client
			.getRepository(TableUser)
			.findOne({
				where: { name: name, email: email, password: password },
			});
		if (loginUser === null) {
			throw new Error('Erro ao fazer login.');
		}
		const token = jwt.sign(
			{
				uid: loginUser.uid,
				name: loginUser.name,
				email: loginUser.email,
			},
			envs.JWT_KEY,
			{ expiresIn: '200h' }
		);

		return { token: token, uid: loginUser.uid, name: loginUser.name };
	}
}

export const user_repository = new UserRepository();
