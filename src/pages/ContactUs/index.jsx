import { Link } from 'react-router-dom';

// icons
import { BiEnvelope } from 'react-icons/bi';
import { SlLocationPin } from 'react-icons/sl';
import { FiPhone } from 'react-icons/fi';

const ContactUs = () => {
	return (
		<section>
			<div className="bg-blue py-12 px-4 sm:px-[4rem] m-2 rounded-md max-sm:text-center text-white">
				<h1 className="text-white ">Contact Us</h1>
				<h4 className="mt-2 ">Chat to our friendly team</h4>

				<p className="mt-3 text-gray-500 dark:text-gray-400">
					We'd love to hear from you. Please fill out this form or shoot us an email.
				</p>
			</div>

			<div className="px-[4rem] max-sm:px-4 grid grid-cols-1 gap-12 my-10 lg:grid-cols-2">
				<div className="grid grid-cols-1 gap-12 max-md:place-items-center max-md:text-center md:grid-cols-2">
					<div>
						<span className="inline-block p-3 text-white rounded-full bg-blue">
							<BiEnvelope size={20} />
						</span>

						<h6 className="mt-4 font-medium text-black ">Email</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
						<Link to="mailto:reachaffi@gmail.com">
							<span className="mt-2 text-sm hover:underline text-blue">reachaffi@gmail.com</span>
						</Link>
					</div>

					<div>
						<span className="inline-block p-3 text-white rounded-full bg-blue">
							<SlLocationPin size={20} />
						</span>

						<h6 className="mt-4 font-medium text-black ">Live chat</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
						<Link to="https://wa.me/+2348136155728" rel="noopener noreferrer" target="_blank">
							<span className="mt-2 text-sm hover:underline text-blue">Start new chat</span>
						</Link>
					</div>

					<div>
						<span className="inline-block p-3 text-white rounded-full bg-blue">
							<SlLocationPin size={20} />
						</span>

						<h6 className="mt-4 font-medium text-black ">Office</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>

						<span className="mt-2 text-sm text-blue">100 Smith Street Collingwood VIC 3066 AU</span>
					</div>

					<div>
						<span className="inline-block p-3 text-white rounded-full bg-blue">
							<FiPhone size={20} />
						</span>

						<h6 className="mt-4 font-medium text-black ">Phone</h6>
						<p className="mt-2 text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>

						<Link to={'tel:+2348136155728'}>
							<span className="mt-2 text-sm hover:underline text-blue">+234 8136155728</span>
						</Link>
					</div>
				</div>

				<div className="p-4 py-6 rounded-lg bg-yellow/90 md:p-8">
					<form>
						<div className=" md:items-center md:flex">
							<div className="flex-1 px-2">
								<label className="block mb-2 text-base font-normal text-black">First Name</label>
								<input
									type="text"
									placeholder="Gideon "
									className="block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-blue focus:ring-blue focus:outline-none focus:ring focus:ring-opacity-40"
								/>
							</div>

							<div className="flex-1 px-2 mt-4 md:mt-0">
								<label className="block mb-2 text-base font-normal text-black">Last Name</label>
								<input
									type="text"
									placeholder="Smith"
									className="block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-blue focus:ring-blue focus:outline-none focus:ring focus:ring-opacity-40"
								/>
							</div>
						</div>

						<div className="mt-4">
							<label className="block mb-2 text-base font-normal text-black">Email address</label>
							<input
								type="email"
								placeholder="gideonsmith@example.com"
								className="block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-blue focus:ring-blue focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="w-full mt-4">
							<label className="block mb-2 text-base font-normal text-black">Message</label>
							<textarea
								className="md:h-56 h-32 block w-full px-5 py-2.5 mt-2 text-black placeholder-black/50 bg-white border border-black/50 rounded-lg focus:border-blue focus:ring-blue focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Message"
							></textarea>
						</div>

						<button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform border-none rounded-lg btn bg-blue hover:bg-blue/80 focus:outline-none ">
							Send message
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactUs;
