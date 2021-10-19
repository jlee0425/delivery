import type { NextPage } from 'next';
import { Container, TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';
import RestaurantList from '../modules/restaurants/RestaurantList';

const Home: NextPage = () => {
	const [searchKeyword, setSearchKeyword] = useState('');
	const handleSearchInput = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSearchKeyword(event.target.value);
		},
		[],
	);

	return (
		<Container>
			<TextField
				label='Search Restaurants'
				variant='standard'
				value={searchKeyword}
				onChange={handleSearchInput}
			/>
			<RestaurantList searchString={searchKeyword} />
		</Container>
	);
};

export default Home;
