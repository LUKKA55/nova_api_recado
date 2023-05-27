import { pgHelper } from '../../../main/pg-helper';
import { IUser } from '../../models/interfaces/user.interface';
import { User } from '../../models/user.class';
import { TableUser } from '../../shared/database/entities/TableUser';
import newDate from '../../utils/newDate';
import { v4 } from 'uuid';
import { TableRecado } from '../../shared/database/entities/TableRecado';
import { DataSource } from 'typeorm';

export class UserRepository {
	async getAllUser(): Promise<IUser[]> {
		const allUser = await pgHelper.client.getRepository(TableUser).find();

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

	async getUserById(id: string): Promise<IUser | null> {
		const userById = await pgHelper.client.getRepository(TableUser).findOne({
			where: { uid: id },
		});
		if (userById === null) return null;

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

	async createUser({ name, email, password }: IUser): Promise<IUser | Error> {
		if (password.length < 8) {
			return new Error('Password inválido');
		}
		if (
			(await pgHelper.client
				.getRepository(TableUser)
				.findOne({ where: { email: email } })) !== null
		) {
			return new Error('Email já existe');
		}

		const createUser = pgHelper.client.getRepository(TableUser).create({
			uid: v4(),
			name: name,
			email: email,
			password: password,
			created_at: newDate(),
			updated_at: newDate(),
		});

		const save = await pgHelper.client
			.getRepository(TableUser)
			.save(createUser);

		const compileUser = new User(
			save.name,
			save.email,
			save.password,
			save.uid,
			save.created_at,
			save.updated_at
		);
		return compileUser;
	}

	async deleteUser(id: string) {
		const findUser = await pgHelper.client.getRepository(TableUser).findOne({
			where: { uid: id },
		});
		if (findUser === null) return null;
		const deleteUser = await pgHelper.client.getRepository(TableUser).delete({
			uid: id,
		});

		return deleteUser;
	}

	async updateUser({ id, name, email, password }: IUser) {
		if (password) {
			if (
				String(password).split('').length < 8 ||
				String(password).split(' ').length > 2
			) {
				return new Error('Password inválido');
			}
		}

		if (
			(await pgHelper.client
				.getRepository(TableUser)
				.findOne({ where: { email: email } })) !== null
		) {
			return new Error('Email já existe');
		}

		const findUser = await pgHelper.client.getRepository(TableUser).findOne({
			where: { uid: id },
		});
		if (findUser === null) return new Error('ID user não encontrado.');

		await pgHelper.client.getRepository(TableUser).update(
			{ uid: id },
			{
				name: name ? name : undefined,
				email: email ? email : undefined,
				password: password ? password : undefined,
				updated_at: newDate(),
			}
		);
		const findUpdate = await pgHelper.client.getRepository(TableUser).findOne({
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
		const loginUser = await pgHelper.client.getRepository(TableUser).findOne({
			where: { name: name, email: email, password: password },
		});
		if (loginUser === null) return null;

		const compileLoginUser = new User(
			loginUser.name,
			loginUser.email,
			loginUser.password,
			loginUser.uid,
			loginUser.created_at,
			loginUser.updated_at
		);
		return compileLoginUser;
	}
}

export const user_repository = new UserRepository();
