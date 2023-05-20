import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { validationBody } from '../middlewares/validationBody';
import { validationCreate } from '../middlewares/validationCreate';
import { user_repository } from '../database/repository/user.repository';
import { database, dbMock } from '../models/dbMock.class';

const service = new UserService(database);
const controller = new UserController(service);

const userRoutes = Router();

userRoutes.post('/', validationBody, validationCreate, (req, res) =>
	controller.createUser_handle(req, res)
);
userRoutes.get('/', (req, res) => controller.getAllUser_handle(req, res));
userRoutes.get('/:id', (req, res) => controller.getUserById_handle(req, res));
userRoutes.put('/:id', (req, res) => controller.updateUser_handle(req, res));
userRoutes.delete('/:id', (req, res) => controller.deleteUser_handle(req, res));
userRoutes.post('/login', (req, res) => controller.loginUser_handle(req, res));

export default userRoutes;
