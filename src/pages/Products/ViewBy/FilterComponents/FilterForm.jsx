import { Form, Formik } from 'formik';
import FilterCard from './FilterCard';
import { formToDisplay } from '../../../../constants/CategoryFilterFormData';

import { manipulateFilterForm } from '../../../../utils/dataManipulations';
import { useNotify } from '../../../../hooks';

const FilterForm = ({ setSearchParams, categoryId }) => {
	const notify = useNotify();
	return (
		<div className="my-2">
			<Formik
				initialValues={{}}
				onSubmit={async (values) => {
					const filteredValues = manipulateFilterForm(values, categoryId);
					if (filteredValues && Object.entries(filteredValues).length > 0) {
						setSearchParams((prev) => ({
							page: prev.page || 0,
							category: categoryId,
							...filteredValues,
						}));
					} else {
						notify('No filter option selected', 'info');
					}
				}}
			>
				{({ setFieldValue }) => (
					<Form>
						<div className="">
							<button
								type="submit"
								className="btn btn-square rounded-none text-black px-2 bg-white hover:bg-primary hover:border-0 hover:text-white w-full tracking-tighter line-clamp-1 "
							>
								Submit
							</button>
						</div>
						{formToDisplay(categoryId)?.map((field, index) => (
							<div key={index} className="">
								<FilterCard field={field} setfieldvalue={setFieldValue} />
							</div>
						))}
						<div>
							<button
								type="submit"
								className="btn btn-square rounded-none text-black px-2 bg-white hover:bg-primary hover:border-0 hover:text-white w-full tracking-tighter line-clamp-1 "
							>
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FilterForm;
