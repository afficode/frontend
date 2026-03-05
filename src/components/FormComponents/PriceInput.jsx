import { Field, ErrorMessage, useField, useFormikContext } from 'formik';
import TextError from './TextError';
import { formatMoneyInput } from '../../utils';

const PriceInput = (props) => {
    const { label, name, required, className, ...rest } = props;
    const [field] = useField(name);
    const formik = useFormikContext();

    const handleMoneyChange = (event) => {
        const inputName = event.target.name || name;
        const formatted = formatMoneyInput(event.target.value);
        formik.setFieldValue(inputName, formatted);
    };

    return (
        <div className={className ? '' : 'formControlClass'}>
            {label && (
                <label className='formLabel' htmlFor={name}>
                    {label}{' '}
                    {required ? (
                        <span className='text-black' title='This field is required'>
                            *
                        </span>
                    ) : null}
                </label>
            )}
            <Field
                name={name}
                id={name}
                type='text'
                min='0'
                value={field.value || ''}
                onChange={handleMoneyChange}
                onKeyDown={(e) => {
                    if (e.code === 'Minus') {
                        e.preventDefault();
                    }
                }}
                className={className}
                {...rest}
                autoComplete='off'
            />
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

export default PriceInput;
