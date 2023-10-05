import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';
import React from 'react';

const RadioButtons = (props) => {
	const { label, name, options, required, ...rest } = props;
	return (
		<div className="my-4 space-y-2">
			{label && (
				<label className="block formLabel" htmlFor={name}>
					{label}{' '}
					{required ? (
						<span className="text-black" title="This field is required">
							*
						</span>
					) : null}
				</label>
			)}
			<Field name={name}>
				{({ field }) => {
					return options.map((option) => {
						return (
							<div className="inline-block items-center pr-8 space-x-2" key={option.key}>
								<input
									type="radio"
									id={option.value}
									{...field}
									{...rest}
									value={option.value}
									checked={field.value === option.value}
								/>
								<label htmlFor={option.value}>{option.key}</label>
							</div>
						);
					});
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default RadioButtons;