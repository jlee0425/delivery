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
import { Dish } from '@modules/restaurants/type';
import theme from '@styles/theme';
import styled from 'styled-components';
import { priceFormatter } from 'lib/priceFormatter';

const DishCard = ({ name, description, image, price }: Omit<Dish, 'id'>) => {
	return (
		<Card sx={{ maxWidth: 345, height: 460 }} elevation={4}>
			<CardMedia
				component='img'
				height='250'
				src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
			/>
			<CardHeader title={name} />
			<CardContent sx={{ height: 80 }}>
				<DescWithScroll variant='body2' color='text.secondary'>
					{description}
				</DescWithScroll>
				<Typography letterSpacing={1}>
					{priceFormatter.format(price)}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default DishCard;

const DescWithScroll = styled(Typography)`
	${theme.OverflowScroll}
`;
