import request, { gql } from 'graphql-request';
import { IncomingMessage } from 'http';
import pick from 'lodash/pick';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { encryptPassword } from './auth/passwordUtils';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';
export interface UserParams {
	email: string;
	name: string;
	password: string;
}

const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || 'access_token';
const cookieOptions = {
	httpOnly: true,
	maxAge: 3600 * 24 * 60 * 60,
	path: '/',
	sameSite: 'Strict',
	secure: process.env.NODE_ENV === 'production',
};

const setCookie = (
	res: any,
	name: string,
	value: string,
	options: Record<string, unknown>,
) => {
	const stringValue =
		typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);
	res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

export const authenticateUser = (res: NextApiResponse, user: any) => {
	if (!user) return;

	const token = jwt.sign({ email: user.email }, JWT_TOKEN_KEY, {
		expiresIn: '1d',
	});

	setCookie(res, 'auth', token, cookieOptions);
};
export const createUser = async (params: UserParams) => {
	const filteredParams = pick(params, ['email', 'name', 'password']);
	const password = await encryptPassword(filteredParams.password);
	const response = await request(
		`${process.env.NEXT_PUBLIC_API_URL}/graphql`,
		REGISTER,
		{ ...params, password },
	);
	console.log(`respsonse`, response);
	return response;
};

export const userFromRequest = async (
	req: IncomingMessage & { cookies: NextApiRequestCookies },
) => {
	const { auth: token } = req.cookies;
	if (!token) return undefined;

	try {
		const data = jwt.verify(token, JWT_TOKEN_KEY);
		if (!data) return undefined;
		// const user = await request('')

		return '';
	} catch (e) {
		console.error(e);
	}
};

const REGISTER = gql`
	mutation ($email: String!, $password: String!, $username: String!) {
		register(
			input: { email: $email, password: $password, username: $username }
		) {
			id
			username
			email
			createdAt
			updatedAt
		}
	}
`;

const LOGIN = gql`
  query ($email: String!, $password: String!, $username: String) {
    login(email)
  }
`;
