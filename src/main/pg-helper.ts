import { DataSource } from 'typeorm';
import config from './config/ormconfig';

export class DatabaseConnection {
	private static _client: any;

	public static get client(): DataSource {
		return DatabaseConnection._client;
	}

	static async connection(): Promise<void> {
		DatabaseConnection._client = new DataSource(config);
		await DatabaseConnection._client.initialize();
	}

	static async disconnection(): Promise<void> {
		await DatabaseConnection._client.destroy();
		DatabaseConnection._client = null as any;
	}
}
