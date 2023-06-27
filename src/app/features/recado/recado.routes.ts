import { Router } from 'express';
import { RecadoService } from './service/recado.service';
import { RecadoController } from './controller/recado.controller';
import { recado_repository } from './recado.repository';
import { validationBody } from './middlewares';
import { validateToken } from '../user/middlewares';

const service = new RecadoService(recado_repository);
const controller = new RecadoController(service);

const recadoRoutes = Router();
recadoRoutes.post('/', validateToken, validationBody, (req, res) =>
	controller.insertRecado_handle(req, res)
);
recadoRoutes.get('/', validateToken, (req, res) =>
	controller.getAllRecado_handle(req, res)
);
recadoRoutes.get('/getAllRecadosUser', validateToken, (req, res) =>
	controller.getAllRecadoByUser_handle(req, res)
);
recadoRoutes.get('/recado_id/:recado_id', validateToken, (req, res) =>
	controller.getAllRecadoById_handle(req, res)
);
recadoRoutes.put('/:recado_id', validateToken, (req, res) =>
	controller.updateRecado_handle(req, res)
);
recadoRoutes.delete('/:recado_id', validateToken, (req, res) =>
	controller.deleteOneRecado_handle(req, res)
);
recadoRoutes.put('/arquivar/:recado_id', validateToken, (req, res) =>
	controller.arquivaRecado_handle(req, res)
);
recadoRoutes.put('/desarquivar/:recado_id', validateToken, (req, res) =>
	controller.desarquivarRecado_handle(req, res)
);
recadoRoutes.get('/true', validateToken, (req, res) =>
	controller.getAllRecadoByUserStatusTrue_handle(req, res)
);
recadoRoutes.get('/false', validateToken, (req, res) =>
	controller.getAllRecadoByUserStatusFalse_handle(req, res)
);
recadoRoutes.get('/filter/true', validateToken, (req, res) =>
	controller.getAllRecadoFilterTrueUser_handle(req, res)
);
recadoRoutes.get('/filter/false', validateToken, (req, res) =>
	controller.getAllRecadoFilterFalseUser_handle(req, res)
);
export default recadoRoutes;
