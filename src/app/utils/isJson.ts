export function isJson(data: string | null) {
	try {
		const json = JSON.parse(data as string);
		return json;
	} catch (error) {
		return data;
	}
}
