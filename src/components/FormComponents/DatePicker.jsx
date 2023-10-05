import DateView from 'react-datepicker';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = (props) => {
	const { label, name, required, ...rest } = props;
	return (
		<div className="my-4 space-y-2">
			<label className="block formLabel" htmlFor={name}>
				{label}
				{required ? (
					<span className="text-black" title="This field is required">
						*
					</span>
				) : null}
			</label>
			<Field name={name}>
				{({ form, field }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return (
						<DateView
							id={name}
							{...field}
							{...rest}
							selected={value}
							onChange={(val) => setFieldValue(name, val)}
						/>
					);
				}}
			</Field>
			<ErrorMessage component={TextError} name={name} />
		</div>
	);
};

export default DatePicker;