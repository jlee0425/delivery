import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { createUser, userFromRequest, UserParams } from 'lib/users';
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const user = await userFromRequest(ctx.req);
	if (user) {
		return {
			redirect: { destination: '/', permanent: false },
		};
	}

	return {
		props: {},
	};
};

const SignUp: NextPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = (params: UserParams) => {
		createUser(params);
	};

	return (
		<Container maxWidth='xs'>
			<Typography variant='h4' marginBottom={5}>
				Register
			</Typography>
			<Box width={400} height={600}>
				<Paper
					elevation={3}
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						height: '100%',
						textAlign: 'center',
						padding: 5,
						display: 'grid',
						gridAutoColumns: '1fr',
					}}
				>
					<TextField
						label='Username'
						id='username'
						{...register('username', { required: true, minLength: 3 })}
					/>
					{errors?.username ? (
						<Typography variant='caption'>
							<strong>Username</strong> must be at least 3 characters long.
						</Typography>
					) : null}
					<TextField
						label='Email'
						type='email'
						id='email'
						{...register('email', { required: true })}
					/>
					<TextField
						label='Password'
						type='password'
						id='password'
						{...register('password', { required: true, minLength: 6 })}
					/>
					{errors?.password ? (
						<Typography variant='caption'>
							<strong>Password</strong> must be at least 6 characters long.
						</Typography>
					) : null}
					<Button type='submit' variant='contained' sx={{ maxHeight: '70px' }}>
						Register
					</Button>
					{errors ? <Typography>{errors.message}</Typography> : null}
				</Paper>
			</Box>
		</Container>
	);
};

export default SignUp;
