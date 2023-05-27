import { DatabaseConnection } from './pg-helper';
import { runServer } from './server';

DatabaseConnection.connection()
	.then(() => runServer())
	.catch((error) => {
		console.log(`Erro ao inicializar o servidor, message:${error}`);
	});
