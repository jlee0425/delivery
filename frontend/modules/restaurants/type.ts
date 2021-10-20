export interface Restaurant {
	id: string;
	name: string;
	description: string;
	image: { url: string }[];
	dishes: Dish[];
}

export interface Dish {
	id: string;
	name: string;
	description: string;
	image: { url: string };
	price: number;
}
