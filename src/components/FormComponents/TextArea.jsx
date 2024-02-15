import { ErrorMessage, Field, useField, useFormikContext } from 'formik';
import TextError from './TextError';

const TextArea = (props) => {
	const { label, name, required, maxLength, ...rest } = props;
	const [field] = useField(name);
	const formik = useFormikContext();

	const handleChange = (event) => {
		const inputValue = event.target.value;

		// Enforce the text limit
		if (maxLength && inputValue.length <= maxLength) {
			formik.setFieldValue(name, inputValue);
		}
	};
	return (
		<div className="formControlClass">
			{label && (
				<label className="formLabel" htmlFor={name}>
					{label}{' '}
					{required ? (
						<span className="text-black" title="This field is required">
							*
						</span>
					) : null}
				</label>
			)}
			<Field
				as="textarea"
				name={name}
				id={name}
				cols={30}
				rows={5}
				onChange={handleChange}
				value={field.value}
				{...rest}
			/>
			{maxLength && (
				<p className="text-sm text-gray-500">
					{field.value.length}/{maxLength} characters
				</p>
			)}
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default TextArea;
