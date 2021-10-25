import pick from 'lodash/pick';
import { encryptPassword } from './auth/passwordUtils';

export interface UserParams {
	email: string;
	name: string;
	password: string;
}

export const createUser = async (params: UserParams) => {
	const filteredParams = pick(params, ['email', 'name', 'password']);
	const password = await encryptPassword(filteredParams.password);
};

const REGISTER = `
  mutation ($email: String!, $password: String!, $username: String!) {
    register(input: {email: $email, password: $password, username: $username}) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
