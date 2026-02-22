import { useState } from 'react';

import { useQueryClient } from 'react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextArea from '../../../components/FormComponents/TextArea';
import { Button } from '../../../ui';
import { useFeedback, useNotify } from '../../../hooks';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { FaSadTear } from 'react-icons/fa';

const FeedbackForm = ({ ad_id, buttonText, url, feedback }) => {
    const queryClient = useQueryClient();
    const notify = useNotify();
    const [feedbackType, setFeedbackType] = useState(null);
    const { mutate, isLoading } = useFeedback(`${url}`);
    const initialValue = {
        text: '',
        positive: '',
    };
    const validationSchema = Yup.object({
        text: Yup.string().required('Feedback text is required'),
        positive: feedback ? Yup.bool().required('What kind of feedback is this') : Yup.bool(),
    });
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const value = { ads_id: ad_id, ...values };
        setSubmitting(true);
        mutate(value, {
            onSuccess: (data) => {
                resetForm();
                notify(data?.message, 'success');
                queryClient.invalidateQueries('feedback');
            },
            onError: (err) => {
                notify(err?.message, 'error');
            },
        });

        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 3000);
        setSubmitting(false);
    };
    return (
        <div>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        <div className='w-full flex flex-col items-center justify-center mb-4'>
                            {feedback && (
                                <div className='w-full'>
                                    <div className='flex items-center justify-around w-full mb-2'>
                                        <span>
                                            <label
                                                data-tip='Positive Feedback'
                                                htmlFor='true'
                                                className={`tooltip tooltip-success text-green-500 ${feedbackType ? 'bg-green-300 rounded-full p-2' : ''}`}
                                                onClick={() => setFeedbackType(true)}
                                            >
                                                <BsFillEmojiSmileFill className='text-2xl' />
                                            </label>
                                            <Field
                                                type='radio'
                                                name='positive'
                                                id='true'
                                                value={'true'}
                                                className='hidden'
                                            />
                                        </span>
                                        <span>
                                            <label
                                                data-tip='Negative Feedback'
                                                htmlFor='false'
                                                className={`tooltip tooltip-error text-red-700 ${feedbackType === false ? 'bg-red-300 rounded-full p-2' : ''}`}
                                                onClick={() => setFeedbackType(false)}
                                            >
                                                <FaSadTear className='text-2xl' />
                                            </label>
                                            <Field
                                                type='radio'
                                                name='positive'
                                                id='false'
                                                value={'false'}
                                                className='hidden'
                                            />
                                        </span>
                                    </div>
                                    <span className='text-red-500 w-full flex items-center justify-center'>
                                        <ErrorMessage name='positive' />
                                    </span>
                                </div>
                            )}

                            <TextArea
                                name={'text'}
                                className='mx-auto w-full p-2 border-gray-200'
                                placeholder='Feedback'
                                cols={70}
                                maxLength={350}
                                {...formik.getFieldProps('text')}
                            />
                            <Button
                                type='submit'
                                variant={'primary'}
                                size={'full'}
                                disabled={isLoading}
                            >
                                <span> {buttonText || 'Submit'}</span>
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FeedbackForm;
