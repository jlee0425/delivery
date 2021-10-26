import { Restaurant } from '@modules/restaurants/type';
import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import { gql } from 'graphql-request';
import { fetcher } from 'lib/fetcher';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import RestaurantCard from './RestaurantCard';

interface Props {
	searchString?: string;
}

const RestaurantList = ({ searchString = '' }: Props) => {
	const { data, isValidating, error } = useSWR(GET_RESTAURANT_LISTS, fetcher);
	const [showToast, toggleToast] = useState(error ?? false);
	const closeToast = useCallback(() => {
		toggleToast(!showToast);
	}, []);
	const filteredList = (data?.restaurants ?? []).filter((query: Restaurant) =>
		query?.name?.toLowerCase().includes(searchString),
	);

	return isValidating ? (
		<Typography>데이터를 불러오는 중입니다.</Typography>
	) : error ? (
		<Snackbar open={showToast} autoHideDuration={3000} onClose={closeToast}>
			<Alert severity='error' sx={{ width: '100%' }}>
				데이터를 불러오는 데 문제가 발생했습니다.
			</Alert>
		</Snackbar>
	) : (
		<Grid container spacing={6}>
			{filteredList.map((item: Omit<Restaurant, 'dishes'>) => (
				<Grid key={item.id} item md={4} sm={6} xs={12}>
					<RestaurantCard
						id={item.id}
						name={item.name}
						description={item.description}
						image={item.image}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default RestaurantList;

const GET_RESTAURANT_LISTS = gql`
	{
		restaurants {
			id
			name
			description
			image {
				url
			}
		}
	}
`;
