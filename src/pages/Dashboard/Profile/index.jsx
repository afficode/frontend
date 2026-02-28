import { useEffect, useMemo, useState } from 'react';
import { CameraBlue, EditPencil } from '../../../assets/svgs';
import { DashboardHeader } from '../../../components';
import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingScreen from './LoadingScreen';
import useAuth from '../../../context/UserContext.jsx';
import { useStates } from '../../../hooks/index.js';
import { userUpdate } from '../../../hooks/index.js';
import { useNotify } from '../../../hooks/index.js';
import VerifyPhoneNumber from './VerifyPhoneNumber.jsx';
import { useImageCompressor } from '../../../hooks/index.js';

const Profile = () => {
    const [toggleEdit, setToggleEdit] = useState({
        about: true,
        bio: true,
        cover_image: true,
    });
    const { data } = useStates();
    const state = useMemo(
        () =>
            data?.map((state) => ({
                value: state?.state_id,
                key: state?.name,
            })),
        [data]
    );
    const [isLoading, setIsLoading] = useState(true);
    const { user, updateUserInfo } = useAuth();
    const { mutate, isLoading: isUpdating } = userUpdate('dashboard/update_user');
    const notify = useNotify();
    const { compressImages } = useImageCompressor();

    const index = user?.phone.findIndex((num) => num.isDefault === '1');
    const phoneDetails = user?.phone[index];

    const initialValues = {
        phone: phoneDetails.number || 1000000000,
        location: user?.location || '',
        bio: user?.bio || '',
    };

    const validationSchema = Yup.object({
        phone: Yup.number()
            .typeError('Phone number must not contain +234, but start with 0XXXXXXXXXX')
            .required()
            .positive()
            .integer()
            .min(1000000000, 'Phone number must be 11 or 12 digit 08012345678')
            .max(99999999999, 'Phone number must be 11 or 12 digit 08012345678'),
        location: Yup.string().required('Required'),
        bio: Yup.string(),
    });

    const handleSave = async (values) => {
        try {
            delete values.email;
            delete values.established;
            delete values.name;

            const payload = Object.assign({}, values);

            if (payload.phone.toString().substring(0, 1) !== '0') {
                payload.phone = '0' + payload.phone.toString();
                values.phone = '0' + values.phone.toString();
            }

            if (payload.phone === phoneDetails.number) {
                delete payload.phone;
            }

            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });

            mutate(formData, {
                onSuccess: async (data) => {
                    updateUserInfo(data?.user);
                    notify(data?.message, 'success');
                },
                onError: (error) => {
                    notify(error?.message, 'error');
                },
            });

            setToggleEdit(() => ({
                about: true,
                bio: true,
                cover_image: true,
            }));
        } catch (e) {
            notify('Something went wrong...', 'error');
        }
    };

    const handleBioChange = (event) => {
        const inputValue = event.target.value;

        // Enforce the text limit
        if (inputValue.length <= 500) {
            formik.setFieldValue('bio', inputValue);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSave,
        validationSchema,
    });

    const handleFileChange = async (e) => {
        const file = (await compressImages([e.currentTarget.files[0]]))[0];
        formik.setFieldValue('cover_image', null);
        if (file && file.type.startsWith('image/')) {
            if (file.size <= 1024 * 1024) {
                formik.setFieldValue('cover_image', file);
                setToggleEdit((prev) => ({ ...prev, cover_image: false }));
            } else {
                notify('File size must be less than 1MB', 'error');
            }
        } else {
            notify('Only image files are allowed', 'error');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading || isUpdating) {
        return (
            <>
                <DashboardHeader />
                <LoadingScreen />;
            </>
        );
    }

    return (
        <div>
            <DashboardHeader />

            {/* banner */}
            <div
                className={`${
                    !formik?.values.cover_image &&
                    'border rounded-xl flex items-center justify-center'
                } w-full h-[20rem] my-4 relative`}
            >
                {formik?.values.cover_image || user?.cover_image ? (
                    <div className='w-full h-full relative group'>
                        <img
                            src={
                                formik?.values.cover_image
                                    ? URL.createObjectURL(formik.values.cover_image)
                                    : user?.cover_image?.path
                            }
                            alt='/'
                            className='w-full h-full mx-auto object-fit rounded-xl'
                        />
                    </div>
                ) : (
                    <h4 className='text-primary'>No cover image</h4>
                )}
                <form encType='multipart/form-data'>
                    <InputGroup type='file' name='cover_image' onChange={handleFileChange}>
                        <img
                            src={CameraBlue}
                            alt='/'
                            className='absolute right-0 bottom-[-20px] w-[3rem]'
                        />
                    </InputGroup>
                </form>
            </div>

            {/* aboutme container */}
            <div className='flex flex-col my-8 md:px-2 lg:px-4'>
                <div className='flex justify-between border-b border-black/30'>
                    <h4>About Me</h4>
                    <div
                        onClick={() => setToggleEdit((prev) => ({ ...prev, about: false }))}
                        className='flex gap-1 items-center text-primary text-lg font-medium cursor-pointer'
                    >
                        <img src={EditPencil} alt='/' className='w-4' />
                        <span>Edit</span>
                    </div>
                </div>

                <form className='w-full lg:w-[600px]'>
                    <div className='flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10'>
                        <label className='max-md:text-sm max-md:mt-2' htmlFor='name'>
                            Name
                        </label>
                        <InputGroup
                            name='name'
                            type='text'
                            className={`${toggleEdit.about && inputStyle} `}
                            disabled={true}
                            value={user?.firstname + ' ' + user?.lastname}
                        />
                    </div>
                    <div className='flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10'>
                        <label className='max-md:text-sm max-md:mt-2 inline-flex' htmlFor='phone'>
                            <span className='my-auto mr-4'>Contact Number</span>{' '}
                            <VerifyPhoneNumber phoneDetails={phoneDetails} />
                        </label>
                        {toggleEdit?.about ? (
                            <InputGroup
                                name='num'
                                type='text'
                                className={`${toggleEdit.about && inputStyle} `}
                                disabled={true}
                                value={formik.values.phone}
                            />
                        ) : (
                            <InputGroup
                                name='phone'
                                type='number'
                                className={`${toggleEdit.about && inputStyle} `}
                                disabled={toggleEdit.about}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMsg={
                                    formik.touched.phone && formik.errors.phone
                                        ? formik.errors.phone
                                        : null
                                }
                            />
                        )}
                    </div>
                    {toggleEdit?.about ? (
                        <div className='flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10'>
                            <label className='max-md:text-sm max-md:mt-2' htmlFor='user_location'>
                                Current Location
                            </label>
                            <InputGroup
                                name='user_location'
                                type='text'
                                className={`${toggleEdit.about && inputStyle} `}
                                disabled={true}
                                value={user?.user_location}
                            />
                        </div>
                    ) : (
                        <div className='flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10'>
                            <label
                                className='max-md:text-sm max-md:mt-2'
                                htmlFor='business_location'
                            >
                                Change Location
                            </label>
                            <InputGroup
                                name='location'
                                type='select'
                                optionLists={state}
                                className={`${toggleEdit.about && inputStyle} `}
                                disabled={toggleEdit.about}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMsg={
                                    formik.touched.location && formik.errors.location
                                        ? formik.errors.location
                                        : null
                                }
                            />
                        </div>
                    )}
                    <div className='flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10'>
                        <label className='max-md:text-sm max-md:mt-2' htmlFor='established'>
                            Established
                        </label>
                        <InputGroup
                            name='established'
                            type='text'
                            className={`${toggleEdit.about && inputStyle} `}
                            disabled={true}
                            value={`Since ${new Date(user?.joined_on).getFullYear()}`}
                        />
                    </div>
                    <div className='flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10'>
                        <label className='max-md:text-sm max-md:mt-2' htmlFor='email'>
                            E-mail
                        </label>
                        <InputGroup
                            name='email'
                            type='email'
                            className={`${toggleEdit.about && inputStyle} `}
                            disabled={true}
                            value={user?.email}
                        />
                    </div>
                </form>
            </div>

            {/* Bio container */}
            <div className='flex flex-col my-8 md:px-2 lg:px-4'>
                <div className='flex justify-between border-b border-black/30'>
                    <h4>Bio</h4>
                    <div
                        onClick={() => setToggleEdit((prev) => ({ ...prev, bio: false }))}
                        className='flex gap-1 items-center text-primary text-lg font-medium cursor-pointer'
                    >
                        <img src={EditPencil} alt='/' className='w-4' />
                        <span>Edit</span>
                    </div>
                </div>

                <form>
                    <p className='text-sm text-gray-500 flex items-end justify-end mt-4'>
                        {formik.values.bio.length}/{500} characters
                    </p>
                    <InputGroup
                        name='bio'
                        type='textarea'
                        rows={'5'}
                        className={`${toggleEdit.bio && inputStyle} p-2`}
                        disabled={toggleEdit.bio}
                        value={formik.values.bio}
                        onChange={handleBioChange}
                        onBlur={formik.handleBlur}
                        errorMsg={
                            formik.touched.bio && formik.errors.bio ? formik.errors.bio : null
                        }
                    />
                </form>
            </div>

            <div className='mb-16 px-4 sm:w-[200px] max-sm:mx-auto'>
                <Button
                    type='submit'
                    variant='primary'
                    size='full'
                    onClick={formik.handleSubmit}
                    disabled={
                        !formik.isValid ||
                        (toggleEdit.about && toggleEdit.bio && toggleEdit.cover_image)
                    }
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default Profile;

const inputStyle = 'border-transparent font-medium ';

// profile formdata

/* 
	{
		name: 'Adeola Lawal',
		bussiness_title: 'Auto Dealer',
		bussiness_location: 'Lagos State',
		established: 'Since 2008',
		email: 'lawal@gmail.com',
		bio: 'bio here',
		cover_image: 'cover image here',
	}

*/
