import agriculture from '../assets/images/categories/agriculture.jpg';
import babies from '../assets/images/categories/babies.jpg';
import electronics from '../assets/images/categories/electronics.jpg';
import fashion from '../assets/images/categories/fashion.jpg';
import furniture from '../assets/images/categories/furniture.jpg';
import health from '../assets/images/categories/health.jpg';
import pets from '../assets/images/categories/pets.jpg';
import properties from '../assets/images/categories/properties.jpg';
import services from '../assets/images/categories/services.jpg';
import softwares from '../assets/images/categories/softwares.jpg';
import tradesman from '../assets/images/categories/tradesman.jpg';
import vehicles from '../assets/images/categories/vehicles.jpg';
import sports from '../assets/images/categories/sports.jpg';
import motorbike from '../assets/images/categories/motorbike.jpg';

export const categoryData = [
	{
		id: 50,
		name: 'Vehicles',
		image: vehicles,
	},
	{
		id: 51,
		name: 'Properties',
		image: properties,
	},
	{
		id: 52,
		name: 'Services',
		image: services,
	},
	{
		id: 53,
		name: 'Agriculture',
		image: agriculture,
	},
	{
		id: 54,
		name: 'Electronics',
		image: electronics,
	},
	{
		id: 55,
		name: 'Fashion',
		image: fashion,
	},
	{
		id: 56,
		name: 'Health and Beauty',
		image: health,
	},
	{
		id: 57,
		name: 'Home and Accessories',
		image: furniture,
	},
	{
		id: 58,
		name: 'Tradesman and Construction',
		image: tradesman,
	},
	{
		id: 59,
		name: 'Software and Games',
		image: softwares,
	},
	{
		id: 60,
		name: 'Pet',
		image: pets,
	},
	{
		id: 61,
		name: 'Babies and Kids',
		image: babies,
	},
	{
		id: 62,
		name: 'Sports, Music and Outdoors',
		image: sports,
	},
	{
		id: 63,
		name: 'Motorbike and Scooters',
		image: motorbike,
	},
	// {
	// 	id: 64,
	// 	name: 'Requests',
	// 	image: requests,
	// },
	// {
	// 	id: 65,
	// 	name: 'Deals',
	// 	image: deals,
	// },
];

export const inspectableCategories = [5001, 5003, 5004, 5002, 5007, 5101, 5102, 5103, 5104, 5105, 5106, 5107, 5108, 5109, 5303, 6301, 6302];

export const grabbableCategories = [50, 51, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63];

export const pickupCategories = [5001, 5003, 5004, 5005, 5101, 5102, 5103, 5104, 5105, 5106, 5107, 5108, 5109, 5303, 5401, 5402, 5403, 5404, 5405, 5406, 5407, 5408, 5409, 5410, 5411, 6301, 6302];

export const categoriesAndSubCategories = [
	{
		id: 50,
		name: 'Vehicles',
		category_id: null,
	},
	{
		id: 51,
		name: 'Properties',
		category_id: null,
	},
	{
		id: 52,
		name: 'Services',
		category_id: null,
	},
	{
		id: 53,
		name: 'Agriculture',
		category_id: null,
	},
	{
		id: 54,
		name: 'Electronics',
		category_id: null,
	},
	{
		id: 55,
		name: 'Fashion',
		category_id: null,
	},
	{
		id: 56,
		name: 'Health and Beauty',
		category_id: null,
	},
	{
		id: 57,
		name: 'Home and Accessories',
		category_id: null,
	},
	{
		id: 58,
		name: 'Tradesman and Construction',
		category_id: null,
	},
	{
		id: 59,
		name: 'Software and Games',
		category_id: null,
	},
	{
		id: 60,
		name: 'Pet',
		category_id: null,
	},
	{
		id: 61,
		name: 'Babies and Kids',
		category_id: null,
	},
	{
		id: 62,
		name: 'Sports, Music and Outdoors',
		category_id: null,
	},
	{
		id: 63,
		name: 'Motorbike and Scooters',
		category_id: null,
	},
	{
		id: 64,
		name: 'Requests',
		category_id: null,
	},
	{
		id: 65,
		name: 'Deals',
		category_id: null,
	},
	{
		id: 5001,
		name: 'Cars',
		category_id: 50,
	},
	{
		id: 5002,
		name: 'Automobile and Equipment',
		category_id: 50,
	},
	{
		id: 5003,
		name: 'Vans',
		category_id: 50,
	},
	{
		id: 5004,
		name: 'Truck and Lorries',
		category_id: 50,
	},
	{
		id: 5005,
		name: 'Auto Parts and Accessories',
		category_id: 50,
	},
	{
		id: 5007,
		name: 'Other Vehicles',
		category_id: 50,
	},
	{
		id: 5101,
		name: 'House and Apartment for Sale',
		category_id: 51,
	},
	{
		id: 5102,
		name: 'House and Apartment to Let',
		category_id: 51,
	},
	{
		id: 5103,
		name: 'Property To Share',
		category_id: 51,
	},
	{
		id: 5104,
		name: 'Property to Lease',
		category_id: 51,
	},
	{
		id: 5105,
		name: 'Land for Sale',
		category_id: 51,
	},
	{
		id: 5106,
		name: 'Property for Mosque/Church',
		category_id: 51,
	},
	{
		id: 5107,
		name: 'Short Let Property',
		category_id: 51,
	},
	{
		id: 5108,
		name: 'Commercial property for sale',
		category_id: 51,
	},
	{
		id: 5109,
		name: 'Commercial property for lease',
		category_id: 51,
	},
	{
		id: 5201,
		name: 'Business and Office',
		category_id: 52,
	},
	{
		id: 5202,
		name: 'Food and Drinks',
		category_id: 52,
	},
	{
		id: 5203,
		name: 'Weddings',
		category_id: 52,
	},
	{
		id: 5204,
		name: 'Child Care',
		category_id: 52,
	},
	{
		id: 5205,
		name: 'Properties and Maintenance',
		category_id: 52,
	},
	{
		id: 5206,
		name: 'Tutorial Classes',
		category_id: 52,
	},
	{
		id: 5207,
		name: 'Clothing and Laundry',
		category_id: 52,
	},
	{
		id: 5208,
		name: 'Automotive Services',
		category_id: 52,
	},
	{
		id: 5209,
		name: 'Entertainment',
		category_id: 52,
	},
	{
		id: 5210,
		name: 'Travel and Tourism',
		category_id: 52,
	},
	{
		id: 5211,
		name: 'Goods Supply and Retailers',
		category_id: 52,
	},
	{
		id: 5212,
		name: 'Legal and Finance',
		category_id: 52,
	},
	{
		id: 5213,
		name: 'Transport',
		category_id: 52,
	},
	{
		id: 5214,
		name: 'Others',
		category_id: 52,
	},
	{
		id: 5301,
		name: 'Animal',
		category_id: 53,
	},
	{
		id: 5302,
		name: 'Farm Produce',
		category_id: 53,
	},
	{
		id: 5303,
		name: 'Farm Equipment and Machinery',
		category_id: 53,
	},
	{
		id: 5304,
		name: 'Feeds',
		category_id: 53,
	},
	{
		id: 5305,
		name: 'Seeds and Supplement',
		category_id: 53,
	},
	{
		id: 5401,
		name: 'Computer Accessories',
		category_id: 54,
	},
	{
		id: 5402,
		name: 'Accessories for Electronics',
		category_id: 54,
	},
	{
		id: 5403,
		name: 'Headphones Sets',
		category_id: 54,
	},
	{
		id: 5404,
		name: 'Printers and Scanners',
		category_id: 54,
	},
	{
		id: 5405,
		name: 'Networking Accessories',
		category_id: 54,
	},
	{
		id: 5406,
		name: 'Mobile Phones and Tablets',
		category_id: 54,
	},
	{
		id: 5407,
		name: 'Music and Audio Equipment',
		category_id: 54,
	},
	{
		id: 5408,
		name: 'Photo and Video Cameras',
		category_id: 54,
	},
	{
		id: 5409,
		name: 'Laptop',
		category_id: 54,
	},
	{
		id: 5410,
		name: 'Security and Surveillance',
		category_id: 54,
	},
	{
		id: 5411,
		name: 'TVs and Equipments',
		category_id: 54,
	},
	{
		id: 5501,
		name: 'Shoes',
		category_id: 55,
	},
	{
		id: 5502,
		name: 'Clothing Material',
		category_id: 55,
	},
	{
		id: 5503,
		name: 'Bags',
		category_id: 55,
	},
	{
		id: 5504,
		name: 'Jewellery',
		category_id: 55,
	},
	{
		id: 5505,
		name: 'Clothing',
		category_id: 55,
	},
	{
		id: 5506,
		name: 'Watches',
		category_id: 55,
	},
	{
		id: 5507,
		name: 'Wedding Wears, Items and Accessories',
		category_id: 55,
	},
	{
		id: 5601,
		name: 'Hair Products',
		category_id: 56,
	},
	{
		id: 5602,
		name: 'Vitamins and Supplements',
		category_id: 56,
	},
	{
		id: 5603,
		name: 'Fragrances',
		category_id: 56,
	},
	{
		id: 5604,
		name: 'Sexual Products',
		category_id: 56,
	},
	{
		id: 5605,
		name: 'Make-Up',
		category_id: 56,
	},
	{
		id: 5606,
		name: 'Bath and Cream',
		category_id: 56,
	},
	{
		id: 5607,
		name: 'Skincare',
		category_id: 56,
	},
	{
		id: 5608,
		name: 'Tobacco Accessories',
		category_id: 56,
	},
	{
		id: 5701,
		name: 'Furniture',
		category_id: 57,
	},
	{
		id: 5702,
		name: 'Kitchen and Cooking Utensils',
		category_id: 57,
	},
	{
		id: 5703,
		name: 'Garden Tools',
		category_id: 57,
	},
	{
		id: 5704,
		name: 'Household Chemicals',
		category_id: 57,
	},
	{
		id: 5705,
		name: 'Kitchen Appliances',
		category_id: 57,
	},
	{
		id: 5706,
		name: 'Home Accessories',
		category_id: 57,
	},
	{
		id: 5707,
		name: 'Home Appliances',
		category_id: 57,
	},
	{
		id: 5801,
		name: 'Property Maintenance',
		category_id: 58,
	},
	{
		id: 5802,
		name: 'Welder',
		category_id: 58,
	},
	{
		id: 5803,
		name: 'Security Services',
		category_id: 58,
	},
	{
		id: 5804,
		name: 'Carpentry and Furniture',
		category_id: 58,
	},
	{
		id: 5805,
		name: 'Interior Designs and Decor',
		category_id: 58,
	},
	{
		id: 5806,
		name: 'Cleaning',
		category_id: 58,
	},
	{
		id: 5807,
		name: 'Drain and Pipe Cleaning',
		category_id: 58,
	},
	{
		id: 5808,
		name: 'Electrician',
		category_id: 58,
	},
	{
		id: 5809,
		name: 'Tiler',
		category_id: 58,
	},
	{
		id: 5810,
		name: 'Technician',
		category_id: 58,
	},
	{
		id: 5811,
		name: 'Fitness and Gym',
		category_id: 58,
	},
	{
		id: 5812,
		name: 'Logistics',
		category_id: 58,
	},
	{
		id: 5813,
		name: 'Computer and IT Solution',
		category_id: 58,
	},
	{
		id: 5901,
		name: 'Software',
		category_id: 59,
	},
	{
		id: 5902,
		name: 'Games',
		category_id: 59,
	},
	{
		id: 5903,
		name: 'Video Game Console',
		category_id: 59,
	},
	{
		id: 6001,
		name: 'Dog and Pups',
		category_id: 60,
	},
	{
		id: 6002,
		name: 'Fish',
		category_id: 60,
	},
	{
		id: 6003,
		name: 'Pet Accessories',
		category_id: 60,
	},
	{
		id: 6004,
		name: 'Cats and Kits',
		category_id: 60,
	},
	{
		id: 6005,
		name: 'Birds',
		category_id: 60,
	},
	{
		id: 6006,
		name: 'Other Animals',
		category_id: 60,
	},
	{
		id: 6101,
		name: 'Baby Child Care',
		category_id: 61,
	},
	{
		id: 6102,
		name: 'Children Shoes',
		category_id: 61,
	},
	{
		id: 6103,
		name: 'Toys',
		category_id: 61,
	},
	{
		id: 6104,
		name: 'Car Seats and Carriers',
		category_id: 61,
	},
	{
		id: 6105,
		name: 'Baby Bouncers',
		category_id: 61,
	},
	{
		id: 6106,
		name: 'Maternity and Pregnancy',
		category_id: 61,
	},
	{
		id: 6107,
		name: 'Prams and Strollers',
		category_id: 61,
	},
	{
		id: 6109,
		name: 'Nursery and Furniture',
		category_id: 61,
	},
	{
		id: 6110,
		name: 'Baby Clothes',
		category_id: 61,
	},
	{
		id: 6111,
		name: 'Feeding',
		category_id: 61,
	},
	{
		id: 6112,
		name: 'Others',
		category_id: 61,
	},
	{
		id: 6201,
		name: 'CDs, Flash Drives and DVDs',
		category_id: 62,
	},
	{
		id: 6202,
		name: 'Musical Instrument',
		category_id: 62,
	},
	{
		id: 6203,
		name: 'Sport Gears and Equipment',
		category_id: 62,
	},
	{
		id: 6204,
		name: 'Arts and Crafts',
		category_id: 62,
	},
	{
		id: 6205,
		name: 'Books and Games',
		category_id: 62,
	},
	{
		id: 6206,
		name: 'Adventure and Outdoors',
		category_id: 62,
	},
	{
		id: 6301,
		name: 'Motorbikes',
		category_id: 63,
	},
	{
		id: 6302,
		name: 'Scooters',
		category_id: 63,
	},
];
