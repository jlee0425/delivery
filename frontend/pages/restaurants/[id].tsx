import DishCard from '@modules/restaurants/DishCard';
import { Dish, Restaurant } from '@modules/restaurants/type';
import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import { fetcher } from 'lib/fetcher';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

const RestaurantPage = () => {
	const router = useRouter();
	const { data, isValidating, error } = useSWR(
		[GET_RESTAURANT_DISHES, router.query.id],
		(query, id) => fetcher(query, { id }),
	);

	const [showToast, toggleToast] = useState(!!error);
	const closeToast = useCallback(() => {
		toggleToast(!showToast);
	}, []);

	return isValidating ? (
		<Typography>데이터를 불러오는 중입니다.</Typography>
	) : error ? (
		<Snackbar open={showToast} autoHideDuration={3000} onClose={closeToast}>
			<Alert severity='error' sx={{ width: '100%' }}>
				데이터를 불러오는 데 문제가 발생했습니다.
			</Alert>
		</Snackbar>
	) : (
		<>
			<Typography variant='h3' marginBottom={5}>
				{data?.restaurant?.name}
			</Typography>
			<Grid spacing={6} container>
				{data?.restaurant?.dishes.map((dish: Dish) => (
					<Grid key={dish.id} item md={4} sm={6} xs={12}>
						<DishCard
							name={dish.name}
							description={dish.description}
							image={dish.image}
							price={dish.price}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default RestaurantPage;

const GET_RESTAURANT_DISHES = `
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;
