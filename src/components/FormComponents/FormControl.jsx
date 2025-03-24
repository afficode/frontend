import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import RadioButtons from './RadioButtons';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';
import ImageInput from './ImageInput';
import Toggle from './Toggle';
import UrgentField from './UrgentField';
import PriceInput from './PriceInput';
import AdFeatures from './AdFeatures';

const FormControl = (props) => {
	const { control, price, subCat, address, setAddress, ...rest } = props;

	switch (control) {
		case 'input':
			return <Input {...rest} />;
		case 'price':
			return <PriceInput {...rest} />;

		case 'textarea':
			return <TextArea {...rest} />;

		case 'select':
			return <Select {...rest} />;

		case 'radio':
			return <RadioButtons {...rest} />;

		case 'checkbox':
			return <CheckboxGroup {...rest} />;

		case 'datepicker':
			return <DatePicker {...rest} />;

		case 'imageinput':
			return <ImageInput {...rest} />;

		case 'toggle':
			return <Toggle {...rest} />;

		case 'urgent':
			return <UrgentField {...rest} />;
		case 'feature':
			return (
				<AdFeatures price={price} subCat={subCat} address={address} setAddress={setAddress} {...rest} />
			);

		default:
			return null;
	}
};

export default FormControl;
