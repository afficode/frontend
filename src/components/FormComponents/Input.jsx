import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

const Input = (props) => {
	const { label, name, required, className, ...rest } = props;
	return (
		<div className={className ? '' : 'formControlClass'}>
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
			<Field name={name} id={name} className={className} {...rest} />
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default Input;
