import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from '../modules/layouts/Layout';
import GlobalStyles from '../styles/globalStyles';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
};
export default MyApp;
