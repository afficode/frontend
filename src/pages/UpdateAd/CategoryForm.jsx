import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { FormControl } from '../../components';
import { Button } from '../../ui';
import {
	useSubCategories,
	useStates,
	useLga,
	useNotify,
	useUpdateAd,
	useCategories,
} from '../../hooks';
import { deleteImages, toOptions, toSelectOptions, uploadImage } from '../../utils';
import {
	Approutes,
	agricultureTypes,
	babiesBrands,
	babiesTypes,
	carMake,
	carModels,
	colors,
	displaySizes,
	displayTechnology,
	electronicsBrands,
	electronicsType,
	fashionBrands,
	fashionMaterials,
	fashionSizes,
	fashionTypes,
	gameGenre,
	healthBrands,
	healthProductFormulation,
	healthTypes,
	homeBrands,
	homeMaterials,
	homeTypes,
	motorbikeMake,
	motorbikeType,
	operatingSystems,
	otherVehicleType,
	petBreeds,
	petTypes,
	processors,
	propertyFacilities,
	propertyType,
	ramSize,
	resolution,
	servicesType,
	simType,
	softwarePlatforms,
	softwareTypes,
	sportBrands,
	sportTypes,
	storageSize,
	storageType,
	tradesmanArea,
	tradesmanType,
	tutorialTopics,
	vehicleAccessoriesType,
	years,
} from '../../constants';
import { useNavigate } from 'react-router-dom';

const CategoryForm = ({ categoryId, categoryName, initialValues, adImages, adId }) => {
	const [stateId, setStateId] = useState(null);
	const [selectedCarMake, setSelectedCarMake] = useState(null);
	const [selectedHealthCategory, setSelectedHealthCategory] = useState(null);
	const [selectedFashionCategory, setSelectedFashionCategory] = useState(null);
	const [selectedSoftwareCategory, setSelectedSoftwareCategory] = useState(null);
	const [selectedMotorbikeCategory, setSelectedMotorbikeCategory] = useState(null);
	const [selectedBabiesCategory, setSelectedBabiesCategory] = useState(null);
	const [selectedElectronicsCategory, setSelectedElectronicsCategory] = useState(null);
	const [selectedSportsCategory, setSelectedSportsCategory] = useState(null);
	const [selectedPetCategory, setSelectedPetCategory] = useState(null);
	const [selectedHomeCategory, setSelectedHomeCategory] = useState(null);
	const [selectedAgricultureCategory, setSelectedAgricultureCategory] = useState(null);
	const [selectedVehicleCategory, setSelectedVehicleCategory] = useState(null);
	const [selectedPropertyCategory, setSelectedPropertyCategory] = useState(null);
	const [selectedServicesCategory, setSelectedServicesCategory] = useState(null);
	const [selectedTradesmanCategory, setSelectedTradesmanCategory] = useState(null);

	// if other option is selected
	const [otherMake, setOtherMake] = useState(false);
	const [otherBand, setOtherBrand] = useState(false);
	const [otherType, setOtherType] = useState(false);
	const [otherMaterial, setOtherMaterial] = useState(false);
	const [otherSize, setOtherSize] = useState(false);
	const [otherFormulation, setOtherFormulation] = useState(false);
	const [otherBreed, setOtherBreed] = useState(false);
	const [otherPlatform, setOtherPlatform] = useState(false);
	const [otherFormat, setOtherFormat] = useState(false);
	const [otherGenre, setOtherGenre] = useState(false);
	const [otherColor, setOtherColor] = useState(false);
	const [otherExpertise, setOtherExpertise] = useState(false);
	const [otherRoom, setOtherRoom] = useState(false);
	const [otherUse, setOtherUse] = useState(false);
	const [otherCondition, setOtherCondition] = useState(false);
	const [otherProcessor, setOtherProcessor] = useState(false);
	const [otherScent, setOtherScent] = useState(false);
	const [otherFurnitureFor, setOtherFurnitureFor] = useState(false);

	// console.log(selectedElectronicsCategory);
	const { data: cat } = useCategories();
	const filteredCat = cat?.filter((item) => item.id >= 50 && item.id <= 63);
	const { data: subCat } = useSubCategories(categoryId);
	const { data: states } = useStates();
	const { data: lga } = useLga(stateId);

	const categoriesOptions = toSelectOptions(filteredCat, 'category', 'Choose from list');
	const subCategoriesOptions = toSelectOptions(subCat, 'subcategory', 'Choose from list');
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');
	const lgaOptions = toSelectOptions(lga, 'lga', 'Select your LGA');
	const yearOptions = toSelectOptions(years, 'year', 'Select a year', true);
	const colorOptions = toSelectOptions(colors, 'colorOptions', 'Select a color');

	// vehicle category
	const carMakeOptions = toSelectOptions(carMake, 'carMake', 'Select your car make');
	const carModelOptions = toSelectOptions(
		carModels(selectedCarMake),
		'carModel',
		'Select your car model'
	);
	const vehicleAccessoriesTypeOptions = toSelectOptions(
		vehicleAccessoriesType,
		'accessoriesType',
		'Select type here'
	);
	const otherVehicleTypeOptions = toSelectOptions(
		otherVehicleType,
		'otherVehicle',
		'Select type here'
	);

	// properties category
	const propertyTypeOptions = toOptions(
		propertyType[selectedPropertyCategory] === undefined
			? propertyType['default']
			: propertyType[selectedPropertyCategory],
		'propertyType'
	);
	const propertyFacilityOptions = toOptions(
		propertyFacilities[selectedPropertyCategory] === undefined
			? propertyFacilities['default']
			: propertyFacilities[selectedPropertyCategory],
		'propertyFacility'
	);

	//services category
	const servicesTypeOptions = toSelectOptions(
		servicesType[selectedServicesCategory],
		'serviceType',
		'Select type here'
	);
	const servicesExpertiseOptions = toSelectOptions(tutorialTopics, 'topic', 'Select expertise here');

	//motorbike category
	const motorbikeMakeOptions = toSelectOptions(
		motorbikeMake[selectedMotorbikeCategory],
		'motorbikeMake',
		'Select make here'
	);
	const motorbikeTypeOptions = toSelectOptions(motorbikeType, 'motorbikeType', 'Select type here');

	// tradesman category
	const tradesmanTypeOptions = toSelectOptions(
		tradesmanType[selectedTradesmanCategory],
		'type',
		'Select type here'
	);
	const tradesmanAreaOptions = toOptions(
		tradesmanArea[selectedTradesmanCategory] === undefined
			? tradesmanArea['default']
			: tradesmanArea[selectedTradesmanCategory],
		'area'
	);

	// fashion category
	const fashionTypesOptions = toSelectOptions(
		fashionTypes[selectedFashionCategory] === undefined
			? fashionTypes['default']
			: fashionTypes[selectedFashionCategory],
		'fashionType',
		'Select type here'
	);
	const fashionBrandOptions = toSelectOptions(
		fashionBrands[selectedFashionCategory] === undefined
			? fashionBrands['default']
			: fashionBrands[selectedFashionCategory],
		'fashionBrand',
		'Select brand here'
	);
	const fashionMaterialsOptions = toSelectOptions(
		fashionMaterials[selectedFashionCategory] === undefined
			? fashionMaterials['default']
			: fashionMaterials[selectedFashionCategory],
		'fashionMaterials',
		'Select material here'
	);
	const fashionSizeOptions = toSelectOptions(
		fashionSizes[selectedFashionCategory] === undefined
			? fashionSizes['default']
			: fashionSizes[selectedFashionCategory],
		'fashionSize',
		'Select size here'
	);

	// home category
	const homeBrandsOptions = toSelectOptions(
		homeBrands[selectedHomeCategory] === undefined
			? homeBrands['default']
			: homeBrands[selectedHomeCategory],
		'homeBrand',
		'Select brand here'
	);
	const homeTypesOptions = toSelectOptions(
		homeTypes[selectedHomeCategory] === undefined
			? homeTypes['default']
			: homeTypes[selectedHomeCategory],
		'homeType',
		'Select type here'
	);
	const homeMaterialsOptions = toSelectOptions(
		homeMaterials,
		'homeMaterial',
		'Select material type here'
	);

	//software category
	const softwarePlatformOptions = toSelectOptions(
		softwarePlatforms[selectedSoftwareCategory] === undefined
			? softwarePlatforms['default']
			: softwarePlatforms[selectedSoftwareCategory],
		'softwarePlatform',
		'Select platform here'
	);
	const softwareTypeOptions = toSelectOptions(
		softwareTypes,
		'softwareTypes',
		'Select software type here'
	);
	const gameGenreOptions = toSelectOptions(gameGenre, 'gameGenre', 'Select game genre here');

	//babies category
	const babiesBrandOptions = toSelectOptions(
		babiesBrands[selectedBabiesCategory] === undefined
			? babiesBrands['default']
			: babiesBrands[selectedBabiesCategory],
		'babiesBrands',
		'Select brand here'
	);
	const babiesTypeOptions = toSelectOptions(
		babiesTypes[selectedBabiesCategory] === undefined
			? babiesTypes['default']
			: babiesTypes[selectedBabiesCategory],
		'babiesType',
		'Select type here'
	);

	// electronics category
	const displaySizeOptions = toSelectOptions(displaySizes, 'displaySize', 'Select size here');
	const displayTechnologyOptions = toOptions(displayTechnology, 'displayTech');
	const ramSizeOptions = toSelectOptions(ramSize, 'ram', 'Select ram size here');
	const storageSizeOptions = toSelectOptions(storageSize, 'storageSize', 'Select storage size here');
	const storageTypeOptions = toSelectOptions(storageType, 'storageType', 'Select storage type here');
	const processorsOptions = toSelectOptions(processors, 'processor', 'Select processor here');
	const operatingSysOptions = toSelectOptions(
		operatingSystems,
		'OS',
		'Select operating system here'
	);
	const resolutionOptions = toSelectOptions(resolution, 'resolution', 'Select resolution here');
	const simTypeOptions = toSelectOptions(simType, 'simType', 'Select sim type here');
	const electronicsBrandsOptions = toSelectOptions(
		electronicsBrands[selectedElectronicsCategory] === undefined
			? electronicsBrands['default']
			: electronicsBrands[selectedElectronicsCategory],
		'electronicsBrand',
		'Select brand here'
	);
	const electronicsTypeOptions = toSelectOptions(
		electronicsType[selectedElectronicsCategory],
		'electronicsType',
		'Select type here'
	);

	// sports category
	const sportBrandOptions = toSelectOptions(
		sportBrands[selectedSportsCategory],
		'sportBrand',
		'Select brand here'
	);
	const sportTypeOptions = toSelectOptions(
		sportTypes[selectedSportsCategory],
		'sportType',
		'Select type here'
	);

	// agriculture category
	const agricultureTypeOptions = toSelectOptions(
		agricultureTypes[selectedAgricultureCategory],
		'agricultureTypes',
		'Select type here'
	);

	// pet category
	const petBreedsOptions = toSelectOptions(
		petBreeds[selectedPetCategory],
		'petBreed',
		'Select a breed'
	);
	const petTypeOptions = toSelectOptions(
		petTypes[selectedPetCategory] === undefined ? petTypes['default'] : petTypes[selectedPetCategory],
		'petType',
		'Select a breed type'
	);

	//health category
	const healthBrandOptions = toSelectOptions(
		healthBrands[selectedHealthCategory],
		'healthBrand',
		'Select brand here'
	);
	const healthTypesOptions = toSelectOptions(
		healthTypes[selectedHealthCategory],
		'healthType',
		'Select type here'
	);
	const healthFormulationOptions = toSelectOptions(
		healthProductFormulation,
		'healthFormulation',
		'Select formulation here'
	);

	const categoryFields = {
		vehicles: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			!['5005'].includes(selectedVehicleCategory) && {
				control: 'radio',
				label: 'Seller Type',
				name: 'seller_type',
				type: 'radio',
				options: [
					{ key: 'Dealer', value: 'dealer' },
					{ key: 'Private', value: 'private' },
				],
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'input',
				label: 'Vehicle Specification',
				name: 'vehicle_specification',
				type: 'text',
				placeholder: 'Enter the VIN of the vehicle. e.g. JTBJ.......',
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'select',
				label: 'Make',
				name: 'make',
				placeholder: 'e.g..Lexus',
				options: carMakeOptions,
			},
			{
				control: 'select',
				label: 'Model',
				name: 'model',
				placeholder: 'e.g. ES',
				options: carModelOptions,
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'select',
				label: 'Trim',
				name: 'trim',
				placeholder: 'e.g. 350',
				options: [
					{ key: 'Select a trim', value: '' },
					{ key: '350', value: '350' },
					{ key: '450', value: '450' },
					{ key: '550', value: '550' },
				],
			},
			['5005', '5007'].includes(selectedVehicleCategory) && {
				control: 'select',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type here',
				options:
					selectedVehicleCategory === '5007' ? otherVehicleTypeOptions : vehicleAccessoriesTypeOptions,
			},
			['5005', '5007'].includes(selectedVehicleCategory) &&
				otherType && {
					control: 'input',
					label: 'Other Type',
					name: 'type',
					type: 'text',
					placeholder: 'Enter type',
					required: true,
				},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'checkbox',
				type: 'checkbox',
				label: 'Vehicle Features',
				name: 'vehicle_features',
				options: [
					{ key: 'Reverse Camera', value: 'Reverse Camera' },
					{ key: 'Air Conditioning', value: 'Air Conditioning' },
					{ key: 'Parking Sensor', value: 'Parking Sensor' },
					{ key: 'Android Audio', value: 'Android Audio' },
					{ key: 'Apple Car Play', value: 'Apple Car Play' },
					{ key: 'Bluetooth Connectivity', value: 'Bluetooth Connectivity' },
					{ key: 'Tinted Glass', value: 'Tinted Glass' },
					{ key: 'Sat Navigation', value: 'Sat Navigation' },
					{ key: 'Alloy Wheels', value: 'Alloy Wheels' },
					{ key: 'Sunroof', value: 'Sunroof' },
					{ key: 'Power steering', value: 'Power steering' },
					{ key: 'Keyless Entry', value: 'Keyless Entry' },
					{ key: 'Central Lock', value: 'Central Lock' },
					{ key: 'Audio System', value: 'Audio System' },
				],
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder:
					'Enter as much information as possible. Please state IF any defects.You could include reason for  selling, number of previous owners, if there had been colour changes or defects.',
				required: true,
			},
			{
				control: 'radio',
				type: 'radio',
				label: ['5002', '5005'].includes(selectedVehicleCategory) ? 'Condition' : 'Vehicle Condition',
				name: 'ad_condition',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Nigerian Used', value: 'nigerian use' },
					{ key: 'Foreign Used', value: 'foreign use' },
					// { key: 'Painted', value: 'painted' },
					// { key: 'Unpainted', value: 'unpainted' },
				],
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			!['5005'].includes(selectedVehicleCategory) && {
				control: 'select',
				label: 'Year of Manufacture?',
				name: 'year',
				placeholder: 'e.g. 350',
				options: yearOptions,
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'input',
				label: 'Your Vehicle Mileage?',
				name: 'millage',
				type: 'text',
				placeholder: 'Enter your mileage eg. 105,000miles',
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'radio',
				type: 'radio',
				label: 'Vehicle Body Type',
				name: 'vehicle_body',
				options: [
					{ key: 'SUV', value: 'suv' },
					{ key: 'Crossover', value: 'crossover' },
					{ key: 'Hatchback', value: 'hatchback' },
					{ key: 'Pick-up Truck', value: 'pick-up truck' },
					{ key: 'SUStation WagonV', value: 'station wagon' },
					{ key: 'Coupe', value: 'coupe' },
					{ key: 'Sports car', value: 'sports car' },
					{ key: 'Sedan', value: 'sedan' },
					{ key: 'Minivan', value: 'minivan' },
					{ key: 'Convertible', value: 'convertible' },
					{ key: 'Van', value: 'van' },
					{ key: 'Panel van', value: 'panel van' },
					{ key: 'Compact car', value: 'compact car' },
					{ key: 'Microcar', value: 'microcar' },
					{ key: 'Roadster', value: 'roadster' },
				],
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'radio',
				type: 'radio',
				label: 'Transmission',
				name: 'transmission',
				options: [
					{ key: 'Automatic', value: 'automatic' },
					{ key: 'Manual', value: 'manual' },
					{ key: 'CVT', value: 'cvt' },
				],
			},
			{
				control: 'select',
				label: 'Colour',
				name: 'color',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'select',
				label: 'Number of Seats',
				name: 'number_of_seat',
				options: [
					{ key: 'Select an option', value: '' },
					{ key: '2', value: '2' },
					{ key: '3', value: '3' },
					{ key: '4', value: '4' },
					{ key: '5', value: '5' },
					{ key: '6', value: '6' },
					{ key: '7', value: '7' },
					{ key: '8', value: '8' },
					{ key: '9', value: '9' },
					{ key: '10', value: '10' },
				],
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'select',
				label: 'Number of Doors',
				name: 'number_of_door',
				options: [
					{ key: 'Select an option', value: '' },
					{ key: '2', value: '2' },
					{ key: '4', value: '4' },
					{ key: '5', value: '5' },
				],
			},
			!['5005'].includes(selectedVehicleCategory) && {
				control: 'select',
				label: 'Fuel Type',
				name: 'fuel_type',
				options: [
					{ key: 'Select an option', value: '' },
					{ key: 'Petrol', value: 'petrol' },
					{ key: 'Diesel', value: 'diesel' },
					{ key: 'Gasoline', value: 'gasoline' },
					{ key: 'Hybrid', value: 'hybrid' },
				],
			},
			!['5002', '5005'].includes(selectedVehicleCategory) && {
				control: 'select',
				label: 'Engine Size',
				name: 'engine_size',
				options: [
					{ key: 'Select an option', value: '' },
					{ key: '1.3L', value: '1.3' },
					{ key: '1.6L', value: '1.6 ' },
					{ key: '1.8L', value: '1.8' },
					{ key: '2L', value: '2' },
					{ key: '2.5L', value: '2.5' },
					{ key: '3L and above', value: '3' },
				],
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		properties: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'radio',
				label: 'Marketed By',
				name: 'marketed_by',
				type: 'radio',
				options: [
					{ key: 'Owner', value: 'owner' },
					{ key: 'Agent', value: 'agent' },
				],
			},
			{
				control: 'input',
				label: 'Property title',
				name: 'title',
				type: 'text',
				placeholder: 'e.g; Luxurious 5 Bed Apartment at Omole, Ojodu',
				required: true,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Property type',
				name: 'property_type',
				options: propertyTypeOptions,
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Property Facilities',
				name: 'facilities',
				options: propertyFacilityOptions,
			},
			!['5105'].includes(selectedPropertyCategory) && {
				control: 'radio',
				label: 'Property Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Refurbished', value: 'refurbished' },
					{ key: 'Used', value: 'used' },
				],
			},
			['5101', '5102', '5103', '5104', '5107', '5108', '5109'].includes(selectedPropertyCategory) && {
				control: 'radio',
				label: 'Any Furnishing',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'Furnished', value: 'furnished' },
					{ key: 'Semi-furnished', value: 'semi-furnished' },
					{ key: 'Unfurnished', value: 'Unfurnished' },
				],
			},
			// ['5105'].includes(selectedPropertyCategory) && {
			// 	control: 'radio',
			// 	label: 'Property Use',
			// 	name: 'property_use',
			// 	type: 'radio',
			// 	options: [
			// 		{ key: 'Commercial', value: 'commercial' },
			// 		{ key: 'Residential', value: 'residential' },
			// 		{ key: 'Other', value: 'other' },
			// 	],
			// },
			otherUse && {
				control: 'input',
				label: 'Other Property Use',
				name: 'property_use',
				type: 'text',
				placeholder: 'Enter property use',
				required: true,
			},
			!['5105', '5106', '5108', '5109'].includes(selectedPropertyCategory) && {
				control: 'select',
				label: 'Rooms/Bathrooms',
				name: 'room_bathroom',
				options: [
					{ key: 'Select an option', value: '' },
					{ key: '2-bed / 1 bath', value: '2-bed / 1-bath' },
					{ key: '1-bed / 1 bath', value: '1-bed / 1-bath' },
					{ key: '3-bed / 2 bath', value: '3-bed / 2-bath' },
					{ key: '2-bed / 2 bath', value: '2-bed / 2-bath' },
					{ key: '4-bed / 3 bath', value: '4-bed / 3-bath' },
					{ key: '4-bed / 4 bath', value: '4-bed / 4-bath' },
					{ key: '5-bed / 4 bath', value: '5-bed / 4-bath' },
					{ key: '6-bed / 5 bath', value: '6-bed / 5-bath' },
					{ key: '6-bed / 6 bath', value: '6-bed / 6-bath' },
					{ key: 'Other', value: 'other' },
				],
			},
			otherRoom && {
				control: 'input',
				label: 'Other Rooms/Bathrooms',
				name: 'room_bathroom',
				type: 'text',
				placeholder: 'Enter number of rooms/bathrooms',
				required: true,
			},
			['5105', '5103', '5104', '5108', '5109'].includes(selectedPropertyCategory) && {
				control: 'input',
				label: 'Property size in m^2',
				name: 'size',
				type: 'text',
				placeholder: 'Enter property size',
			},
			['5104', '5109'].includes(selectedPropertyCategory) && {
				control: 'radio',
				label: 'Time period',
				name: 'time_period',
				type: 'radio',
				options: [
					{ key: 'Period of 1 - 2 years', value: 'Period of 1 - 2 years' },
					{ key: 'Period of 2 - 5 years', value: 'Period of 2 - 5 years' },
					{ key: 'Period of 5 - 10 years', value: 'Period of 5 - 10 years' },
					{ key: 'Period of 10 and more', value: 'Period of 10 and more' },
				],
			},
			{
				control: 'datepicker',
				label: 'Date Available',
				name: 'date_available',
				placeholder: 'Select date available',
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		services: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: '',
				name: 'images',
				type: 'file',
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Lawyer, Carpentry, Driver',
				required: true,
			},
			{
				control: [
					'5201',
					'5202',
					'5203',
					'5204',
					'5205',
					'5206',
					'5207',
					'5209',
					'5210',
					'5211',
					'5212',
					'5213',
				].includes(selectedServicesCategory)
					? 'select'
					: 'input',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type here',
				options: servicesTypeOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
			},
			selectedServicesCategory === '5206' && {
				control: 'select',
				label: 'Expertise',
				name: 'expertise',
				options: servicesExpertiseOptions,
			},
			selectedServicesCategory === '5206' &&
				otherExpertise && {
					control: 'input',
					label: 'Other Expertise',
					name: 'expertise',
					type: 'text',
					placeholder: 'Enter expertise',
				},

			selectedServicesCategory === '5213' && {
				control: 'select',
				label: 'Make of vehicle',
				name: 'make',
				options: [
					{ key: 'Select an option', value: '' },
					{ key: 'Caterpillar', value: 'caterpillar' },
					{ key: 'Grove', value: 'grove' },
					{ key: 'Atlas Copco', value: 'atlas copco' },
					{ key: 'Deutz', value: 'deutz' },
					{ key: 'Foton', value: 'foton' },
					{ key: 'Goldoni', value: 'goldoni' },
					{ key: 'Hyster', value: 'hyster' },
					{ key: '	MAN', value: 'MAN' },
					{ key: 'Toyota', value: 'toyota' },
					{ key: '	Bomag', value: 'bomag' },
					{ key: 'Fiat', value: 'fiat' },
					{ key: 'Liebherr', value: 'liebherr' },
					{ key: 'Manitowoc', value: 'manitowoc' },
					{ key: 'Massey Ferguson', value: 'massey ferguson' },
					{ key: 'Terex', value: 'terex' },
					{ key: 'Toyota', value: 'toyota' },
					{ key: 'Other', value: 'other' },
				],
			},
			selectedServicesCategory === '5213' &&
				otherMake && {
					control: 'input',
					label: 'Other Make of vehicle',
					name: 'make',
					type: 'text',
					placeholder: 'Enter make',
				},
			{
				control: 'radio',
				label: 'Available to Travel',
				name: 'available_to_travel',
				type: 'radio',
				options: [
					{ key: 'Yes', value: 'yes' },
					{ key: 'No', value: 'no' },
				],
			},
			{
				control: 'radio',
				type: 'radio',
				label: 'Years of Experience',
				name: 'years_of_experience',
				options: [
					{ key: '1 - 5', value: '1-5' },
					{ key: '5 - 10', value: '5-10' },
					{ key: '10 - 15', value: '10-15' },
					{ key: '15+', value: '15+' },
				],
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'radio',
				type: 'radio',
				label: 'Employment Status',
				name: 'employment_status',
				options: [
					{ key: 'Employed', value: 'employed' },
					{ key: 'Unemployed', value: 'unemployed' },
					{ key: 'Self-Employed', value: 'self-employed' },
					{ key: 'other', value: 'other' },
				],
			},
			['5204', '5207'].includes(selectedServicesCategory) && {
				control: 'radio',
				type: 'radio',
				label: 'Level of Education',
				name: 'level_of_education',
				options: [
					{ key: "O'level", value: "o'level" },
					{ key: 'BSc', value: 'BSc' },
					{ key: 'Masters', value: 'masters' },
					{ key: 'Other qualification', value: 'other qualification' },
					{ key: 'No Formal Education', value: 'no formal education' },
				],
			},
			['5204', '5207'].includes(selectedServicesCategory) && {
				control: 'radio',
				type: 'radio',
				label: 'Type of Employment',
				name: 'employment_type',
				options: [
					{ key: 'Full-time', value: 'full-time' },
					{ key: 'Part-time', value: 'part-time' },
					{ key: 'Special arrangement', value: 'special arrangement' },
				],
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		agriculture: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'select',
				label: 'Type',
				name: 'type',
				options: agricultureTypeOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
				required: true,
			},
			!['5302'].includes(selectedAgricultureCategory) && {
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Used', value: 'used' },
				],
			},
			!['5302'].includes(selectedAgricultureCategory) && {
				control: 'radio',
				type: 'radio',
				label: 'Age',
				name: 'age',
				options: [
					{ key: '0 - 1', value: '0-1' },
					{ key: '1 - 3', value: '1-3' },
					{ key: '3 - 7', value: '3-7' },
					{ key: '7 - 10', value: '7-10' },
				],
			},
			['5301'].includes(selectedAgricultureCategory) && {
				control: 'radio',
				type: 'radio',
				label: 'Gender',
				name: 'gender',
				options: [
					{ key: 'Male', value: 'male' },
					{ key: 'Female', value: 'female' },
				],
			},
			['5301'].includes(selectedAgricultureCategory) && {
				control: 'select',
				label: 'Colour',
				name: 'color',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		electronics: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Used', value: 'used' },
					{ key: 'Refurbished', value: 'refurbished' },
					{ key: 'For Parts/Not Working', value: 'For Parts/Not Working' },
				],
			},
			{
				control: 'select',
				label: 'Brand',
				name: 'brand',
				options: electronicsBrandsOptions,
			},
			otherBand && {
				control: 'input',
				label: 'Other Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand',
				required: true,
			},
			['5404', '5405', '5407', '5408', '5410'].includes(selectedElectronicsCategory) && {
				control: 'select',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'e.g; modem, laptop',
				options: electronicsTypeOptions,
			},

			['5404', '5405', '5407', '5408', '5410'].includes(selectedElectronicsCategory) &&
				otherType && {
					control: 'input',
					label: 'Other Type',
					name: 'type',
					type: 'text',
					placeholder: 'Enter type',
					required: true,
				},

			selectedElectronicsCategory === '5402' && {
				control: 'select',
				label: 'Resolution Quality',
				name: 'resolution',
				options: resolutionOptions,
			},
			['5402', '5406', '5409', '5411'].includes(selectedElectronicsCategory) && {
				control: 'select',
				label: 'Display Size',
				name: 'electronics_display_size',
				options: displaySizeOptions,
			},
			selectedElectronicsCategory === '5402' && {
				control: 'checkbox',
				label: 'Input mode',
				name: 'input_mode',
				type: 'checkbox',
				options: [
					{ key: 'Display Port', value: 'display port' },
					{ key: 'DVI-D', value: 'DVI-D' },
					{ key: 'HDMI', value: 'HDMI' },
					{ key: 'USB 2.0', value: 'USB 2.0' },
					{ key: 'USB 3.0 ', value: 'USB 3.0 ' },
					{ key: 'VGA', value: 'VGA' },
				],
			},
			['5402', '5406'].includes(selectedElectronicsCategory) && {
				control: 'checkbox',
				label: 'Display technology',
				name: 'display_technology',
				type: 'checkbox',
				options: displayTechnologyOptions,
			},
			selectedElectronicsCategory === '5403' && {
				control: 'radio',
				label: 'Style',
				name: 'electronics_style',
				type: 'radio',
				options: [
					{ key: 'Over-ear', value: 'over-ear' },
					{ key: 'On-ear', value: 'on-ear' },
					{ key: 'In-ear', value: 'in-ear' },
				],
			},
			['5403', '5410'].includes(selectedElectronicsCategory) && {
				control: 'radio',
				label: 'Connectivity',
				name: 'connectivity',
				type: 'radio',
				options: [
					{ key: 'Wireless', value: 'wireless' },
					{ key: 'Wired', value: 'wired' },
					{ key: 'Wired/Wireless', value: 'Wired/Wireless' },
				],
			},
			selectedElectronicsCategory === '5403' && {
				control: 'checkbox',
				label: 'Connectivity Interface',
				name: 'connectivity_interface',
				type: 'checkbox',
				options: [
					{ key: 'USB Type-C', value: 'USB Type-C' },
					{ key: 'Bluetooth', value: 'Bluetooth' },
					{ key: 'Mini USB / Bluetooth', value: 'Mini USB / Bluetooth' },
					{ key: 'Micro USB / Bluetooth', value: 'Micro USB / Bluetooth' },
					{ key: 'Lightning / Bluetooth ', value: 'Lightning / Bluetooth ' },
					{ key: '2.5 mm / Bluetooth', value: '2.5 mm / Bluetooth' },
					{ key: '2.5 mm', value: '2.5 mm' },
					{ key: 'USB Type-C / Bluetooth', value: 'USB Type-C / Bluetooth' },
					{ key: 'Micro USB', value: 'Micro USB' },
					{ key: '3.5 mm / Bluetooth', value: '3.5 mm / Bluetooth' },
					{ key: 'Other', value: 'other' },
				],
			},
			selectedElectronicsCategory === '5403' && {
				control: 'checkbox',
				label: 'Features',
				name: 'features',
				type: 'checkbox',
				options: [
					{ key: 'Wireless Charging', value: 'Wireless Charging' },
					{ key: 'Waterproof ', value: 'Waterproof ' },
					{ key: 'NFC', value: 'NFC' },
					{ key: 'Light Effects', value: 'Light Effects' },
					{ key: 'Hi-Res Audio', value: 'Hi-Res Audio' },
					{ key: 'Detachable Microphone', value: 'Detachable Microphone' },
					{ key: 'AptX / AptX HD', value: 'AptX / AptX HD' },
					{ key: 'Active Noise Cancellation', value: 'Active Noise Cancellation' },
				],
			},
			['5409', '5406'].includes(selectedElectronicsCategory) && {
				control: 'select',
				label: 'Size of Ram',
				name: 'ram_size',
				options: ramSizeOptions,
			},
			['5409', '5406'].includes(selectedElectronicsCategory) && {
				control: 'select',
				label: 'Storage',
				name: 'storage',
				options: storageSizeOptions,
			},
			selectedElectronicsCategory === '5409' && {
				control: 'select',
				label: 'Storage type',
				name: 'storage_type',
				options: storageTypeOptions,
			},
			selectedElectronicsCategory === '5406' && {
				control: 'select',
				label: 'SIM type',
				name: 'sim_type',
				options: simTypeOptions,
			},
			selectedElectronicsCategory === '5409' && {
				control: 'select',
				label: 'Processor',
				name: 'processor',
				options: processorsOptions,
			},
			selectedElectronicsCategory === '5409' &&
				otherProcessor && {
					control: 'input',
					type: 'text',
					label: 'Other Processor',
					name: 'processor',
					placeholder: 'Enter other processor',
					required: true,
				},
			selectedElectronicsCategory === '5409' && {
				control: 'select',
				label: 'Operating System',
				name: 'operating_system',
				options: operatingSysOptions,
			},
			selectedElectronicsCategory === '5406' && {
				control: 'radio',
				label: 'Exchange Possible?',
				type: 'radio',
				name: 'exchange_possible',
				options: [
					{ key: 'Yes', value: 'yes' },
					{ key: 'No', value: 'no' },
				],
			},
			{
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},

			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		fashion: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'radio',
				label: 'Style',
				name: 'style',
				type: 'radio',
				options: [
					{ key: 'Business', value: 'business' },
					{ key: 'Casual', value: 'casual' },
					{ key: 'Sport', value: 'other' },
				],
			},
			{
				control: 'radio',
				label: 'Gender',
				name: 'gender',
				type: 'radio',
				options: [
					{ key: 'Male', value: 'male' },
					{ key: 'Female', value: 'female' },
					{ key: 'Unisex', value: 'unisex' },
				],
			},
			{
				control: 'select',
				label: 'Size',
				name: 'size',
				type: 'text',
				options: fashionSizeOptions,
			},
			otherSize && {
				control: 'input',
				label: 'Other Size',
				name: 'size',
				type: 'text',
				placeholder: 'Enter size',
				required: true,
			},
			{
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			{
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Nigerian Used', value: 'nigerian use' },
					{ key: 'Foreign Used', value: 'foreign use' },
				],
			},

			{
				control: 'select',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'select type here.',
				options: fashionTypesOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
				required: true,
			},
			{
				control: 'select',
				label: 'Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'select brand here.',
				options: fashionBrandOptions,
			},
			otherBand && {
				control: 'input',
				label: 'Other Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand',
				required: true,
			},
			{
				control: 'select',
				label: 'Material',
				name: 'material',
				placeholder: 'select material here.',
				options: fashionMaterialsOptions,
			},
			otherMaterial && {
				control: 'input',
				label: 'Other Material',
				name: 'material',
				type: 'text',
				placeholder: 'Enter material',
				required: true,
			},
			selectedFashionCategory === '5306' && {
				control: 'radio',
				label: 'Display',
				name: 'display',
				type: 'radio',
				options: [
					{ key: 'Analog ', value: 'analog ' },
					{ key: 'Digital ', value: 'digital ' },
					{ key: 'Analog % Digital', value: 'analog and digital' },
				],
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		health: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},

			!['5608'].includes(selectedHealthCategory) && {
				control: 'select',
				label: 'Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand here.',
				options: healthBrandOptions,
			},
			otherBand && {
				control: 'input',
				label: 'Other Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand',
				required: true,
			},
			{
				control: 'select',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'Input a type',
				options: healthTypesOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
				required: true,
			},
			!['5603', '5601', '5605', '5607', '5608', '5604', '5606'].includes(selectedHealthCategory) && {
				control: 'radio',
				label: 'Age Group',
				name: 'age',
				type: 'radio',
				options: [
					{ key: '1 - 10', value: '1-10' },
					{ key: '10 - 20', value: '10-20' },
					{ key: '20 - 30', value: '20-30' },
					{ key: '30 - 40', value: '30-40' },
					{ key: '40 - 50', value: '40-50' },
					{ key: '50 - 60', value: '50-60' },
				],
			},
			!['5608', '5602', '5604', '5606'].includes(selectedHealthCategory) && {
				control: 'radio',
				label: 'Gender',
				name: 'gender',
				type: 'radio',
				options: [
					{ key: 'Male', value: 'male' },
					{ key: 'Female', value: 'female' },
					{ key: 'Unisex', value: 'unisex' },
				],
			},
			['5601', '5605'].includes(selectedHealthCategory) && {
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			!['5603', '5607', '5602', '5604', '5606'].includes(selectedHealthCategory) && {
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Used', value: 'used' },
				],
			},
			['5602', '5603'].includes(selectedHealthCategory) && {
				control: 'select',
				label: 'Formulation',
				name: 'formulation',
				options: healthFormulationOptions,
			},
			otherFormulation && {
				control: 'input',
				label: 'Other Formulation',
				name: 'formulation',
				type: 'text',
				placeholder: 'Enter formulation',
				required: true,
			},
			selectedHealthCategory === '5603' && {
				control: 'select',
				label: 'Scent type',
				name: 'scent_type',
				options: [
					{ key: 'Select scent type here', value: '' },
					{ key: 'Spicy', value: 'Spicy' },
					{ key: 'Citrus', value: 'Citrus' },
					{ key: 'Floral', value: 'Floral' },
					{ key: 'Oceanic', value: 'Oceanic' },
					{ key: 'Oriental', value: 'Oriental' },
					{ key: 'Fruity ', value: 'Fruity' },
					{ key: 'Woody ', value: 'Woody' },
					{ key: 'Other ', value: 'other' },
				],
			},
			otherScent && {
				control: 'input',
				label: 'Other Scent type',
				name: 'scent_type',
				type: 'text',
				placeholder: 'Enter scent type',
				required: true,
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		home: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			![''].includes(selectedHomeCategory) && {
				control: 'select',
				label: 'Brand',
				name: 'brand',
				options: homeBrandsOptions,
			},
			otherBand && {
				control: 'input',
				label: 'Other Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand',
				required: true,
			},
			![''].includes(selectedHomeCategory) && {
				control: 'select',
				label: 'Type',
				name: 'type',
				options: homeTypesOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
				required: true,
			},
			['5701'].includes(selectedHomeCategory) && {
				control: 'select',
				label: 'Material',
				name: 'material',
				options: homeMaterialsOptions,
			},
			otherMaterial && {
				control: 'input',
				label: 'Other Material',
				name: 'material',
				type: 'text',
				placeholder: 'Enter material',
				required: true,
			},
			['5701'].includes(selectedHomeCategory) && {
				control: 'select',
				label: 'Furniture for',
				name: 'furniture_for',
				options: furnitureForOptions,
			},
			otherFurnitureFor && {
				control: 'input',
				label: 'Other Furniture for',
				name: 'furniture_for',
				type: 'text',
				placeholder: 'Enter furniture for',
				required: true,
			},
			['5704'].includes(selectedHomeCategory) && {
				control: 'select',
				label: 'Form',
				name: 'formulation',
				options: homeFormOptions,
			},
			otherFormulation && {
				control: 'input',
				label: 'Other Form',
				name: 'formulation',
				type: 'text',
				placeholder: 'Enter form',
				required: true,
			},
			!['5704'].includes(selectedHomeCategory) && {
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'Used', value: 'used' },
					{ key: 'Brand New', value: 'brand new' },
					{ key: 'Refurbished', value: 'refurbished' },
				],
			},
			['5701', '5702'].includes(selectedHomeCategory) && {
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		tradesman: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'input',
				label: 'Company Name',
				name: 'company_name',
				type: 'text',
				placeholder: 'Enter company name here',
			},
			!['5802', '5803'].includes(selectedTradesmanCategory) && {
				control: 'select',
				label: 'Type',
				name: 'type',
				options: tradesmanTypeOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
				required: true,
			},
			!['5811', '5803', '5809'].includes(selectedTradesmanCategory) && {
				control: 'radio',
				label: 'Service Area',
				name: 'service_area',
				type: 'radio',
				options: tradesmanAreaOptions,
			},
			!['5806', '5811', '5812'].includes(selectedTradesmanCategory) && {
				control: 'checkbox',
				label: 'Service Features',
				name: 'service_features',
				type: 'checkbox',
				options: [
					{ key: 'Free Consultation', value: 'free consultation' },
					{ key: 'Home Visit', value: 'home visit' },
				],
			},
			['5812'].includes(selectedTradesmanCategory) && {
				control: 'radio',
				label: 'Payment Terms',
				name: 'payment_terms',
				type: 'radio',
				options: [
					{ key: 'Pay per hour', value: 'Pay per hour' },
					{ key: 'Pay per piece', value: 'Pay per piece' },
					{ key: 'Daily payment', value: 'Daily payment' },
					{ key: 'Contract', value: 'Contract' },
				],
			},
			['5812'].includes(selectedTradesmanCategory) && {
				control: 'radio',
				label: 'Mode of Transport',
				name: 'mode_of_transport',
				type: 'radio',
				options: [
					{ key: 'Road', value: 'road' },
					{ key: 'Rail', value: 'Rail' },
					{ key: 'Air', value: 'Air' },
					{ key: 'Maritime', value: 'Maritime' },
					{ key: 'Cycling and Pedestrian', value: 'Cycling and Pedestrian' },
					{ key: 'Intermodal/modal Transportation', value: 'Intermodal/modal Transportation' },
				],
			},
			['5803', '5811', '5809'].includes(selectedTradesmanCategory) && {
				control: 'checkbox',
				label: 'Form',
				name: 'form',
				type: 'checkbox',
				options: tradesmanFormOptions,
			},
			['5804', '5810', '5813'].includes(selectedTradesmanCategory) && {
				control: 'radio',
				label: 'Years of Experience',
				name: 'years_of_experience',
				type: 'radio',
				options: [
					{ key: '0 - 3', value: '0-3' },
					{ key: '3 - 6', value: '3-6' },
					{ key: '6 - 10', value: '6-10' },
					{ key: '10 - 15', value: '10-15' },
					{ key: '15 - 20', value: '15-20' },
					{ key: '20+', value: '20+' },
				],
			},
			['5804'].includes(selectedTradesmanCategory) && {
				control: 'radio',
				label: 'Mode of Charges',
				name: 'mode_of_charges',
				type: 'radio',
				options: [
					{ key: 'Estimated', value: 'estimated' },
					{ key: 'TBD', value: 'tbd' },
				],
			},
			!['5811', '5803', '5812', '5813'].includes(selectedTradesmanCategory) && {
				control: 'radio',
				label: 'Available to travel',
				name: 'available_to_travel',
				type: 'radio',
				options: [
					{ key: 'Yes', value: 'yes' },
					{ key: 'No', value: 'no' },
				],
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		software: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			['5902', '5903'].includes(selectedSoftwareCategory) && {
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Used', value: 'used' },
					{ key: 'Refurbished', value: 'refurbished' },
					{ key: 'For Parts/Not Working', value: 'for parts not working' },
				],
			},
			!['5903'].includes(selectedSoftwareCategory) && {
				control: 'select',
				label: 'Platform',
				name: 'platform',
				options: softwarePlatformOptions,
			},
			otherPlatform && {
				control: 'input',
				label: 'Other Platform',
				name: 'platform',
				type: 'text',
				placeholder: 'Enter platform',
				required: true,
			},
			!['5903'].includes(selectedSoftwareCategory) && {
				control: 'radio',
				label: 'Format',
				name: 'format',
				type: 'radio',
				options: [
					{ key: 'Product Keys', value: 'product_keys' },
					{ key: 'USB', value: 'usb' },
					{ key: 'Email', value: 'email format' },
					{ key: 'CD', value: 'cd' },
					{ key: 'Other', value: 'other' },
				],
			},
			otherFormat && {
				control: 'input',
				label: 'Other Format',
				name: 'format',
				type: 'text',
				placeholder: 'Enter format',
				required: true,
			},
			['5902'].includes(selectedSoftwareCategory) && {
				control: 'select',
				label: 'Release Year',
				name: 'release_year',
				options: yearOptions,
			},
			['5902'].includes(selectedSoftwareCategory) && {
				control: 'select',
				label: 'Game genre',
				name: 'game_genre',
				options: gameGenreOptions,
			},
			otherGenre && {
				control: 'input',
				label: 'Other Game genre',
				name: 'game_genre',
				type: 'text',
				placeholder: 'Enter Game genre',
				required: true,
			},
			['5901'].includes(selectedSoftwareCategory) && {
				control: 'select',
				label: 'Software Type',
				name: 'type',
				options: softwareTypeOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Software Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter Software type',
				required: true,
			},
			['5902'].includes(selectedSoftwareCategory) && {
				control: 'radio',
				label: 'Rating',
				name: 'rating',
				type: 'radio',
				options: [
					{ key: 'Everyone', value: 'Everyone' },
					{ key: '10+', value: '10+' },
					{ key: 'Todler', value: 'Todler' },
					{ key: 'Adults Only', value: 'Adults Only' },
					{ key: 'Mature', value: 'Mature' },
					{ key: 'Teenager', value: 'Teenager' },
				],
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable?',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		pet: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			['6001', '6004'].includes(selectedPetCategory) && {
				control: 'select',
				label: 'Breed',
				name: 'breed',
				type: 'text',
				placeholder: 'Enter a breed',
				options: petBreedsOptions,
			},
			otherBreed && {
				control: 'input',
				label: 'Other Breed',
				name: 'breed',
				type: 'text',
				placeholder: 'Enter breed',
				required: true,
			},
			{
				control: 'select',
				label: 'Type',
				name: 'type',
				options: petTypeOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter breed type',
				required: true,
			},
			!['6002', '6003', '6004'].includes(selectedPetCategory) && {
				control: 'radio',
				label: 'Gender',
				name: 'gender',
				type: 'radio',
				options: [
					{ key: 'Male', value: 'male' },
					{ key: 'Female ', value: 'female' },
				],
			},
			!['6002', '6004', '6005'].includes(selectedPetCategory) && {
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			['6003'].includes(selectedPetCategory) && {
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'Nigerian Used', value: 'Nigerian Used' },
					{ key: 'Foreign Used ', value: 'Foreign Used' },
					{ key: 'Brand New', value: 'Brand New' },
				],
			},
			!['6002', '6003'].includes(selectedPetCategory) && {
				control: 'radio',
				label: 'Age',
				name: 'age',
				type: 'radio',
				options: [
					{ key: '1 - 2', value: '1-2' },
					{ key: '2 - 4', value: '2-4' },
					{ key: '4 - 6', value: '4-6' },
					{ key: '6 - 8', value: '6-8' },
					{ key: '8+', value: '8+' },
				],
			},

			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			['6002', '6003'].includes(selectedPetCategory) && {
				control: 'input',
				label: 'Bulk price',
				name: 'bulk_price',
				type: 'number',
				placeholder: '₦0.00',
			},
			{
				control: 'toggle',
				label: 'Negotiable?',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		babies: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			!['6111'].includes(selectedBabiesCategory) && {
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Used', value: 'used' },
				],
			},
			!['6106', '6101'].includes(selectedBabiesCategory) && {
				control: 'select',
				label: 'Brand',
				name: 'brand',
				options: babiesBrandOptions,
			},
			otherBand && {
				control: 'input',
				label: 'Other Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand',
				required: true,
			},
			!['6111', '6105'].includes(selectedBabiesCategory) && {
				control: 'select',
				label: 'Type',
				name: 'type',
				options: babiesTypeOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
				required: true,
			},
			!['6104', '6101', '6111', '6105', '6109'].includes(selectedBabiesCategory) && {
				control: 'radio',
				label: 'Gender',
				name: 'gender',
				type: 'radio',
				options: [
					{ key: 'Male', value: 'male' },
					{ key: 'Female', value: 'female' },
				],
			},
			!['6101', '6111'].includes(selectedBabiesCategory) && {
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			['6107'].includes(selectedBabiesCategory) && {
				control: 'radio',
				label: 'Capacity',
				name: 'capacity',
				type: 'radio',
				options: [
					{ key: 'Double', value: 'Double' },
					{ key: 'Single', value: 'Single' },
					{ key: 'Triple', value: 'Triple' },
					{ key: 'Quad', value: 'Quad' },
					{ key: 'Other', value: 'Other' },
				],
			},
			!['6107', '6104', '6106'].includes(selectedBabiesCategory) && {
				control: 'radio',
				label: 'Age',
				name: 'age',
				type: 'radio',
				options: [
					{ key: '0 - 2', value: '0-2' },
					{ key: '2 - 4', value: '2-4' },
					{ key: '4 - 6', value: '4-6' },
					{ key: '6 - 8', value: '6-8' },
					{ key: '8+', value: '8+' },
				],
			},
			['6102'].includes(selectedBabiesCategory) && {
				control: 'select',
				label: 'Size',
				name: 'size',
				options: babiesSizeOptions,
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'input',
				label: 'Bulk Price',
				name: 'bulk_price',
				type: 'number',
				placeholder: '₦0.00',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		sports: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			!['6204'].includes(selectedSportsCategory) && {
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Nigerian Used', value: 'nigerian use' },
					{ key: 'Foreign Used', value: 'foreign use' },
				],
			},
			!['6205', '6206', '6204', '6201', '6202', '6203'].includes(selectedSportsCategory) && {
				control: 'radio',
				label: 'Gender',
				name: 'gender',
				type: 'radio',
				options: [
					{ key: 'Male', value: 'male' },
					{ key: 'Female', value: 'female' },
				],
			},
			['6202', '6203', '6206'].includes(selectedSportsCategory) && {
				control: 'select',
				label: 'Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand here.',
				options: sportBrandOptions,
			},
			otherBand && {
				control: 'input',
				label: 'Other Brand',
				name: 'brand',
				type: 'text',
				placeholder: 'Enter brand',
				required: true,
			},
			['6201', '6202', '6203', '6204', '6205'].includes(selectedSportsCategory) && {
				control: 'select',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'e.g; drum',
				options: sportTypeOptions,
			},
			otherType && {
				control: 'input',
				label: 'Other Type',
				name: 'type',
				type: 'text',
				placeholder: 'Enter type',
				required: true,
			},
			!['6205', '6204', '6201', '6202', '6203'].includes(selectedSportsCategory) && {
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			['6205'].includes(selectedSportsCategory) && {
				control: 'select',
				label: 'Age',
				name: 'age',
				options: [
					{ key: 'Select age here', value: '' },
					{ key: 'Baby', value: 'baby' },
					{ key: 'Children', value: 'children' },
					{ key: 'Teenager', value: 'teenager' },
					{ key: 'Adult', value: 'adult' },
					{ key: 'Other', value: 'other' },
				],
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		motorbike: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: subCategoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'radio',
				label: 'Seller Type',
				name: 'seller_type',
				type: 'radio',
				options: [
					{ key: 'Dealer', value: 'dealer' },
					{ key: 'Private', value: 'private' },
				],
			},
			// {
			// 	control: 'input',
			// 	label: 'Vehicle Specification',
			// 	name: 'vehicle_specification',
			// 	type: 'text',
			// 	placeholder: 'Enter the VIN of the vehicle. e.g. JTBJ.......',
			// },
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'select',
				label: 'Make',
				name: 'make',
				placeholder: 'e.g..Ducatti, Kawasaki',
				options: motorbikeMakeOptions,
			},
			otherMake && {
				control: 'input',
				label: 'Other Make',
				name: 'make',
				type: 'text',
				placeholder: 'Enter make',
				required: true,
			},
			selectedMotorbikeCategory === '6301' && {
				control: 'select',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'e.g. Scooter, Touring, Tricycle',
				options: motorbikeTypeOptions,
			},
			selectedMotorbikeCategory === '6301' &&
				otherType && {
					control: 'input',
					label: 'Other Type',
					name: 'type',
					type: 'text',
					placeholder: 'Enter type',
					required: true,
				},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder:
					'Enter as much information as possible. Please state IF any defects.You could include reason for  selling, number of previous owners, if there had been colour changes or defects.',
				required: true,
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Condition',
				name: 'ad_condition',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Nigerian Used', value: 'nigerian use' },
					{ key: 'Foreign Used', value: 'foreign use' },
					{ key: 'Painted', value: 'painted' },
					{ key: 'Unpainted', value: 'unpainted' },
				],
			},
			selectedMotorbikeCategory === '6302' && {
				control: 'select',
				label: 'Year of Manufacture?',
				name: 'year',
				options: yearOptions,
			},
			selectedMotorbikeCategory === '6302' && {
				control: 'input',
				label: 'Mileage?',
				name: 'mileage',
				type: 'text',
				placeholder: '105,000miles',
			},
			{
				control: 'radio',
				type: 'radio',
				label: 'Transmission',
				name: 'transmission',
				options: [
					{ key: 'Automatic', value: 'automatic' },
					{ key: 'Manual', value: 'manual' },
				],
			},
			{
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			{
				control: 'radio',
				type: 'radio',
				label: 'Fuel Type',
				name: 'fuel_type',
				options: [
					{ key: 'Petrol', value: 'petrol' },
					{ key: 'Diesel', value: 'diesel' },
					{ key: 'Gasoline', value: 'gasoline' },
					{ key: 'Hybrid', value: 'hybrid' },
				],
			},
			// {
			// 	control: 'input',
			// 	type: 'number',
			// 	label: 'Engine Size',
			// 	name: 'engine_size',
			// 	placeholder: '1200cc',
			// },
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable',
				name: 'negotiable',
			},

			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		requests: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: categoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Foreign Used', value: 'foreign use' },
					{ key: 'Nigerian Used', value: 'nigerian use' },
					{ key: 'Refurbished', value: 'refurbished' },
					{ key: 'None', value: 'none' },
				],
			},
			{
				control: 'select',
				label: 'Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Type color here',
				options: colorOptions,
			},
			otherColor && {
				control: 'input',
				label: 'Other Colour',
				name: 'color',
				type: 'text',
				placeholder: 'Enter colour',
			},
			{
				control: 'input',
				label: 'Type',
				name: 'type',
				type: 'text',
				placeholder: 'eg: 6” foamboard material suitable for screen printing',
			},

			{
				control: 'input',
				label: 'Price Offering?',
				name: 'min_price',
				type: 'number',
				placeholder: '₦ min',
				required: true,
			},
			{
				control: 'input',
				name: 'max_price',
				type: 'number',
				placeholder: '₦ max',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable?',
				name: 'negotiable	',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
		deals: [
			{
				control: 'select',
				label: 'Category',
				name: 'category',
				type: 'number',
				placeholder: 'Choose from list',
				required: true,
				options: categoriesOptions,
			},
			{
				control: 'select',
				label: 'Location',
				name: 'state_id',
				type: 'number',
				placeholder: 'State',
				required: true,
				options: statesOptions,
			},
			{
				control: 'select',
				label: '',
				name: 'lga_id',
				type: 'number',
				placeholder: 'LGA',
				required: true,
				options: lgaOptions,
			},
			{
				control: 'imageinput',
				label: 'Images',
				name: 'images',
				type: 'file',
				// required: true,
				edit: true,
				images: adImages,
			},
			{
				control: 'input',
				label: 'Title',
				name: 'title',
				type: 'text',
				placeholder: 'Give a catchy title to grab buyer’s attention',
				required: true,
			},
			{
				control: 'textarea',
				label: 'Description',
				name: 'description',
				type: 'textarea',
				maxLength: 350,
				placeholder: 'Enter as much information as possible. Please state IF any defects.',
				required: true,
			},
			{
				control: 'input',
				label: 'Reason for this deal?',
				name: 'reason_for_deal',
				type: 'text',
				placeholder:
					'Please state reason for this deal example;  declutter,  I am relocating and won’t be needing this abroad.',
			},
			{
				control: 'radio',
				label: 'Condition',
				name: 'ad_condition',
				type: 'radio',
				options: [
					{ key: 'New', value: 'new' },
					{ key: 'Foreign Used', value: 'foreign use' },
					{ key: 'Nigerian Used', value: 'nigerian use' },
					{ key: 'Refurbished', value: 'refurbished' },
					{ key: 'Other', value: 'other' },
				],
			},
			otherCondition && {
				control: 'input',
				label: 'Other Condition',
				name: 'ad_condition',
				type: 'text',
				placeholder: 'Enter ad_condition',
				required: true,
			},
			{
				control: 'radio',
				label: 'Defects',
				name: 'defects',
				type: 'radio',
				options: [
					{ key: 'None', value: 'none' },
					{ key: 'Yes', value: 'yes' },
				],
			},
			{
				control: 'input',
				label: 'State if there is/are defects/damages',
				name: 'defects_detail',
				type: 'text',
				placeholder: 'example; broken legs, rusted handles etc.',
			},
			{
				control: 'input',
				label: 'Price',
				name: 'price',
				type: 'number',
				placeholder: '₦0.00',
				required: true,
			},
			{
				control: 'toggle',
				label: 'Negotiable?',
				name: 'negotiable	',
			},
			{
				control: 'checkbox',
				type: 'checkbox',
				label: 'Your Contact Details',
				name: 'contact_type',
				options: [
					{ key: 'Email', value: 'email' },
					{ key: 'Phone', value: 'phone' },
				],
				required: true,
			},
			{
				control: 'urgent',
				label: 'Label as Urgent:',
				name: 'urgent',
			},
		],
	};
	const fields = categoryFields[categoryName] || [];

	const validationSchema = {
		vehicles: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			seller_type: Yup.string(),
			vehicle_specification: Yup.string(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			color: Yup.string(),
			make: Yup.string(),
			model: Yup.string(),
			trim: Yup.string(),
			...(['5005', '5007'].includes(selectedVehicleCategory) && {
				type: Yup.string(),
			}),
			year: Yup.string(),
			millage: Yup.string(),
			transmission: Yup.string(),
			number_of_seat: Yup.string(),
			number_of_door: Yup.string(),
			fuel_type: Yup.string(),
			engine_size: Yup.string(),
			vehicle_features: Yup.array(),
			ad_condition: Yup.string(),
			vehicle_body: Yup.string(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			urgent: Yup.boolean(),
			images: Yup.array(),
		}),
		properties: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			// .of(
			// 	Yup.mixed().test('fileFormat', 'Unsupported Format', (value) => {
			// 		if (!value) {
			// 			return true; // Allow empty values
			// 		}
			// 		Ensure that every selected file is an image
			// 		return value.type.startsWith('image/');
			// 	})
			// ),
			marketed_by: Yup.string(),
			title: Yup.string().required('Required'),
			property_type: Yup.array(),
			ad_condition: Yup.string(),
			// property_use: Yup.string(),
			time_period: Yup.string(),
			furnished: Yup.string(),
			room_bathroom: Yup.string(),
			size: Yup.string(),
			date_available: Yup.string(),
			facilities: Yup.array(),
			description: Yup.string().required('Required'),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		services: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			type: Yup.string(),
			...(selectedServicesCategory === '5206' && {
				expertise: Yup.string(),
			}),
			...(selectedServicesCategory === '5213' && {
				make: Yup.string(),
			}),
			employment_status: Yup.string(),
			level_of_education: Yup.string(),
			employment_type: Yup.string(),
			available_to_travel: Yup.string(),
			years_of_experience: Yup.string(),
			description: Yup.string().required('Required'),
			price: Yup.number().required('Required'),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			negotiable: Yup.boolean(),
			urgent: Yup.boolean(),
		}),
		agriculture: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			type: Yup.string(),
			ad_condition: Yup.string(),
			age: Yup.string(),
			gender: Yup.string(),
			color: Yup.string(),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		electronics: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			price: Yup.number().required('Required'),
			ad_condition: Yup.string(),
			brand: Yup.string(),
			...(['5404', '5405', '5407', '5408'].includes(selectedElectronicsCategory) && {
				type: Yup.string(),
			}),
			...(selectedElectronicsCategory === '5402' && {
				resolution: Yup.string(),
				input_mode: Yup.array(),
			}),
			...(['5402', '5406', '5409'].includes(selectedElectronicsCategory) && {
				display_technology: Yup.array(),
			}),
			...(['5403', '5410'].includes(selectedElectronicsCategory) && {
				connectivity: Yup.string(),
			}),
			...(selectedElectronicsCategory === '5403' && {
				electronics_style: Yup.string(),
				connectivity_interface: Yup.array(),
				features: Yup.array(),
			}),
			...(['5402', '5406', '5409', '5411'].includes(selectedElectronicsCategory) && {
				electronics_display_size: Yup.string(),
			}),
			...(['5409', '5406'].includes(selectedElectronicsCategory) && {
				ram_size: Yup.string(),
				storage: Yup.string(),
			}),
			...(selectedElectronicsCategory === '5406' && {
				sim_type: Yup.string(),
				exchange_possible: Yup.string(),
			}),
			...(selectedElectronicsCategory === '5409' && {
				storage_type: Yup.string(),
				processor: Yup.string(),
				operating_system: Yup.string(),
			}),
			color: Yup.string(),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		fashion: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			style: Yup.string(),
			gender: Yup.string(),
			size: Yup.string(),
			color: Yup.string(),
			ad_condition: Yup.string(),
			type: Yup.string(),
			brand: Yup.string(),
			material: Yup.string(),
			...(selectedFashionCategory === '5506' && {
				display: Yup.string(),
			}),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		health: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			brand: Yup.string(),
			type: Yup.string(),
			age: Yup.string(),
			gender: Yup.string(),
			ad_condition: Yup.string(),
			formulation: Yup.string(),
			scent_type: Yup.string(),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		home: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			price: Yup.number().required('Required'),
			ad_condition: Yup.string(),
			brand: Yup.string(),
			type: Yup.string(),
			material: Yup.string(),
			furniture_for: Yup.string(),
			formulation: Yup.string(),
			color: Yup.string(),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		tradesman: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			company_name: Yup.string(),
			type: Yup.string(),
			...(selectedTradesmanCategory !== '5811' && {
				service_area: Yup.string(),
			}),
			service_features: Yup.array(),
			...(selectedTradesmanCategory === '5811' && {
				form: Yup.array(),
			}),
			years_of_experience: Yup.string(),
			mode_of_charges: Yup.string(),
			mode_of_transport: Yup.string(),
			payment_terms: Yup.string(),
			available_to_travel: Yup.string(),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		software: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			ad_condition: Yup.string(),
			platform: Yup.string(),
			type: Yup.string(),
			format: Yup.string(),
			release_year: Yup.string(),
			game_genre: Yup.string(),
			software_type: Yup.string(),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		pet: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			description: Yup.string().required('Required'),
			title: Yup.string().required('Required'),
			breed: Yup.string(),
			type: Yup.string(),
			price: Yup.number().required('Required'),
			gender: Yup.string(),
			age: Yup.string(),
			color: Yup.string(),
			ad_condition: Yup.string(),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		babies: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			price: Yup.number().required('Required'),
			bulk_price: Yup.number(),
			ad_condition: Yup.string(),
			brand: Yup.string(),
			type: Yup.string(),
			gender: Yup.string(),
			age: Yup.string(),
			color: Yup.string(),
			capacity: Yup.string(),
			size: Yup.string(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		sports: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			price: Yup.number().required('Required'),
			ad_condition: Yup.string(),
			brand: Yup.string(),
			type: Yup.string(),
			gender: Yup.string(),
			color: Yup.string(),
			age: Yup.string(),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		motorbike: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			seller_type: Yup.string(),
			// vehicle_specification: Yup.string(),
			title: Yup.string().required('Required'),
			make: Yup.string(),
			type: Yup.string(),
			description: Yup.string().required('Required'),
			ad_condition: Yup.array(),
			year: Yup.string(),
			mileage: Yup.string(),
			transmission: Yup.string(),
			color: Yup.string(),
			fuel_type: Yup.string(),
			// engine_size: Yup.number(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			urgent: Yup.boolean(),
			images: Yup.array(),
		}),
		requests: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			ad_condition: Yup.string(),
			color: Yup.string(),
			type: Yup.string(),
			min_price: Yup.number().required('Required'),
			max_price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
		deals: Yup.object().shape({
			category: Yup.string().required('Required'),
			state_id: Yup.string().required('Required'),
			lga_id: Yup.string().required('Required'),
			images: Yup.array(),
			title: Yup.string().required('Required'),
			description: Yup.string().required('Required'),
			reason_for_deal: Yup.string(),
			ad_condition: Yup.string(),
			defects: Yup.string(),
			defects_detail: Yup.string(),
			price: Yup.number().required('Required'),
			negotiable: Yup.boolean(),
			contact_type: Yup.array().min(1, 'At least one option is required').required('Required'),
			urgent: Yup.boolean(),
		}),
	};

	const renderFields =
		fields &&
		fields?.map((field, index) => (
			<FormControl
				key={index}
				control={field.control}
				name={field.name}
				type={field.type}
				placeholder={field.placeholder}
				label={field.label}
				options={field.options}
				maxLength={field.maxLength}
				required={field.required}
				images={field.images}
				edit={field.edit}
			/>
		));

	const navigate = useNavigate();
	const notify = useNotify();
	const { mutate } = useUpdateAd(adId);

	const onSubmit = async (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);

		let images = [];
		try {
			if (values?.images?.length > 0) {
				for (let i = 0; i < values?.images.length; i++) {
					const data = await uploadImage(values.images[i]);
					images.push(data);
				}
			} else {
				images = [...adImages];
			}
		} catch (error) {
			notify(error?.response?.data?.message, 'error');
			// notify('Error uploading your images.', 'error');
			setSubmitting(false);
			return;
		}

		// Function to convert string values in an object to lowercase
		const convertObjectValuesToLowerCase = (obj) => {
			const newObj = {};
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					newObj[key] = typeof obj[key] === 'string' ? obj[key].toLowerCase() : obj[key];
				}
			}
			return newObj;
		};

		const formData = {
			// ...values,
			...convertObjectValuesToLowerCase(values),
			category: parseInt(values.category),
			state_id: parseInt(values.state_id),
			lga_id: parseInt(values.lga_id),
			images: images.length > 0 ? images : adImages,
		};

		mutate(formData, {
			onSuccess: (data) => {
				// console.log(data);
				notify(data.message, 'success');
				navigate(Approutes.profile.adverts);
			},
			onError: async (error) => {
				try {
					const filteredImages = images.map((image) => {
						return image.filename.slice(0, image.filename.lastIndexOf('.'));
					});

					for (let i = 0; i < filteredImages.length; i++) {
						await deleteImages(filteredImages[i]);
					}
				} catch (error) {
					notify(error?.response?.data?.message, 'error');
				}

				notify(error?.response.data.message, 'error', {
					toastId: 'create-ad-error',
				});
			},
		});

		// console.log('Updated form data', formData);
		// console.log('Saved data', JSON.parse(JSON.stringify(values)));
		setSubmitting(false);
	};

	return (
		<Formik
			// enableReinitialize={true}
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema[categoryName]}
		>
			{(formik) => {
				// console.log(formik.handleReset);
				useEffect(() => {
					setStateId(() => formik.values.state_id);
				}, [formik.values.state_id]);
				useEffect(() => {
					setSelectedCarMake(() => formik.values.make);
				}, [formik.values.make]);
				if (categoryId === '50') {
					useEffect(() => {
						setSelectedVehicleCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '51') {
					useEffect(() => {
						setSelectedPropertyCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '52') {
					useEffect(() => {
						setSelectedServicesCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '53') {
					useEffect(() => {
						setSelectedAgricultureCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '54') {
					useEffect(() => {
						setSelectedElectronicsCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '56') {
					useEffect(() => {
						setSelectedHealthCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '55') {
					useEffect(() => {
						setSelectedFashionCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '57') {
					useEffect(() => {
						setSelectedHomeCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '58') {
					useEffect(() => {
						setSelectedTradesmanCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '59') {
					useEffect(() => {
						setSelectedSoftwareCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '60') {
					useEffect(() => {
						setSelectedPetCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '61') {
					useEffect(() => {
						setSelectedBabiesCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '62') {
					useEffect(() => {
						setSelectedSportsCategory(() => formik.values.category);
					}, [formik.values.category]);
				} else if (categoryId === '63') {
					useEffect(() => {
						setSelectedMotorbikeCategory(() => formik.values.category);
					}, [formik.values.category]);
				}

				// check if other option is selected
				useEffect(() => {
					if (formik.values.make === 'other') {
						setOtherMake(true);
					}
				}, [formik.values.make]);
				useEffect(() => {
					if (formik.values.brand === 'other') {
						setOtherBrand(true);
					}
				}, [formik.values.brand]);
				useEffect(() => {
					if (formik.values.type === 'other') {
						setOtherType(true);
					}
				}, [formik.values.type]);
				useEffect(() => {
					if (formik.values.material === 'other') {
						setOtherMaterial(true);
					}
				}, [formik.values.material]);
				useEffect(() => {
					if (formik.values.size === 'other') {
						setOtherSize(true);
					}
				}, [formik.values.size]);
				useEffect(() => {
					if (formik.values.formulation === 'other') {
						setOtherFormulation(true);
					}
				}, [formik.values.formulation]);
				useEffect(() => {
					if (formik.values.breed === 'other') {
						setOtherBreed(true);
					}
				}, [formik.values.breed]);
				useEffect(() => {
					if (formik.values.platform === 'other') {
						setOtherPlatform(true);
					}
				}, [formik.values.platform]);
				useEffect(() => {
					if (formik.values.format === 'other') {
						setOtherFormat(true);
					}
				}, [formik.values.format]);
				useEffect(() => {
					if (formik.values.game_genre === 'other') {
						setOtherGenre(true);
					}
				}, [formik.values.game_genre]);
				useEffect(() => {
					if (formik.values.color === 'other') {
						setOtherColor(true);
					}
				}, [formik.values.color]);
				useEffect(() => {
					if (formik.values.expertise === 'other') {
						setOtherExpertise(true);
					}
				}, [formik.values.expertise]);
				useEffect(() => {
					if (formik.values.room_bathroom === 'other') {
						setOtherRoom(true);
					}
				}, [formik.values.room_bathroom]);
				useEffect(() => {
					if (formik.values.property_use === 'other') {
						setOtherUse(true);
					}
				}, [formik.values.property_use]);
				useEffect(() => {
					if (formik.values.ad_condition === 'other') {
						setOtherCondition(true);
					}
				}, [formik.values.ad_condition]);
				useEffect(() => {
					if (formik.values.processor === 'other') {
						setOtherProcessor(true);
					}
				}, [formik.values.processor]);
				useEffect(() => {
					if (formik.values.scent_type === 'other') {
						setOtherScent(true);
					}
				}, [formik.values.scent_type]);
				useEffect(() => {
					if (formik.values.furniture_for === 'other') {
						setOtherFurnitureFor(true);
					}
				}, [formik.values.furniture_for]);
				return (
					<Form>
						{renderFields ? renderFields : <div className="text-center">No fields to display</div>}

						<Button
							type="submit"
							loading={formik.isSubmitting}
							variant="primary"
							size="full"
							className={'mt-10 text-lg font-bold rounded-md'}
						>
							Update My Ad
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
};

export default CategoryForm;
