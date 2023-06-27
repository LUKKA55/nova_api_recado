import 'dotenv/config';

export const envs = {
	DATABASE_URL: process.env.DATABASE_URL as string,
	HOST: process.env.HOST_REDIS as string,
	PASSWORD: process.env.PASSWORD_REDIS as string,
	PORT: Number(process.env.PORT_REDIS),
	JWT_KEY: process.env.JWT_KEY as string,
};
