import { Form, Formik } from 'formik';
import FilterCard from './FilterCard';
import { formToDisplay } from '../../../../constants/CategoryFilterFormData';
import { manipulateFilterForm } from '../../../../utils/dataManipulations';
import { useNotify } from '../../../../hooks';
import { getPreviousSearchParams, getSearchParamsObject } from '../../../../utils';
import { useSearchParams } from 'react-router-dom';
import { queryStrings } from '../../../../constants';
import { useMemo } from 'react';

const FilterForm = ({ categoryId }) => {
	const notify = useNotify();
	const [searchParams, setSearchParams] = useSearchParams();

	const initialValues = useMemo(() => {
		const params = getSearchParamsObject(searchParams);
		const { [queryStrings.page]: page, [queryStrings.subCategory]: sub, ...filterParams } = params;
		return filterParams;
	}, [searchParams, categoryId]);

	const filterFieldNames = useMemo(() => {
		const fields = formToDisplay(categoryId);
		if (!fields) return [];
		return fields.map((field) => field.name);
	}, [categoryId]);

	const handleClearFilters = (resetForm) => {
		resetForm();

		const previousParams = getPreviousSearchParams(searchParams);
		const preservedParams = {};

		if (previousParams[queryStrings.page]) {
			preservedParams[queryStrings.page] = previousParams[queryStrings.page];
		}
		if (previousParams[queryStrings.subCategory]) {
			preservedParams[queryStrings.subCategory] = previousParams[queryStrings.subCategory];
		}

		setSearchParams(preservedParams, { replace: true });
		notify('Filters cleared', 'success');
	};

	return (
		<div className="my-2">
			<Formik
				initialValues={initialValues}
				enableReinitialize={true}
				onSubmit={async (values) => {
					const filteredValues = manipulateFilterForm(values, categoryId);

					if (filteredValues && Object.entries(filteredValues).length > 0) {
						let previousParams = getPreviousSearchParams(searchParams);

						filterFieldNames.forEach((fieldName) => {
							if (!(fieldName in filteredValues) && fieldName in previousParams) {
								delete previousParams[fieldName];
							}
						});

						// Delete min_price/max_price if they're not in filteredValues
						if (!('min_price' in filteredValues)) {
							delete previousParams.min_price;
						}
						if (!('max_price' in filteredValues)) {
							delete previousParams.max_price;
						}

						if (!('price' in filteredValues)) {
							delete previousParams.price;
						}

						previousParams = {
							...previousParams,
							...filteredValues,
						};

						if (previousParams[queryStrings.page]) {
							previousParams[queryStrings.page] = '1';
						}

						setSearchParams(previousParams, { replace: true });
						notify('Filters applied', 'success');
					} else {
						// When all filters are cleared, update params to remove filters
						let previousParams = getPreviousSearchParams(searchParams);

						// Delete all filter fields
						filterFieldNames.forEach((fieldName) => {
							if (fieldName in previousParams) {
								delete previousParams[fieldName];
							}
						});

						// Always delete price-related fields when no filters
						delete previousParams.price;
						delete previousParams.min_price;
						delete previousParams.max_price;

						setSearchParams(previousParams, { replace: true });
						notify('Filters cleared', 'success');
					}
				}}
			>
				{({ setFieldValue, resetForm }) => {
					const fields = formToDisplay(categoryId);

					return (
						<Form>
							<div className="flex gap-2">
								<button
									type="submit"
									className="btn btn-square rounded-none text-black !text-sm !sm:text-base px-2 bg-white hover:bg-primary hover:border-0 hover:text-white flex-1 tracking-tighter line-clamp-1"
								>
									Apply
								</button>
								<button
									type="button"
									onClick={() => handleClearFilters(resetForm)}
									className="btn btn-square rounded-none text-black !text-sm !sm:text-base px-2 bg-white hover:bg-red-500 hover:border-0 hover:text-white flex-1 tracking-tighter line-clamp-1"
								>
									Clear
								</button>
							</div>

							{fields?.map((field, index) => (
								<div key={index} className="">
									<FilterCard field={field} setfieldvalue={setFieldValue} />
								</div>
							))}
							<div className="flex gap-2">
								<button
									type="submit"
									className="btn btn-square rounded-none text-black !text-sm !sm:text-base px-2 bg-white hover:bg-primary hover:border-0 hover:text-white flex-1 tracking-tighter line-clamp-1"
								>
									Apply
								</button>
								<button
									type="button"
									onClick={() => handleClearFilters(resetForm)}
									className="btn btn-square rounded-none text-black !text-sm !sm:text-base px-2 bg-white hover:bg-red-500 hover:border-0 hover:text-white flex-1 tracking-tighter line-clamp-1"
								>
									Clear
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default FilterForm;
