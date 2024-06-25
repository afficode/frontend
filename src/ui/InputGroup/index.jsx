import TextError from '../../components/FormComponents/TextError';

const InputGroup = ({
	children,
	type,
	name,
	placeholder,
	className,
	optionLists,
	errorMsg,
	...rest
}) => {
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
				<>
					<label htmlFor={name} className="cursor-pointer">
						{children}
						<input
							type="file"
							name={name}
							id={name}
							className={`hidden ${className ? className : ''}`}
							onBlur={(e) => {
								if (typeof onChange === 'function') onBlur(e);
							}}
							onChange={(e) => {
								if (typeof onChange === 'function') onChange(e);
							}}
							{...rest}
						/>
					</label>
					{errorMsg && <TextError>{errorMsg}</TextError>}
				</>
			) : type === 'select' ? (
				<>
					<label htmlFor={name} className="cursor-pointer">
						{children}
						<select
							type="select"
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
						>
							{optionLists?.map((option, i) => {
								return (
									<option key={i} value={option.value}>
										{option.key}
									</option>
								);
							})}
						</select>
					</label>
					{errorMsg && <TextError>{errorMsg}</TextError>}
				</>
			) : type === 'date' ? (
				<>
					<label htmlFor={name} className="cursor-pointer">
						{children}
						<input
							type="date"
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
					</label>
					{errorMsg && <TextError>{errorMsg}</TextError>}
				</>
			) : type === 'radio' ? (
				<>
					<label htmlFor={name}>
						{children}
						{optionLists.map((option) => {
							return (
								<div key={option.value} className="inline-block items-center pr-8 space-x-2">
									<input
										type="radio"
										name={option.value}
										id={option.value}
										className={` ${className ? className : ''}`}
										onBlur={(e) => {
											if (typeof onChange === 'function') onBlur(e);
										}}
										onChange={(e) => {
											if (typeof onChange === 'function') onChange(e);
										}}
										{...rest}
									/>
									<label htmlFor={option.value}>{option.key}</label>
								</div>
							);
						})}
					</label>
					{errorMsg && <TextError>{errorMsg}</TextError>}
				</>
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

// const inputStyle = 'bg-gray-100';
