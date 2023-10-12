import TextError from '../../components/FormComponents/TextError';

const InputGroup = ({ type, name, placeholder, className, errorMsg, ...rest }) => {
	return (
		<div className="my-2">
			{type === 'textarea' ? (
				<>
					<textarea
						name={name}
						id={name}
						cols="30"
						rows="5"
						placeholder={placeholder}
						className={`${className ? className : ''}`}
						onBlur={(e) => {
							if (typeof onChange === 'function') onBlur(e);
						}}
						onChange={(e) => {
							if (typeof onChange === 'function') onChange(e);
						}}
						{...rest}
					/>
					{errorMsg && <TextError>{errorMsg}</TextError>}
				</>
			) : type === 'file' ? (
				<label htmlFor={name}>
					<input type="file" name={name} id={name} />
				</label>
			) : (
				<>
					<input
						type={type ? type : 'text'}
						name={name}
						id={name}
						placeholder={placeholder}
						className={` ${className ? className : ''}`}
						onBlur={(e) => {
							if (typeof onChange === 'function') onBlur(e);
						}}
						onChange={(e) => {
							if (typeof onChange === 'function') onChange(e);
						}}
						{...rest}
					/>
					{errorMsg && <TextError>{errorMsg}</TextError>}
				</>
			)}
		</div>
	);
};

export default InputGroup;

const inputStyle = 'bg-gray-100';
