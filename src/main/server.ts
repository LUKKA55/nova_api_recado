import express, { Request, Response } from 'express';
import cors from 'cors';
import { makeRoutes } from './config/index.routes';
import { pgHelper } from './pg-helper';
import { createServer } from './config/express.config';

export const runServer = () => {
	const port = process.env.PORT || 9000;

	const api = createServer();

	api.listen(port, () => console.log(`server rodando na porta ${port}`));
};
