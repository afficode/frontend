import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import { useState } from 'react';

const Input = (props) => {
	const { label, name, required, type, className, ...rest } = props;

	const [isVisible, setIsVisible] = useState(false);

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
			{type === 'password' ? (
				<div className={`relative `}>
					<Field
						name={name}
						id={name}
						type={isVisible ? 'text' : 'password'}
						className={className}
						{...rest}
					/>
					<span
						onClick={() => setIsVisible(!isVisible)}
						className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer w-16 text-center border-l border-black/30 text-sm"
					>
						{isVisible ? 'Hide' : 'Show'}
					</span>
				</div>
			) : (
				<Field name={name} id={name} type={type} className={className} {...rest} />
			)}
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default Input;
