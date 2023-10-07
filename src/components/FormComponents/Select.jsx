import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

const Select = (props) => {
	const { label, name, options, required, ...rest } = props;
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
			<Field as="select" name={name} id={name} {...rest}>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.key}
						</option>
					);
				})}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default Select;
