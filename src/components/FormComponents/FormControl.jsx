import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import RadioButtons from './RadioButtons';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';
import ImageInput from './ImageInput';

const FormControl = (props) => {
	const { control, ...rest } = props;

	switch (control) {
		case 'input':
			return <Input {...rest} />;

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

		default:
			return null;
	}
};

export default FormControl;
