import request from 'graphql-request';

export interface LoginParams {
	email: string;
	password: string;
}

export const login = async (params: LoginParams) => {
	const user = await request(``);
};
