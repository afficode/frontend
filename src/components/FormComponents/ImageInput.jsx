import { Field } from 'formik';
import TextError from './TextError';
import { Camera } from '../../assets/svgs';
import { useState } from 'react';

const ImageInput = (props) => {
	const { label, name, required, ...rest } = props;

	const [errMsg, setErrMsg] = useState(null);
	return (
		<div className="my-4 space-y-2 ">
			{label && (
				<label className="formLabel" htmlFor={name}>
					{label}{' '}
				</label>
			)}
			<Field name={name}>
				{({ form, field }) => {
					console.log(field.value);
					return (
						<div className="flex gap-4 items-center flex-wrap">
							<div className="relative rounded-md w-52 h-40">
								<input
									{...rest}
									type="file"
									id="fileInput"
									onChange={(e) => {
										const newImgFile = [...field.value];

										const file = e.target.files[0];
										if (file && file.type.startsWith('image/')) {
											newImgFile.push(file);

											if (newImgFile.length > 10) {
												alert('You can only upload up to 10 images.');
												return;
											}
										} else {
											alert('Please select a valid image file.');
										}

										form.setFieldValue('images', newImgFile);
									}}
									className=" sr-only"
								/>

								<label htmlFor="fileInput" className={`cursor-pointer transition-all duration-300`}>
									<div className=" w-full h-full bg-gray-200 border border-primary text-primary rounded-md flex items-center justify-center">
										<img src={Camera} alt="camera" /> <h5>Add image</h5>
									</div>
								</label>
							</div>

							{field?.value.map((imgFile, index) => {
								if (imgFile.size < 1024 * 1024) {
									setErrMsg(null);
									return (
										<div key={index} className="w-52 h-40 border border-primary rounded-md">
											<img
												src={URL.createObjectURL(imgFile)}
												className="max-w-full max-h-full mx-auto object-fit"
												alt={imgFile.name}
											/>
										</div>
									);
								} else {
									setErrMsg('File too big!');
								}
							})}
						</div>
					);
				}}
			</Field>
			{/* <ErrorMessage name={name} component={TextError} /> */}
			{errMsg && <TextError>{errMsg}</TextError>}
		</div>
	);
};

export default ImageInput;
