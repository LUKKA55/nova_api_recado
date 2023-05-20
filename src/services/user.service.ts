import { IUser } from '../interfaces/user.interface';
import { dbMock } from '../models/dbMock.class';
import { User } from '../models/user.class';
import { UserRepository } from '../database/repository/user.repository';

export class UserService {
	constructor(public database: dbMock) {
		this.database = database;
	}

	createUser_execute({ name, email, password }: IUser) {
		const newUser = new User(name, email, password);
		this.database.addUser(newUser);

		return newUser;
	}

	getAllUser_execute() {
		return this.database.userAll;
	}

	getUserById_execute(id: string) {
		const result = this.database.findUser(id);
		return result;
	}
	deleteUser_execute(id: string) {
		const result = this.database.removeOneUser(id);
		return result;
	}
	updateUser_execute({ id, name, email, password }: IUser) {
		const result = this.database.updateUser({ id, name, email, password });
		return result;
	}
	loginUser_execute({ name, email, password }: IUser) {
		const result = this.database.logiUser({ name, email, password } as IUser);
		return result;
	}
}
