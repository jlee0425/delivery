import { Grid } from '@mui/material';
import { request } from 'graphql-request';
import React from 'react';
import useSWR from 'swr';
import { Restaurant } from '../../types/restaurant';
import RestaurantCard from './RestaurantCard';

interface Props {
	searchString?: string;
}

const RestaurantList = ({ searchString = '' }: Props) => {
	const fetcher = (query: string) =>
		request(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, query);
	const { data, isValidating, error } = useSWR(QUERY, fetcher);

	if (error) return null;

	const filteredList = (data?.restaurants ?? []).filter((query: Restaurant) =>
		query?.name?.toLowerCase().includes(searchString),
	);

	return (
		<Grid container spacing={2}>
			{filteredList.map((item: Restaurant) => (
				<Grid key={item.id} item xs={6}>
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
