import jwt from 'jsonwebtoken';
import { envs } from '../envs/envs';
import { Token } from '../models/interfaces/token.interface';

export const getIdByToken = (token: string) => {
	const decodedToken = jwt.verify(token, envs.JWT_KEY as string) as Token;
	return decodedToken.uid;
};
