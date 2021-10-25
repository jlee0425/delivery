import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode } from 'react';
interface Props {
	children: ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<>
			<AppBar position='sticky'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link href='/'>Delivery</Link>
					</Typography>
					<Button color='inherit'>
						<Link href='/signin'>Sign In</Link>
					</Button>
					<Button color='inherit'>
						<Link href='/signup'>Register</Link>
					</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ margin: '50px auto' }}>{children}</Container>
		</>
	);
};

export default Layout;
