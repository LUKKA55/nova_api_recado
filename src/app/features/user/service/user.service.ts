import { IUser } from '../../../models/interfaces/user.interface';
import { User } from '../../../models/user.class';
import { CacheRepository } from '../../cache/cache';
import { UserRepository } from '../user.repository';

export class UserService {
	constructor(public database: UserRepository) {
		this.database = database;
	}

	async createUser_execute({ name, email, password }: IUser) {
		const cacheRepository = new CacheRepository();
		const createUser = await this.database.createUser({
			name,
			email,
			password,
		});
		await cacheRepository.del('all-user');
		return createUser;
	}

	async getAllUser_execute() {
		const cacheRepository = new CacheRepository();
		const cachegetAll = await cacheRepository.get('all-user');
		if (cachegetAll) {
			return cachegetAll as IUser[];
		}
		const getAllUser = await this.database.getAllUser();
		await cacheRepository.set('all-user', getAllUser);
		return getAllUser;
	}

	async getUserById_execute(id: string) {
		const cacheRepository = new CacheRepository();
		const cacheGetById = await cacheRepository.get(`user-${id}`);
		if (cacheGetById) {
			return cacheGetById as User;
		}
		const result = await this.database.getUserById(id);
		await cacheRepository.set(`user-${id}`, result as User);
		return result;
	}

	async deleteUser_execute(id: string) {
		const cacheRepository = new CacheRepository();
		const result = this.database.deleteUser(id);
		await cacheRepository.del('all-user');
		await cacheRepository.del(`user-${id}`);
		return result;
	}

	async updateUser_execute({ id, name, email, password }: IUser) {
		const cacheRepository = new CacheRepository();
		const result = await this.database.updateUser({
			id,
			name,
			email,
			password,
		});
		await cacheRepository.del('all-user');
		await cacheRepository.set(`user-${id}`, result as User);
		return result;
	}

	async loginUser_execute({ name, email, password }: IUser) {
		const result = await this.database.loginUser({
			name,
			email,
			password,
		} as IUser);
		return result;
	}
}
