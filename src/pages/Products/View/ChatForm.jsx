import { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Input from '../../../components/FormComponents/Input.jsx';
import Button from '../../../ui/Button/index.jsx';
import { privateAxios } from '../../../utils/axios.js';
import useAuth from '../../../context/UserContext.jsx';
import useGrabContext from '../../../context/GrabContext.jsx';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants/routes.js';
import { createChat, useSendMessage } from '../../../hooks/useMessages.js';
import { useNavigate } from 'react-router-dom';
import useNotify from '../../../hooks/useNotify.jsx';
import Modal from './Modal.jsx';
import ReportAd from './ReportAd.jsx';
import { FaEnvelope } from 'react-icons/fa';
import { FaMicrochip } from 'react-icons/fa6';
import { FcCancel } from 'react-icons/fc';
import { BiSolidMessageRoundedDetail } from 'react-icons/bi';
import { useGrabAd } from '../../../hooks/useGrab.js';
import { ArrowDown, Cancel, Naira } from '../../../assets/svgs/index.js';
import { InputGroup } from '../../../ui/index.js';
import { inspectableCategories } from '../../../constants/Category.js';
import { toMoney } from '../../../utils';

const ChatForm = ({ ad_id, owner, active, feature, ad }) => {
	const navigate = useNavigate();
	const notify = useNotify();

	const { isLogin, user } = useAuth();
	const { grabs, unGrabAd, grabAd: socketGrabAd } = useGrabContext();

	const [blocked, _] = useState(active === '0');
	const [chatId, setChatId] = useState(null);

	const verifyChat = async () =>
		await privateAxios
			.post('chat/verifyChat', { ad_id, owner })
			.then((res) => {
				res?.data?.chat.length > 0 && setChatId(res?.data?.chat[0].chat_id);
			})
			.catch((error) => {
				notify(error?.response?.data?.message, 'error');
			});
	useEffect(() => {
		if (user) {
			verifyChat();
		}
	}, []);

	const { mutate: grabAd, isLoading } = useGrabAd();
	const { mutate: creatingChat, isLoading: sendingChat } = createChat();
	const { mutate } = useSendMessage();

	const sendMessage = (message) => {
		mutate(message, {
			onError: ({ error }) => {
				notify(error.response.data.message, 'error');
			},
			onSuccess: ({ data }) => {
				if (data.success) {
					setChatId(message.chat_id);
					notify('Message sent successfully, The ad owner will be in touch with you soon.', 'success');
				}
			},
		});
	};

	const chatCreation = (content, offer = false) => {
		creatingChat(
			{ ad_id },
			{
				onError: () => {
					navigate('/auth', { replace: false });
				},
				onSuccess: ({ data }) => {
					if (data?.chat_id) {
						const chat_id = data.chat_id;
						sendMessage({ chat_id, content, offer });
					}
				},
			}
		);
	};

	const handleGrab = () => {
		if (user?.grabber.isActive === '1') {
			grabAd(
				{ ads_id: ad_id },
				{
					onSuccess: () => {
						notify('Item Grabbed, View on Grab Page', 'success', Approutes.grab.product(ad?.id));
						socketGrabAd(ad_id);
					},
					onError: (error) => {
						notify(error.response.data.message, 'error');
					},
				}
			);
		} else {
			notify('You cannot grab this ad, register as a grabber to grab ad', 'error');

			setTimeout(() => {
				navigate(Approutes.grab.register);
			}, 2000);
		}
	};

	const [offer, setOffer] = useState();

	const handleOfferSubmit = () => {
		const content = `I'm willing to pay: ₦${toMoney(offer)}`;
		chatCreation(content, true);
	};

	return (
		<div className={`} ${ad?.feature === '3' && 'md:mt-[6rem]'}     mt-4 h-full`}>
			<Formik
				initialValues={{
					message:
						chatId !== null
							? 'Disabled... Please continue chat in the message section'
							: 'Hi There, I am interested in this car, is it still available?',
					phone: chatId !== null ? 'Disabled... Please continue chat in the message section' : '',
				}}
				onSubmit={(values) => {
					let content = values.message;
					content += values.phone !== '' ? ` This is my phone number: ${values.phone}` : '';
					chatCreation(content);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						{inspectableCategories.includes(ad?.category) && feature == '3' ? (
							<>
								<Link to={Approutes.grab.grabProduct(ad_id)}>
									<Button
										variant={'primary'}
										size={'full'}
										type="button"
										className="my-2  text-lg tracking-tighter line-clamp-1 "
									>
										Interested
									</Button>
								</Link>

								{grabs?.includes(ad_id) ? (
									<Button
										onClick={async () => unGrabAd(ad_id)}
										variant="secondary"
										size={'full'}
										className="my-2  text-lg tracking-tighter line-clamp-1 hover:opacity-40"
										disabled={isLoading || false}
										type="button"
									>
										<span className="flex items-center gap-2 justify-center">
											Ungrab Item
											<FcCancel className="my-auto" />
										</span>{' '}
									</Button>
								) : (
									<Button
										onClick={handleGrab}
										variant="secondary"
										size={'full'}
										className={`my-2  text-lg tracking-tighter line-clamp-1 ${isLoading ? 'opacity-40' : ''}`}
										disabled={!isLogin || blocked || user?.id === owner || isLoading}
										type="button"
									>
										{isLoading ? (
											<span className="loading loading-spinner loading-md"></span>
										) : (
											<span className="flex items-center gap-2 justify-center">
												Grab Item
												<FaMicrochip className="my-auto" />
											</span>
										)}{' '}
									</Button>
								)}
							</>
						) : !inspectableCategories.includes(ad?.category) && feature == '3' ? (
							<>
								<Link to={Approutes.grab.grabProduct(ad_id)}>
									<Button
										variant={'primary'}
										size={'full'}
										type="button"
										className="my-2  text-lg tracking-tighter line-clamp-1 "
									>
										Place order
									</Button>
								</Link>

								{grabs?.includes(ad_id, 10) ? (
									<Button
										onClick={async () => unGrabAd(ad_id)}
										variant="secondary"
										size={'full'}
										className="my-2  text-lg tracking-tighter line-clamp-1 hover:opacity-40"
										disabled={isLoading || false}
										type="button"
									>
										<span className="flex items-center gap-2 justify-center">
											Ungrab Item
											<FcCancel className="my-auto" />
										</span>{' '}
									</Button>
								) : (
									<Button
										onClick={handleGrab}
										variant="secondary"
										size={'full'}
										className={`my-2  text-lg tracking-tighter line-clamp-1 ${isLoading ? 'opacity-40' : ''}`}
										disabled={!isLogin || blocked || user?.id === owner || isLoading}
										type="button"
									>
										{isLoading ? (
											<span className="loading loading-spinner loading-md"></span>
										) : (
											<span className="flex items-center gap-2 justify-center">
												Grab Item
												<FaMicrochip className="my-auto" />
											</span>
										)}{' '}
									</Button>
								)}
							</>
						) : (
							<>
								<Field
									disabled={!isLogin || chatId !== null || blocked || user?.id === owner}
									as="textarea"
									name="message"
									id="message"
									className={`border-2 w-full border-gray-200 p-4 focus:outline-none focus:bg-white focus:border-primary tracking-tighter line-clamp-1 ${!isLogin && 'bg-gray-100 cursor-not-allowed'
										} ${chatId !== null && 'bg-gray-300 cursor-not-allowed'}`}
									placeholder={
										chatId !== null
											? 'Disabled... Please continue chat in the message section'
											: `Hi There, I am interested in this d, is it still available?`
									}
									cols={20}
									rows={5}
								/>
								<Input
									disabled={chatId !== null || blocked || user?.id === owner}
									name="phone"
									id="phone"
									placeholder={
										chatId !== null
											? 'Disabled... Please continue chat in the message section'
											: 'Your number here'
									}
									className={`border-2 border-gray-200 w-full p-2 focus:outline-none focus:bg-white focus:border-primary ${!isLogin && 'bg-gray-100 cursor-not-allowed'
										} ${chatId !== null && 'bg-gray-300 cursor-not-allowed'}`}
								/>

								<p className="w-full my-2 text-center ">
									Your contact details will be included in your reply. BOONFU reserves the right to monitor
									conversations sent through our servers to protect you from fraud,spam or suspicious
									behavior.
								</p>

								{chatId ? (
									<Link to={Approutes.profile.messages}>
										<Button
											disabled={!isLogin || blocked || user?.id === owner}
											variant="secondary"
											size={'full'}
											className="my-2 text-lg font-bold tracking-tighter line-clamp-1"
										>
											<span className="flex gap-2 lg:gap-4 items-center justify-center">
												{' '}
												Go to Message <FaEnvelope className="my-auto" />
											</span>
										</Button>
									</Link>
								) : (
									<div
										className={` w-full ${!isLogin ? 'tooltip tooltip-primary z-1000' : ''}`}
										data-tip={`${!isLogin ? 'Please Login to send message' : 'Start a conversation'}`}
									>
										<Button
											disabled={!isLogin || blocked || user?.id === owner}
											loading={isSubmitting}
											type="submit"
											variant="primary"
											size={'full'}
											className="my-2 text-lg font-bold tracking-tighter line-clamp-1"
										>
											Submit
										</Button>
									</div>
								)}
								{ad?.negotiable === 1 && (
									<div className="dropdown dropdown-top dropdown-center w-full ">
										<Button
											variant={'secondary'}
											size={'full'}
											type="button"
											className=" text-lg  tracking-tighter line-clamp-1 group focus:bg-white focus:border-black"
										>
											<span className="flex items-center gap-4 justify-center font-semibold">
												Make offer{' '}
												<img
													src={ArrowDown}
													alt="/"
													className="w-4 group-focus:transform group-focus:rotate-180 transition-all"
												/>
											</span>
										</Button>
										<div
											tabIndex={0}
											className="dropdown-content   z-[10] menu  p-4 bg-white shadow-2xl w-full flex flex-col justify-between"
										>
											<form className="space-y-4">
												<div>
													<div className="flex items-center justify-between">
														<p>Price:</p>
														<h6 className="font-bold flex items-center gap-2">
															{' '}
															<img src={Naira} alt="naira" className="w-4" /> {toMoney(ad?.price)}
														</h6>
													</div>
													<div className="flex items-center justify-between gap-6">
														<label htmlFor="offer">Offer:</label>
														<InputGroup
															name="offer"
															id="offer"
															type="number"
															amount={'naira'}
															autoComplete="off"
															className={' customAmountInput '}
															value={offer}
															onChange={(e) => setOffer(e.target.value)}
															// onBlur={formikWithdraw.handleBlur}
															// errorMsg={
															// 	formikWithdraw.touched.amount && formikWithdraw.errors.amount
															// 		? formikWithdraw.errors.amount
															// 		: null
															// }
															cancelButton={
																<button
																	onClick={() => {
																		setOffer('');
																	}}
																	type="button"
																	className="absolute right-2 inset-y-0 my-auto h-fit "
																>
																	<img src={Cancel} alt="/" className="w-4" />
																</button>
															}
														/>
													</div>
												</div>

												<Button
													variant={'secondary'}
													size={'full'}
													className={'py-2 font-semibold'}
													type="button"
													onClick={handleOfferSubmit}
													disabled={!isLogin || blocked || offer === '' || sendingChat}
													loading={sendingChat}
												>
													Send this offer
												</Button>
											</form>
										</div>
									</div>
								)}
							</>
						)}
					</Form>
				)}
			</Formik>
			<Modal
				modalHeader={true}
				children={<ReportAd ad_id={ad_id} />}
				headerText={'Feedback / Abuse'}
				className={`w-full px-2 py-3 my-2 text-lg tracking-tighter text-white bg-slate-600 hover:bg-slate-500 line-clamp-1 ${!isLogin && 'cursor-not-allowed'
					}`}
				disabled={!isLogin || blocked || user?.id === owner}
				type="button"
				buttonChild={
					<>
						<span className="flex items-center gap-2 justify-center">
							Feedback <BiSolidMessageRoundedDetail className="my-auto" />
						</span>
					</>
				}
			/>
		</div>
	);
};

export default ChatForm;

{
	/* <Button
			size={"full"}
			className="w-full p-2 my-2 text-lg tracking-tighter text-white bg-slate-600 hover:bg-slate-500 line-clamp-1"
			disabled={!isLogin || blocked || user?.id === owner}
			type="button"
			onClick={() => setIsOpen(!isOpen)}
		  >
			<span className="flex items-center gap-2 justify-center">
			  Feedback <BiSolidMessageRoundedDetail className="my-auto" />
			</span>
		  </Button> */
}
{
	/* <Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			modalHeader={true}
			children={<ReportAd />}
			headerText={"Feedback / Abuse"}
		  /> */
}
