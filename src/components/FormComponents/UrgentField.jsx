import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import { ToggleSwitch } from 'flowbite-react';

const UrgentField = (props) => {
    const { label, name, required, type, className, ...rest } = props;

    return (
        <div className={'my-2'}>
            {label && (
                <label className="formLabel" htmlFor={name}>
                    {label}{' '}
                    {required ? (
                        <span className="text-black" title="This field is required">
							*
                        </span>
                    ) : null}
                </label>
            )}
            <div className="flex items-center gap-4 my-2 flex-wrap">
                <Field name={name}>
                    {({ field, form }) => {
                        return (
                            <ToggleSwitch
                                name={name}
                                checked={field.value}
                                onChange={(e) => form.setFieldValue(name, e)}
                                className={field.value ? 'custom-toggle' : ''}
                            />
                        );
                    }}
                </Field>

                <span className="bg-red-600 px-4 py-1 text-white">URGENT</span>
                <p>Let people know you want to sell, urgently!.</p>
            </div>

            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

export default UrgentField;
