import { DataSource } from 'typeorm';
import Redis from 'ioredis';
import { envs } from '../app/envs/envs';

export const redisConnection = {
	client: null as unknown as Redis,

	async connection(): Promise<void> {
		this.client = new Redis({
			port: envs.PORT,
			host: envs.HOST,
			username: 'default',
			password: envs.PASSWORD,
		});
	},

	async disconnection(): Promise<void> {
		this.client.disconnect();
		this.client = null as any;
	},
};
