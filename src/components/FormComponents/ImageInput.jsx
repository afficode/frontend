import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';
import { Camera } from '../../assets/svgs';
import { MdClose } from 'react-icons/md';
import { useNotify } from '../../hooks';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageInput = (props) => {
	const { label, name, required, edit = false, images, ...rest } = props;

	const [editMode, setEditMode] = useState(edit);
	const [isLoading, setIsLoading] = useState(false);

	const notify = useNotify();

	const handleEdit = () => {
		setEditMode(false);
	};
	return (
		<div className="my-4 space-y-2 ">
			{label && (
				<div>
					<div className="flex justify-between ">
						<label className="formLabel" htmlFor={name}>
							{label} {required && <span>*</span>}
						</label>
						{editMode && (
							<button onClick={handleEdit} type="button" className="font-semibold text-primary">
								Edit
							</button>
						)}
					</div>

					{editMode && (
						<div className="text-sm text-secondary">
							Clicking on edit means you have to reselect your desired images
						</div>
					)}
				</div>
			)}
			<Field name={name}>
				{({ form, field }) => {
					const handleRemoveImage = (indexToRemove) => {
						const updatedFiles = field.value.filter((_, index) => index !== indexToRemove);
						form.setFieldValue('images', updatedFiles);
					};

					return (
						<div className="flex flex-wrap items-center gap-4">
							{editMode === false ? (
								<div className="relative rounded-md w-36 h-28 sm:w-44 sm:h-32 ">
									<input
										{...rest}
										className="sr-only "
										type="file"
										id="fileInput"
										multiple
										onChange={(e) => {
											setIsLoading(true);
											const filesArray = Array.from(e.target.files);

											const newImgFiles = [...field.value];

											filesArray.forEach((file) => {
												if (!file.type.startsWith('image/')) {
													notify('Please select a valid image file.', 'error');
													setIsLoading(false);
													return;
												}
												if (file.size > 5 * 1024 * 1024) {
													notify('Image is too big!.', 'error');
													setIsLoading(false);
													return;
												}

												// Check if the file is already in the array based on the entire file object
												const isFileAlreadyAdded = newImgFiles.some(
													(existingFile) => existingFile.name === file.name && existingFile.size === file.size
												);

												if (isFileAlreadyAdded) {
													// alert('File already added!!');
													notify('This image is already added.', 'error');
												} else {
													newImgFiles.push(file);
												}
											});

											if (newImgFiles.length > 10) {
												notify('You can only upload up to 10 images.', 'error');
												setIsLoading(false);
												return;
											}

											form.setFieldValue('images', newImgFiles);
											setIsLoading(false);
										}}
									/>

									<label htmlFor="fileInput" className={`cursor-pointer transition-all duration-300`}>
										<div className="flex items-center justify-center w-full h-full bg-gray-200 border rounded-md border-primary text-primary">
											<img src={Camera} alt="camera" className="max-sm:w-8" /> <h5 className="">Add image</h5>
										</div>
									</label>
								</div>
							) : (
								images?.map((img, index) => {
									return (
										<div
											key={index}
											className="border rounded-md group w-36 h-28 sm:w-44 sm:h-32 border-primary"
										>
											<img
												src={img.path}
												className="max-w-full max-h-full mx-auto my-auto object-fit"
												alt={img.filename}
											/>
										</div>
									);
								})
							)}

							{editMode === false && isLoading === false && field.value?.length === 0 && (
								<div className="max-sm:w-44 max-md:w-60 max-lg:w-80">
									<h4 className="max-md:text-base">You can add up to 10 images</h4>
									<p>Upload 10 maximum clear images to get your ad more views and replies.</p>
								</div>
							)}

							{field?.value.map((imgFile, index) => {
								return (
									<div
										key={index}
										className="relative border rounded-md group w-36 h-28 sm:w-44 sm:h-32 border-primary"
									>
										<img
											src={URL.createObjectURL(imgFile)}
											className="max-w-full max-h-full mx-auto my-auto object-fit"
											alt={imgFile?.name}
										/>
										<button
											type="button"
											onClick={() => handleRemoveImage(index)}
											className="absolute flex items-center justify-center w-6 h-6 transition-all bg-gray-100 rounded-full opacity-0 cursor-pointer right-1 top-1 group-hover:opacity-100"
										>
											<MdClose size={15} />
										</button>
									</div>
								);
							})}

							{isLoading && (
								<div className="w-36 h-28 sm:w-44 sm:h-32 border-primary">
									<Skeleton height="100%" width="100%" />
								</div>
							)}
						</div>
					);
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</div>
	);
};

export default ImageInput;
