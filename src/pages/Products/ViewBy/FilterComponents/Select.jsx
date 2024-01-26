import { Field } from "formik";

const Select = () => {
  return (
    <Field as="select" name="color">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </Field>
  );
};

export default Select;
