import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import { ToggleSwitch } from 'flowbite-react';

const Toggle = (props) => {
	const { label, name, required, type, className, ...rest } = props;

	return (
		<div className={'my-2'}>
			{label && (
				<label className="formLabel" htmlFor={name}>
					{label}
					{required ? (
						<span className="text-black" title="This field is required">
							*
						</span>
					) : null}
				</label>
			)}
			<Field name={name}>
				{({ field, form }) => {
					return (
						<ToggleSwitch
							name={name}
							checked={field.value}
							onChange={(e) => form.setFieldValue(name, e)}
							className={field.value ? 'custom-toggle my-2' : 'my-2'}
						/>
					);
				}}
			</Field>

			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default Toggle;
