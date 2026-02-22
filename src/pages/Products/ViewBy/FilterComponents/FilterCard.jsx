import FormControl from './FormControl';
import { Field, useFormikContext } from 'formik';
import { toMoney } from '../../../../utils';

const FilterCard = ({ field, setfieldvalue }) => {
    const { values } = useFormikContext();

    const formatMoneyInput = (value) => {
        const numeric = (value || '').toString().replace(/[^0-9]/g, '');
        if (!numeric) {
            return '';
        }
        return toMoney(numeric, true);
    };

    const handleMoneyChange = (name) => (e) => {
        const formatted = formatMoneyInput(e.target.value);
        setfieldvalue(name, formatted);
    };

    return (
        <div className=' w-full  my-4 border-2 border-gray-300 rounded-sm p-2  overflow-auto'>
            <h5 className=' font-bold !text-sm !md:text-base tracking-tighter line-clamp-1'>
                {field.title}
            </h5>
            {field?.options && (
                <div className='flex items-center justify-between my-2 tracking-tighter line-clamp-1'>
                    {/* if more than 2, use the map function and make the index output a span with the to when index value is 0 */}
                    {(() => {
                        const minName = field.options[0].name;
                        const maxName = field.options[1].name;
                        const minDisplay = formatMoneyInput(values?.[minName]);
                        const maxDisplay = formatMoneyInput(values?.[maxName]);
                        return (
                            <>
                                <Field
                                    type={field.options[0].type}
                                    name={minName}
                                    placeholder={field.options[0].placeholder}
                                    className={field.options[0].className}
                                    value={minDisplay}
                                    onChange={handleMoneyChange(minName)}
                                />{' '}
                                <span className=' antialiased text-sm'>to </span>
                                <Field
                                    type={field.options[1].type}
                                    name={maxName}
                                    placeholder={field.options[1].placeholder}
                                    className={field.options[1].className}
                                    value={maxDisplay}
                                    onChange={handleMoneyChange(maxName)}
                                />{' '}
                            </>
                        );
                    })()}
                </div>
            )}

            <div className='flex flex-col m-1 gap-2 pb-2 overflow-y-scroll min-h-[30px] max-h-[200px] tracking-tighter line-clamp-1'>
                {field?.content?.map((content, index) => (
                    <FormControl
                        type={field.type}
                        content={content}
                        key={index}
                        className='hover:bg-primary ml-2 '
                        setfieldvalue={setfieldvalue}
                    />
                ))}
            </div>
        </div>
    );
};

export default FilterCard;
