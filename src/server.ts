import express, { Request, Response } from 'express';
import cors from 'cors';
import { makeRoutes } from './routes/index.routes';
import { pgHelper } from './database/pg-helper';

const api = express();
const port = process.env.PORT || 9000;

pgHelper
	.connect()
	.then(() => {
		makeRoutes(api);
		api.listen(port, () => console.log(`server rodando na porta ${port}`));
	})
	.catch((error) => console.log('ERROR ao conectar ao DB - ', error));

api.use(express.json(), cors());

api.get('/', (req: Request, res: Response) =>
	res.send('<h1>API Recado Nova</h1>')
);
