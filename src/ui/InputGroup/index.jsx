import TextError from '../../components/FormComponents/TextError';
import { InputInfo, Naira } from '../../assets/svgs';

const InputGroup = ({
	children,
	type,
	name,
	placeholder,
	className,
	label,
	cols,
	rows,
	optionLists,
	errorMsg,
	amount,
	cancelButton,
	moreInfo,
	readOnly,
	...rest
}) => {
	return (
		<div className="my-2">
			{label ? (
				<label className="input-group-label" htmlFor={name}>
					{label}
					{moreInfo ? (
						<span className="info-con">
							<button type="button" className="info" tabIndex={0}>
								<img src={InputInfo} />
							</button>
							<span className="outer">
								<span>{moreInfo}</span>
							</span>
						</span>
					) : null}
				</label>
			) : null}

			{type === 'textarea' ? (
				<>
					<textarea
						name={name}
						id={name}
						cols={cols ? cols : '30'}
						rows={rows ? rows : '10'}
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
					<div className={amount || cancelButton ? 'relative' : ''}>
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
							readOnly={readOnly}
							{...rest}
						/>
						{amount && amount === 'naira' ? (
							<span className="absolute left-2 inset-y-0 my-auto h-fit font-bold">
								<img src={Naira} alt="naira" className="w-4" />
							</span>
						) : amount === 'NGN' ? (
							<span className="absolute left-2 inset-y-0 my-auto h-fit font-bold">{amount}</span>
						) : null}
						{cancelButton && cancelButton}
					</div>
					{errorMsg && <TextError>{errorMsg}</TextError>}
				</>
			)}
		</div>
	);
};

export default InputGroup;

// const inputStyle = 'bg-gray-100';
