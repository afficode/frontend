import { Link, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CameraSmall } from '../../assets/svgs';
import { Approutes } from '../../constants';
import { Button, InputGroup } from '../../ui';
import useAuth from '../../context/UserContext';
import { useNotify, userUpdate } from '../../hooks';
import { useState } from 'react';
import { getInitials } from '../../utils';
import { useImageCompressor } from '../../hooks/index';

const Sidebar = () => {
    const { mutate, isLoading } = userUpdate('dashboard/update_user');
    const [uploadingImage, setUploadingImage] = useState(false);
    const notify = useNotify();
    const { user, updateUserInfo } = useAuth();
    const { compressImages } = useImageCompressor();

    const initialValues = {
        profile_image: null,
    };

    const validationSchema = Yup.object({
        profile_image: Yup.mixed()
            .test('fileType', 'Only image files are allowed', (value) => {
                if (!value) {
                    return true;
                } // Allow empty files (no validation)
                return (
                    value && value.type.startsWith('image/') // Check if the file is an image
                );
            })
            .test('fileSize', 'File size must be less than 1MB', (value) => {
                if (!value) {
                    return true;
                } // Allow empty files (no validation)
                return value && value.size <= 1024 * 1024; // Check if the file size is <= 1MB
            }),
        // .required('Image file is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
    });

    const handleFileChange = async (event) => {
        try {
            const file = (await compressImages([event.currentTarget.files[0]]))[0];
            const formData = new FormData();
            setUploadingImage(true);

            if (file && file.type.startsWith('image/')) {
                if (file.size <= 1024 * 1024) {
                    setUploadingImage(false);

                    formik.setFieldValue('profile_image', file);
                    formData.append('profile_image', file);
                    mutate(formData, {
                        onSuccess: async (data) => {
                            updateUserInfo(data?.user);
                            notify(data?.message, 'success');
                        },
                        onError: (error) => {
                            notify(error?.message, 'error');
                        },
                    });
                } else {
                    notify('File size must be less than 1MB', 'error');
                    setUploadingImage(false);
                }
            } else {
                notify('Please upload an image file', 'error');
                setUploadingImage(false);
            }
        } catch (e) {
            notify('Something went wrong...', 'error');
            setUploadingImage(false);
        }
    };

    return (
        <aside className='w-[15rem] h-full bg-[#D9D9D9] rounded-r-[2.5rem] flex flex-col items-center text-center max-lg:hidden'>
            <div className='w-full pb-2 mt-2 space-y-4 border-b border-black/30 '>
                <div className='relative w-[9rem] h-[9rem] mx-auto'>
                    {isLoading || uploadingImage ? (
                        <div className='w-full h-full m-auto flex items-center justify-center rounded-full bg-slate-400 text-white text-xs '>
                            {' '}
                            Loading...
                        </div>
                    ) : formik?.values.profile_image || user?.profile_image ? (
                        <img
                            src={
                                formik?.values.profile_image
                                    ? URL.createObjectURL(formik.values.profile_image)
                                    : user?.profile_image?.path
                            }
                            alt={user?.firstname + ' ' + user?.lastname}
                            className='w-full h-full mx-auto rounded-full object-fit '
                        />
                    ) : (
                        <div className='w-full'>
                            <div className='avatar avatar-placeholder'>
                                <div className='bg-gray-400 text-black w-40 rounded-full'>
                                    <div className='md:text-6xl sm:text-4xl flex items-center justify-center h-full'>
                                        {getInitials(user?.firstname + ' ' + user?.lastname)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <form encType='multipart/form-data'>
                        <InputGroup
                            type='file'
                            name='profile_image'
                            onChange={handleFileChange}
                            errorMsg={
                                formik.touched.profile_image && formik.errors.profile_image
                                    ? formik.errors.profile_image
                                    : null
                            }
                        >
                            <img
                                src={CameraSmall}
                                alt=''
                                className='absolute bottom-0 right-0 cursor-pointer'
                            />
                        </InputGroup>
                    </form>
                </div>

                <div>
                    <h4 className='capitalize'>
                        {user.firstname} {user.lastname}
                    </h4>
                </div>
            </div>

            <nav className='flex flex-col justify-between flex-1 w-full px-4 my-6'>
                <ul className='flex flex-col gap-1 sidebar-list'>
                    {navList.map((navItem) => (
                        <NavLink key={navItem.name} to={navItem.link}>
                            <li className='w-full py-1 transition rounded-md p-lg hover:bg-white'>
                                {navItem.name}
                            </li>
                        </NavLink>
                    ))}
                </ul>

                <ul className='mb-2 space-y-4'>
                    <Link to={Approutes.logout}>
                        <Button
                            variant='plain'
                            size='small'
                            className='font-medium'
                            title='Log out'
                        >
                            Log Out
                        </Button>
                    </Link>
                    <Button
                        variant='plain'
                        size='small'
                        className='font-medium'
                        title='Deactivate your account'
                    >
                        Deactivate Account{' '}
                    </Button>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

const navList = [
    {
        name: 'Performance',
        link: Approutes.dashboard.performance,
    },
    {
        name: 'Profile',
        link: Approutes.dashboard.profile,
    },
    {
        name: 'Settings',
        link: Approutes.dashboard.settings,
    },
    {
        name: 'Security & Login',
        link: Approutes.dashboard.security,
    },

    {
        name: 'Privacy/Policy',
        link: Approutes.dashboard.dashboardPrivacyPolicy,
    },
    {
        name: 'Help',
        link: Approutes.dashboard.help,
    },
    // {
    // 	name: 'Go to website',
    // 	link: Approutes.home,
    // },
];
