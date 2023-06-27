import { Router } from 'express';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { validateToken, validationBody } from './middlewares';
import { user_repository } from './user.repository';

const userRoutes = Router();

const service = new UserService(user_repository);
const controller = new UserController(service);

userRoutes.post('/', validationBody, (req, res) =>
	controller.createUser_handle(req, res)
);
userRoutes.get('/', validateToken, (req, res) =>
	controller.getAllUser_handle(req, res)
);
userRoutes.get('/:id', validateToken, (req, res) =>
	controller.getUserById_handle(req, res)
);
userRoutes.put('/', validateToken, (req, res) =>
	controller.updateUser_handle(req, res)
);
userRoutes.delete('/', validateToken, (req, res) =>
	controller.deleteUser_handle(req, res)
);
userRoutes.post('/login', validationBody, (req, res) =>
	controller.loginUser_handle(req, res)
);

export default userRoutes;
