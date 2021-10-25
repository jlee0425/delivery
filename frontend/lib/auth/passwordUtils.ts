import argon2 from 'argon2';

export const encryptPassword = async (pw: string) => await argon2.hash(pw);

export const verifyPassword = async (hash: string, pw: string) =>
	await argon2.verify(hash, pw);
