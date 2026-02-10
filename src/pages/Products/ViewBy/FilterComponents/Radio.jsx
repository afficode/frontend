import { Field } from 'formik';

const Radio = ({ content: { name, value, label }, ...rest }) => {
    return (
        <label>
            <Field type="radio" name={name} value={value} {...rest} />
            <span className=" ml-4">{label}</span>
        </label>
    );
};

export default Radio;
