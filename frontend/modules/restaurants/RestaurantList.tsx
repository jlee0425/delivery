import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import { request } from 'graphql-request';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { Restaurant } from '@modules/restaurants/type';
import RestaurantCard from './RestaurantCard';

interface Props {
	searchString?: string;
}

const RestaurantList = ({ searchString = '' }: Props) => {
	const fetcher = async (query: string) =>
		await request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, query);
	const { data, isValidating, error } = useSWR(QUERY, fetcher);
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
		<Grid container spacing={2}>
			{filteredList.map((item: Restaurant) => (
				<Grid key={item.id} item md={4} sm={6} xs={12}>
					<RestaurantCard
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

const QUERY = `
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
