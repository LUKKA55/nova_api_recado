import { pgHelper } from '../pg-helper';
import { IUser } from '../../interfaces/user.interface';
import { User } from '../../models/user.class';
import { TableUser } from '../entities/TableUser';
import newDate from '../../services/newDate';
import { v4 } from 'uuid';

export class UserRepository {
	// public manager = pgHelper.client.manager;

	async getAllUser(): Promise<IUser[]> {
		const allUser = await pgHelper.client.getRepository(TableUser).find();

		const compileUser = allUser.map((user) => {
			return new User(user.name, user.email, user.password, user.uid);
		});
		console.log('getAll --- ', compileUser);
		return compileUser;

		// const allUser = await this.manager.find(TableUser);

		// const compileUser = allUser.map((user) => {
		// 	return new User(user.name, user.email, user.password, user.uid);
		// });
		// return compileUser;
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
			userById.uid
		);
		return compileUser;

		// const userById = await this.manager.findOne(TableUser, {
		// 	where: { uid: id },
		// });
		// if (userById === null) return null;

		// const compileUser = new User(
		// 	userById.name,
		// 	userById.email,
		// 	userById.password,
		// 	userById.uid
		// );
		// return compileUser;
	}

	async createUser({ name, email, password }: IUser): Promise<IUser> {
		const createUser = pgHelper.client.getRepository(TableUser).create({
			uid: v4(),
			name: name,
			email: email,
			password: password,
			created_at: newDate(),
			updated_at: newDate(),
		});
		console.log('create --- ', createUser);

		return await pgHelper.client.getRepository(TableUser).save(createUser);

		// const createUser = this.manager.create(TableUser, {
		// 	uid: user.id,
		// 	name: user.name,
		// 	email: user.email,
		// 	password: user.password,
		// });

		// return await this.manager.save(createUser);
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

		// const findUser = await this.manager.findOne(TableUser, {
		// 	where: { uid: id },
		// });
		// if (findUser === null) return null;
		// const deleteUser = await this.manager.delete(TableUser, {
		// 	where: { uid: id },
		// });
		// return deleteUser;
	}

	async updateUser({ id, name, email, password }: IUser) {
		const findUser = await pgHelper.client.getRepository(TableUser).findOne({
			where: { uid: id },
		});
		if (findUser === null) return null;
		const updateUser = await pgHelper.client.getRepository(TableUser).update(
			{ uid: id },
			{
				name: name ? name : undefined,
				email: email ? email : undefined,
				password: password ? password : undefined,
				updated_at: newDate(),
			}
		);

		console.log('update data --- ', updateUser);

		return updateUser;

		// const findUser = await this.manager.findOne(TableUser, {
		// 	where: { uid: id },
		// });
		// if (findUser === null) return null;
		// const updateUser = await this.manager.update(
		// 	TableUser,
		// 	{ uid: id },
		// 	{ name: name, email: email, password: password }
		// );

		// return updateUser;
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
			loginUser.uid
		);
		return compileLoginUser;

		// const loginUser = await this.manager.findOne(TableUser, {
		// 	where: { name: name, email: email, password: password },
		// });
		// if (loginUser === null) return null;

		// const compileLoginUser = new User(
		// 	loginUser.name,
		// 	loginUser.email,
		// 	loginUser.password,
		// 	loginUser.uid
		// );
		// return compileLoginUser;
	}
}

export const user_repository = new UserRepository();
