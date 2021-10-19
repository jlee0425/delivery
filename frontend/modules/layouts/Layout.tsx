import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import Link from 'next/link';
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
						<Link href='/signup'>Sign Up</Link>
					</Button>
				</Toolbar>
			</AppBar>
			<div>{children}</div>
		</>
	);
};

export default Layout;
