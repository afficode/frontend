import { forwardRef } from 'react';

const DatePickerInput = forwardRef(({ value, onClick, name, placeholder }, ref) => {
	return (
		<input
			ref={ref}
			readOnly
			name={name}
			id={name}
			onClick={onClick}
			value={value}
			placeholder={placeholder}
			className="customSelectInput input"
		/>
	);
});

export default DatePickerInput;
