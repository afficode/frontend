import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name} id={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
