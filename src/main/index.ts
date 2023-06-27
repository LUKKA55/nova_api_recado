import { DatabaseConnection } from './database';
import { redisConnection } from './redis';
import { runServer } from './server';

Promise.all([DatabaseConnection.connection(), redisConnection.connection()])
	.then(() => runServer())
	.catch((error) => {
		console.log(`Erro ao inicializar o servidor, message:${error}`);
	});
