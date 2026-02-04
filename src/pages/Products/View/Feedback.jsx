import { formatDistance } from 'date-fns';
import useAuth from '../../../context/UserContext';

import FeedbackForm from './FeedbackForm';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { FaSadTear } from 'react-icons/fa';
import { fetchFeedbacks } from '../../../hooks';
import { clearLocalStorage, setRedirectLink } from '../../../utils';
import { Approutes } from '../../../constants';
import { useEffect, useState } from 'react';

const Feedback = ({ ad_id }) => {
    const [enable, setEnable] = useState(false);
    const { isLogin } = useAuth();
    const { data: response, isError, error } = fetchFeedbacks(ad_id, enable);
    if (isError) {
        // redirect the user to login page
        if (isLogin && error?.response?.status === 401) {
            setRedirectLink(window.location.pathname);
            clearLocalStorage();
            return window.location.assign(Approutes.auth.initial);
        }
    }

    useEffect(() => {
        if (isLogin) {
            setEnable(true);
        } else {
            setEnable(false);
        }
    });

    return (
        <section className="w-full">
            <div className="flex gap-2 justify-around items-start flex-col">
                <div className="flex items-center justify-start w-full">
                    <FeedbackForm ad_id={ad_id} url={'feedback'} buttonText={'Submit Feedback'} feedback={true} />
                </div>
                <div className="flex flex-col w-full gap-4">
                    {response?.data?.feedbacks.map(({ name, user_id, feedback_on, positive, text }, index) => (
                        <Feedbacks
                            key={index}
                            name={name}
                            user_id={user_id}
                            feedback_on={feedback_on}
                            positive={positive}
                            text={text}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feedback;

const Feedbacks = ({ name, feedback_on, positive, text }) => {
    return (
        <div className="flex flex-col w-full items-center justify-start bg-slate-50 p-2 lg:p-4 shadow-xl border border-b-primary border-b-4">
            <div className="w-full text-slate-600 text-xs text-right my-4">
                <span className="tracking-tighter">
                    {formatDistance(new Date(new Date(`${feedback_on}`)), Date.now(), {
                        includeSeconds: true,
                        addSuffix: true,
                    }).includes('about') ? (
                            <>
                                {formatDistance(new Date(new Date(`${feedback_on}`)), Date.now(), {
                                    includeSeconds: true,
                                    addSuffix: true,
                                }).substring(5)}
                            </>
                        ) : (
                            <>
                                {formatDistance(new Date(new Date(`${feedback_on}`)), Date.now(), {
                                    includeSeconds: true,
                                    addSuffix: true,
                                })}
                            </>
                        )}
                </span>
            </div>
            <p className="text-justify w-full">{text}</p>
            <div className="flex items-center justify-around  py-2 w-full">
                <div className="w-full flex text-left gap-4">
                    <div className="avatar placeholder">
                        <div className="bg-gray-300 text-neutral-content rounded-full w-12">
                            <span className="text-black">
                                {name?.split(' ')?.length === 2 ? (
                                    <>{`${name?.split(' ')[0]?.charAt(0).toUpperCase()}${name
                                        ?.split(' ')[1]
                                        ?.charAt(0)
                                        .toUpperCase()} `}</>
                                ) : (
                                    <>{name?.charAt(0).toUppercase()}</>
                                )}
                            </span>
                        </div>
                    </div>
                    <span className="font-bold my-auto">{name}</span>
                </div>
                <p className="">
                    {positive === 'true' ? (
                        <span className="text-green-500">
                            <BsFillEmojiSmileFill className="text-2xl" />
                        </span>
                    ) : (
                        <span className="text-red-700">
                            <FaSadTear className="text-2xl" />
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
};
