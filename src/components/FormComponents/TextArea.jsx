import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

const TextArea = (props) => {
	const { label, name, required, ...rest } = props;
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
			<Field as="textarea" name={name} id={name} cols={30} rows={10} className="p-2" {...rest} />
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default TextArea;
