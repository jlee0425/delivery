import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Restaurant } from '@modules/restaurants/type';
import theme from '@styles/theme';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const RestaurantCard = ({
	id,
	name,
	description,
	image,
}: Omit<Restaurant, 'dishes'>) => {
	const router = useRouter();
	return (
		<Card
			sx={{ maxWidth: 345, height: 460 }}
			elevation={4}
			onClick={() => router.push(`/restaurants/${id}`)}
		>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: 'red[500]' }} aria-label='restaurant'>
						{name[0]}
					</Avatar>
				}
				title={name}
			/>
			<CardMedia
				component='img'
				height='194'
				src={`${process.env.NEXT_PUBLIC_API_URL}${image[0].url}`}
			/>
			<CardContent sx={{ height: 138 }}>
				<DescWithScroll variant='body2' color='text.secondary'>
					{description}
				</DescWithScroll>
			</CardContent>
			<CardActions>
				<IconButton>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default RestaurantCard;

const DescWithScroll = styled(Typography)`
	${theme.OverflowScroll}
`;
