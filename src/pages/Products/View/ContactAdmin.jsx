import { HiEye } from 'react-icons/hi';
import { privateAxios } from '../../../utils';
import { useEffect } from 'react';
import { useState } from 'react';
import { Timeline } from '../../../components';

import { Modal } from '../../../ui';
import { ContactAdminForm } from './ContactAdminForm';
import { fetchRemarks, useNotify } from '../../../hooks';
import useAuth from '../../../context/UserContext';

export default function ContactAdmin({ ads_id, images }) {
    const { isLogin } = useAuth();
    const [remark, setRemark] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [enable, setEnable] = useState(false);
    const { data } = fetchRemarks(ads_id, enable);

    const notify = useNotify();

    const handleDelete = async (id) => {
        await privateAxios
            .delete(`/ads/${id}`)
            .then(async (res) => {
                notify(res?.data.message, 'success');
            })

            .catch((error) => {
                notify(error?.response?.data?.message, 'error');
            });
    };
    useEffect(() => {
        if (isLogin && !data) {
            setEnable(true);
        }
        const remarks = async function () {
            const timelineData =
				data?.data?.remark?.length > 0
				    ? data?.data?.remark?.map((el) => ({
				        date: el?.date,
				        title: el?.name,
				        body: el?.text,
				        user: el?.user_id,
				    }))
				    : [];
            setRemark(() => timelineData);
        };

        if (data) {
            remarks();
        }
    }, [data]);
    return (
        <>
            <div className="mb-4 mt-2 text-red-700 dark:text-red-800">
                <p className="w-full p-2 pt-4">
                    <Timeline data={remark} />
                </p>
                <ul className="list-disc ml-4">
                    <li>
						Before you click on contact Admin, it will be Good to edit this Ad and make the necessary
						changes complained by Admin as the reason why this Ad was blocked.
                    </li>
                    <li>
                        {' '}
						If you think this Ads was blocked unjustly, click on the Contact Admin button to queue this
						Ads for review.
                    </li>
                    <li>
						Ensure the Ad is in good state before clicking Contact Admin to queue the Ad for review.{' '}
                    </li>
                </ul>
            </div>
            <div className="flex">
                <button
                    type="button"
                    className="mr-2 inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-primary/80 focus:ring-4 focus:ring-primary/90 dark:bg-primary dark:hover:bg-primary/70"
                    onClick={() => setIsOpen(true)}
                >
                    <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
					Contact Admin
                </button>
                <button
                    type="button"
                    className="rounded-lg border border-red-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 dark:border-red-800 dark:text-red-800 dark:hover:text-white"
                    onClick={() => handleDelete(ads_id)}
                >
					Delete Ad
                </button>
                <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    headerText={'Ad Review Form'}
                    children={<ContactAdminForm setIsOpen={setIsOpen} ads_id={ads_id} />}
                />
            </div>
        </>
    );
}
