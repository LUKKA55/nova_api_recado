import { IUser } from '../../../models/interfaces/user.interface';
import { User } from '../../../models/user.class';
import { UserRepository } from '../user.repository';

export class UserService {
	constructor(public database: UserRepository) {
		this.database = database;
	}

	createUser_execute({ name, email, password }: IUser) {
		return this.database.createUser({ name, email, password });
	}

	getAllUser_execute() {
		return this.database.getAllUser();
	}

	getUserById_execute(id: string) {
		const result = this.database.getUserById(id);
		return result;
	}
	deleteUser_execute(id: string) {
		const result = this.database.deleteUser(id);
		return result;
	}
	updateUser_execute({ id, name, email, password }: IUser) {
		const result = this.database.updateUser({ id, name, email, password });
		return result;
	}
	loginUser_execute({ name, email, password }: IUser) {
		const result = this.database.loginUser({ name, email, password } as IUser);
		return result;
	}
}
