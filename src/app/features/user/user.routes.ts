import { Router } from 'express';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { validationBody, validationCreate } from './middlewares';
import { UserRepository } from './user.repository';
import { user_repository } from './user.repository';

const userRoutes = Router();

const service = new UserService(user_repository);
const controller = new UserController(service);

userRoutes.post('/', validationBody, validationCreate, (req, res) =>
	controller.createUser_handle(req, res)
);
userRoutes.get('/', (req, res) => controller.getAllUser_handle(req, res));
userRoutes.get('/:id', (req, res) => controller.getUserById_handle(req, res));
userRoutes.put('/:id', (req, res) => controller.updateUser_handle(req, res));
userRoutes.delete('/:id', (req, res) => controller.deleteUser_handle(req, res));
userRoutes.post('/login', (req, res) => controller.loginUser_handle(req, res));

export default userRoutes;
