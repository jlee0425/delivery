import request from 'graphql-request';

export const fetcher = async (query: string, args?: any) =>
	await request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, query, args);
