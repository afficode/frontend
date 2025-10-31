import { Field, ErrorMessage, useField, useFormikContext } from 'formik';
import TextError from './TextError';

const PriceInput = (props) => {
	const { label, name, required, type, className, ...rest } = props;
	const [field] = useField(name);
	const formik = useFormikContext();

	const handleMoneyChange = (event) => {
		const inputValue = event.target.value;
		const inputName = event.target.name || name;

		// Remove all non-numeric characters except decimal point
		let raw = String(inputValue).replace(/[^0-9.]/g, '');

		// If empty, set empty string
		if (!raw) {
			formik.setFieldValue(inputName, '');
			return;
		}

		// Handle decimal part
		const [intPart, decimalPart] = raw.split('.');
		let formatted = new Intl.NumberFormat('en-US').format(Number(intPart || '0'));

		// If there's a decimal part, append it
		if (decimalPart !== undefined) {
			formatted += '.' + decimalPart;
		}

		// Update the form field with formatted value
		formik.setFieldValue(inputName, formatted);
	};

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
			<Field
				name={name}
				id={name}
				type="text"
				min="0"
				value={field.value || ''}
				onChange={handleMoneyChange}
				onKeyDown={(e) => {
					if (e.code === 'Minus') {
						e.preventDefault();
					}
				}}
				className={className}
				{...rest}
				autoComplete="off"
			/>
			<ErrorMessage name={name} component={TextError} />

			{/* {(touched || priceFocus) && (
				<div
					className="bg-[#E7E7E7] border border-secondary p-2"
					onMouseEnter={() => setPriceFocus(true)}
					onMouseLeave={() => setPriceFocus(false)}
				>
					<div className="flex justify-between pb-2 max-md:flex-col-reverse">
						<span className="py-2 md:py-4 font-xs">
							<b>Note:</b> Price inputed will determine the amount of token deducted as stated below;
						</span>

						<button className="flex items-center max-md:ml-auto" onClick={() => setIsOpen(true)}>
							<img src={Coin} alt="/" className="w-[1.8rem] mx-2" />
							<b>{token && token}</b>
						</button>
					</div>
					<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
						<TokenPurchase />
					</Modal>

					<div className="max-w-[400px]">
						<table className="table ">
							<thead className="text-sm font-medium text-black bg-secondary/90">
								<tr>
									<th>Token(s)</th>
									<th>Prices (₦)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>0.5</td>
									<td>1,000 to 10,000</td>
								</tr>
								<tr>
									<td>1</td>
									<td>10,000 to 100,000</td>
								</tr>
								<tr>
									<td>1.5</td>
									<td>100,000 to 500,000</td>
								</tr>
								<tr>
									<td>2</td>
									<td>500,000 to 1 million</td>
								</tr>
								<tr>
									<td>2.5</td>
									<td>1 million to 5 million</td>
								</tr>
								<tr>
									<td>3</td>
									<td>5 million to 10 million</td>
								</tr>
								<tr>
									<td>4</td>
									<td>10 million to 15 million</td>
								</tr>
								<tr>
									<td>5</td>
									<td>15 million to 20 million</td>
								</tr>
								<tr>
									<td>6</td>
									<td>20 million to 30 million</td>
								</tr>
								<tr>
									<td>7</td>
									<td>30 million to 50 million</td>
								</tr>
								<tr>
									<td>10</td>
									<td>50 million to 100 million</td>
								</tr>
								<tr>
									<td>15</td>
									<td>100 million to 200 million</td>
								</tr>
								<tr>
									<td>20</td>
									<td>200 million +</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			)} */}
		</div>
	);
};

export default PriceInput;
