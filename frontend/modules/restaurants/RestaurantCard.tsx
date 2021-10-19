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
import { Restaurant } from '../../types/restaurant';

const RestaurantCard = ({
	name,
	description,
	image,
}: Omit<Restaurant, 'id'>) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
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
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					{description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default RestaurantCard;
