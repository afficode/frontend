import ItemContainer from './ItemContainer';
import { KitchenTools, RedCar, Furniture, Property, Spa } from '../../../assets/images';

const SavedItems = () => {
	return (
		<div className="max-w-[1024px] mx-auto px-2 sm:px-4 my-5 sm:my-10">
			<div className="flex justify-end">
				<button className="text-primary font-medium">Clear all</button>
			</div>

			<div className="my-2 flex flex-col gap-6">
				<ItemContainer
					name={'Toyota Camry XLE, 2012'}
					location={'Ogba, Lagos State.'}
					specifications={['Foreign Used', 'Automatic']}
					price={'2,500,000.00'}
					images={[RedCar, 2, 3, 4, 5, 6]}
				/>
				<ItemContainer
					name={'Tiling and Brick Laying'}
					location={'Lagos State.'}
					specifications={['Available to travel across Nigeria']}
					// price={'2,500,000.00'}
					images={[KitchenTools, 2, 3]}
				/>
				<ItemContainer
					name={'Toyota Camry XLE, 2012'}
					location={'Ogba, Lagos State.'}
					specifications={['Foreign Used', 'Automatic']}
					price={'2,500,000.00'}
					images={[Furniture, 2, 3, 4, 5, 6]}
				/>
				<ItemContainer
					name={'Toyota Camry XLE, 2012'}
					location={'Ogba, Lagos State.'}
					specifications={['Foreign Used', 'Automatic']}
					price={'2,500,000.00'}
					images={[Property, 5, 6]}
				/>
				<ItemContainer
					name={'Toyota Camry XLE, 2012'}
					location={'Ogba, Lagos State.'}
					specifications={['Foreign Used', 'Automatic']}
					// price={'2,500,000.00'}
					images={[Spa]}
				/>
			</div>
		</div>
	);
};

export default SavedItems;

// name, location, specifications, price, images

// saved items data format
/* 
	[
		{
			name: "",
			location: "",
			price: "",
			specifications: [],
			images: []
		},
		{
			name: "",
			location: "",
			price: "",
			specifications: [],
			images: []
		},
	]
*/
