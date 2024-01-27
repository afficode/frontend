import React, { lazy, useEffect } from "react";
import { Form, Formik } from "formik";
import FilterCard from "./FilterCard";
import {
  filterFields,
  formToDisplay,
} from "../../../../constants/CategoryFilterFormData";

import { manipulateFilterForm } from "../../../../utils/dataManipulations";
import { toast } from "react-toastify";

const FilterForm = ({ setSearchParams, categoryId }) => {
  return (
    <div className="my-2 ">
      <Formik
        initialValues={{}}
        onSubmit={async (values) => {
          console.log(values);
          const filteredValues = manipulateFilterForm(values, categoryId);
          if (filteredValues && Object.entries(filteredValues).length > 0) {
            alert(JSON.stringify(filteredValues));
            setSearchParams((prev) => ({
              page: prev.page || 0,
              category: categoryId,
              ...filteredValues,
            }));
          } else {
            toast.info("No filter option selected");
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
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
