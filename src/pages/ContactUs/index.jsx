import { Link } from 'react-router-dom';
import { ScrollToTop } from '../../utils';
import { api } from '../../utils';
import { useState } from 'react';
import { Button } from '../../ui';
import { useNotify } from '../../hooks';
import secureLocalStorage from 'react-secure-storage';

// icons
import { BiEnvelope } from 'react-icons/bi';
import { SlLocationPin } from 'react-icons/sl';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { BOONFU_MAIL } from '../../constants';

const ContactUs = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		email: '',
		message: '',
	});
	const notify = useNotify();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const removeLocalStorageItem = (key, delay) => {
		setTimeout(() => {
			secureLocalStorage.removeItem(key);
		}, delay);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(formData);
		setLoading(true);

		if (secureLocalStorage.getItem('contact_us')) {
			notify('You have already sent a message. Please wait for a response.', 'error');
			setLoading(false);
			return;
		}

		try {
			const res = await api.post('/api/contact_us', formData);
			// console.log(res.data);
			secureLocalStorage.setItem('contact_us', res.data);
			removeLocalStorageItem('contact_us', 1800000);
			setLoading(false);
			notify(res.data.message, 'success');
			setFormData({
				firstname: '',
				lastname: '',
				email: '',
				message: '',
			});
		} catch (error) {
			notify(error?.response?.data?.message, 'error');
			secureLocalStorage.removeItem('contact_us');
			setLoading(false);
			notify('An error occured try again', 'error');
		}
	};

	return (
		<section>
			<div className="bg-primary py-12 px-4 sm:px-[4rem] m-2 rounded-md text-center text-white">
				<h1 className="text-white ">Contact Us</h1>
				<h4 className="mt-2 ">Chat with our friendly team.</h4>

				<p className="mt-3 text-gray-300 dark:text-gray-400">
					We'd love to hear from you. Please fill out this form or send us an email.
				</p>
			</div>

			<div className="px-[4rem] max-sm:px-4 grid grid-cols-1 gap-12 my-10 lg:grid-cols-2">
				<div className="grid grid-cols-1 gap-12 max-md:place-items-center max-md:text-center md:grid-cols-2">
					<div>
						<Link to="mailto:reachaffi@gmail.com">
							<span className="inline-block p-3 text-white transition-all rounded-full bg-primary hover:scale-105">
								<BiEnvelope size={20} />
							</span>
						</Link>

						<h6 className="mt-4 font-medium text-black ">Email</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
						<Link to={`mailto:${BOONFU_MAIL}`}>
							<span className="mt-2 text-sm hover:underline text-primary ">{BOONFU_MAIL}</span>
						</Link>
					</div>

					<div>
						<Link to="https://wa.me/+2348136155728" rel="noopener noreferrer" target="_blank">
							<span className="inline-block p-3 text-white transition-all rounded-full bg-primary hover:scale-105">
								<MdOutlineSupportAgent size={20} />
							</span>
						</Link>
						<h6 className="mt-4 font-medium text-black ">Live chat</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
						<Link to="https://wa.me/+2348136155728" rel="noopener noreferrer" target="_blank">
							<span className="mt-2 text-sm hover:underline text-primary">Start new chat</span>
						</Link>
					</div>

					<div>
						<span className="inline-block p-3 text-white rounded-full bg-primary">
							<SlLocationPin size={20} />
						</span>

						<h6 className="mt-4 font-medium text-black ">Office</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>

						<span className="mt-2 text-sm text-primary">100 Smith Street Collingwood VIC 3066 AU</span>
					</div>

					<div>
						<Link to={'tel:+2348136155728'}>
							<span className="inline-block p-3 text-white transition-all rounded-full bg-primary hover:scale-105">
								<FiPhone size={20} />
							</span>
						</Link>

						<h6 className="mt-4 font-medium text-black ">Phone</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>

						<Link to={'tel:+2348136155728'}>
							<span className="mt-2 text-sm hover:underline text-primary">+234 8136155728</span>
						</Link>
					</div>
				</div>

				<div className="p-4 ">
					<form onSubmit={handleSubmit}>
						<div className="gap-4 md:items-center md:flex">
							<div className="flex-1">
								<label className="block mb-2 text-base font-normal text-black">First Name</label>
								<input
									type="text"
									placeholder="Gideon "
									name="firstname"
									className="block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
									value={formData?.firstname}
									onChange={handleChange}
								/>
							</div>

							<div className="flex-1 mt-4 md:mt-0">
								<label className="block mb-2 text-base font-normal text-black">Last Name</label>
								<input
									type="text"
									name="lastname"
									placeholder="Smith"
									className="block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
									value={formData?.lastname}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="mt-4">
							<label className="block mb-2 text-base font-normal text-black">Email address</label>
							<input
								type="email"
								name="email"
								placeholder="gideonsmith@example.com"
								className="block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								value={formData?.email}
								onChange={handleChange}
							/>
						</div>

						<div className="w-full mt-4">
							<label className="block mb-2 text-base font-normal text-black">Message</label>
							<textarea
								name="message"
								className="md:h-56 h-32 block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Message"
								value={formData?.message}
								onChange={handleChange}
							></textarea>
						</div>

						<div className="max-sm:text-center">
							{/* <button className="px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform border-none rounded-lg btn bg-primary hover:bg-primary/80 focus:outline-none">
								Send message <BiEnvelope size={20} />
							</button> */}
							<Button
								variant={'primary'}
								size={'small'}
								loading={loading}
								disabled={loading}
								className={'flex items-center gap-2 p-2 rounded-md'}
							>
								Send message <BiEnvelope size={20} />
							</Button>
						</div>
					</form>
				</div>
			</div>

			<ScrollToTop />
		</section>
	);
};

export default ContactUs;
