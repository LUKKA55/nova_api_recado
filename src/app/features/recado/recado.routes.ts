import { Router } from 'express';
import { RecadoService } from './service/recado.service';
import { RecadoController } from './controller/recado.controller';
import { RecadoRepository, recado_repository } from './recado.repository';
import { validationBody } from './middlewares';

const service = new RecadoService(recado_repository);
const controller = new RecadoController(service);

const recadoRoutes = Router();
recadoRoutes.post('/:user_id', validationBody, (req, res) =>
	controller.insertRecado_handle(req, res)
);
recadoRoutes.get('/', (req, res) => controller.getAllRecado_handle(req, res));
recadoRoutes.get('/:user_id', (req, res) =>
	controller.getAllRecadoByUser_handle(req, res)
);
recadoRoutes.get('/recado_id/:recado_id', (req, res) =>
	controller.getAllRecadoById_handle(req, res)
);
recadoRoutes.put('/:recado_id', (req, res) =>
	controller.updateRecado_handle(req, res)
);
recadoRoutes.delete('/:recado_id', (req, res) =>
	controller.deleteOneRecado_handle(req, res)
);
recadoRoutes.put('/arquivar/:recado_id', (req, res) =>
	controller.arquivaRecado_handle(req, res)
);
recadoRoutes.put('/desarquivar/:recado_id', (req, res) =>
	controller.desarquivarRecado_handle(req, res)
);
recadoRoutes.get('/true/:user_id', (req, res) =>
	controller.getAllRecadoByUserStatusTrue_handle(req, res)
);
recadoRoutes.get('/false/:user_id', (req, res) =>
	controller.getAllRecadoByUserStatusFalse_handle(req, res)
);
recadoRoutes.get('/filter/true/:user_id', (req, res) =>
	controller.getAllRecadoFilterTrueUser_handle(req, res)
);
recadoRoutes.get('/filter/false/:user_id', (req, res) =>
	controller.getAllRecadoFilterFalseUser_handle(req, res)
);
export default recadoRoutes;
