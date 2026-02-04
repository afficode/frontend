import { Field } from 'formik';

const Checkbox = ({ type, content: { name, value, label }, ...rest }) => {
    return (
        <label>
            <Field type={type} name={name} value={value} {...rest} />
            <span className=" ml-4 text-sm">{label}</span>
        </label>
    );
};

export default Checkbox;
