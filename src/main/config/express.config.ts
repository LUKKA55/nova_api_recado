import express from 'express';
import cors from 'cors';
import { makeRoutes } from './index.routes';

export const createServer = () => {
	const api = express();

	api.use(express.json(), cors());
	makeRoutes(api);
	return api;
};
