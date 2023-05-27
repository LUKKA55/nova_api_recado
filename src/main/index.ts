import { pgHelper } from './pg-helper';
import { runServer } from './server';

pgHelper
	.connect()
	.then(() => runServer())
	.catch((error) => {
		console.log(`Erro ao inicializar o servidor, message:${error}`);
	});
