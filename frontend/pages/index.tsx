import type { NextPage } from 'next';
import { TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';
import RestaurantList from '@modules/restaurants/RestaurantList';

const Home: NextPage = () => {
	const [searchKeyword, setSearchKeyword] = useState('');
	const handleSearchInput = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSearchKeyword(event.target.value);
		},
		[],
	);

	return (
		<>
			<TextField
				label='Search Restaurants'
				variant='standard'
				value={searchKeyword}
				onChange={handleSearchInput}
				sx={{ margin: '20px 0' }}
			/>
			<RestaurantList searchString={searchKeyword} />
		</>
	);
};

export default Home;
