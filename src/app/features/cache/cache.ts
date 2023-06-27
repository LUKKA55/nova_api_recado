import Redis from 'ioredis';
import { isJson } from '../../utils/isJson';
import { redisConnection } from '../../../main/redis';

export class CacheRepository {
	private cacheConnect: Redis;
	constructor() {
		this.cacheConnect = redisConnection.client;
	}

	async set(key: string, data: Object | string) {
		const value = typeof data === 'object' ? JSON.stringify(data) : data;
		await this.cacheConnect.set(key, value);
	}
	async get(key: string) {
		const value = await this.cacheConnect.get(key);
		const validateJson = isJson(value);
		return validateJson;
	}
	async del(key: string) {
		await this.cacheConnect.del(key);
	}
}
