import { Field, ErrorMessage, useField, useFormikContext } from 'formik';
import TextError from './TextError';

const PriceInput = (props) => {
    const { label, name, required, className, ...rest } = props;
    const [field] = useField(name);
    const formik = useFormikContext();

    const handleMoneyChange = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name || name;

        const raw = String(inputValue).replace(/[^0-9.]/g, '');

        if (!raw) {
            formik.setFieldValue(inputName, '');
            return;
        }

        const [intPart, decimalPart] = raw.split('.');
        let formatted = new Intl.NumberFormat('en-US').format(Number(intPart || '0'));

        if (decimalPart !== undefined) {
            formatted += '.' + decimalPart;
        }

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
