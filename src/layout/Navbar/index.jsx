import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Approutes } from '../../constants/routes';
import { CategoryDropdown, WalletDropdown } from '../../ui';
import { BoonfuLogo } from '../../assets/images';
import { useCategories, useStates } from '../../hooks';
import useAuth from '../../context/UserContext';
import useMessageContext from '../../context/MessageContext';

// icons
import { HiSearch, HiOutlineSpeakerphone } from 'react-icons/hi';
import { SlArrowRight } from 'react-icons/sl';
import { IoWalletOutline } from 'react-icons/io5';
import { BiEnvelope } from 'react-icons/bi';
import { GoBookmark } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { VscGitPullRequestGoToChanges, VscMenu } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { BsShop } from 'react-icons/bs';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FaCarSide, FaBuilding, FaRegHandshake } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';
import { getSaves } from '../../hooks/useSaves';
import { toSelectOptions } from '../../utils';
import { NotificationBell } from '../../assets/svgs';
import VerifyPhoneNumber from '../../pages/Dashboard/Profile/VerifyPhoneNumber';
// import { AccountHistory } from '../../components';

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const [enable, setEnable] = useState(false);
	const navigate = useNavigate();
	const navRef = useRef();
	let [searchParams, setSearchParams] = useSearchParams();
	const { isLogin, user } = useAuth();
	const { data: saves, error } = getSaves(enable) || [];
	const { unread } = useMessageContext();

	// fetch categories
	const { data } = useCategories();

	// filter categories
	const filteredCategories = {
		allCat: [],
		vehicleCat: [],
		propertyCat: [],
		servicesCat: [],
		agricCat: [],
		electCat: [],
	};
	if (isLogin && error) {
		const { status } = error?.response;
		if (status === 401) {
			return window.location.assign(Approutes.auth.initial);
		}
	}

	if (Array.isArray(data)) {
		data?.forEach((item) => {
			if (item.id >= 10 && item.id < 100) {
				filteredCategories.allCat.push(item);
			} else if (item.id >= 5000 && item.id < 5100) {
				filteredCategories.vehicleCat.push(item);
			} else if (item.id >= 5100 && item.id < 5200) {
				filteredCategories.propertyCat.push(item);
			} else if (item.id >= 5200 && item.id < 5300) {
				filteredCategories.servicesCat.push(item);
			} else if (item.id >= 5300 && item.id < 5400) {
				filteredCategories.agricCat.push(item);
			} else if (item.id >= 5400 && item.id < 5500) {
				filteredCategories.electCat.push(item);
			}
		});
	}
	const { pathname } = useLocation();

	const handleSearch = useDebouncedCallback((query, stateId) => {
		if (query || stateId) {
			setSearchParams({
				q: query || '',
				state_id: stateId || '',
			});
			if (!pathname !== '/product') {
				navigate(`${Approutes.product.initial}/?q=${query}&state_id=${stateId}`);
			}
		} else {
			// delete the query from the params
			setSearchParams({
				q: '',
				state_id: '',
			});
		}
	}, 500);

	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'All');

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (navRef.current && !navRef.current.contains(e.target)) {
				setNav(false);
			}
		};
		if (isLogin) {
			setEnable(true);
		} else {
			setEnable(false);
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setNav, isLogin]);

	return (
		<header className="fixed top-0 z-[2000] w-full bg-primary">
			<nav className="relative ">
				<div className="w-full pt-3 ">
					{/* top nav  */}
					<div className="max-w-[1380px] mx-auto px-2 flex items-center justify-between ">
						{/* logo */}
						<div className="flex items-center bg-white rounded-full p-[2px]">
							<NavLink to={'/'}>
								<img src={BoonfuLogo} className="w-[2.9rem]" alt="Boonfu.ng" />
							</NavLink>
						</div>

						{/* <!-- Search input on desktop screen --> */}
						<div className="items-center justify-between hidden lg:flex">
							<div className="w-full px-10 mx-auto ">
								<div className="relative">
									<input
										title="Search for items here."
										type="text"
										className="w-full lg:w-[32rem] xl:w-[40rem] py-2 pl-4 pr-[12rem] text-black text-sm  bg-white border border-transparent rounded-3xl  focus:border-secondary outline-none focus:ring focus:ring-opacity-10 focus:ring-secondary"
										placeholder="Searching for?....."
										defaultValue={searchParams.get('q') || ''}
										onChange={(e) => {
											const query = e.target.value;
											const stateId = searchParams.get('state_id') || '';
											handleSearch(query, stateId);
										}}
									/>

									<div className="absolute inset-y-0 right-0 flex items-center pr-3">
										<div className="border-l-4 border-l-primary">
											<select
												type="select"
												className="text-xs w-[10rem] h-6 border-transparent outline-none focus:border-none focus:ring focus:ring-transparent"
												defaultValue={searchParams.get('state_id') || ''}
												onChange={(e) => {
													const query = searchParams.get('q') || '';
													const stateId = e.target.value;
													handleSearch(query, stateId);
												}}
											>
												{statesOptions.map((option) => (
													<option value={option.value} key={option.value}>
														{option.key}
													</option>
												))}
											</select>
										</div>

										<button className="bg-primary p-[0.4rem] rounded-xl">
											<HiSearch size={23} className="text-white" />
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* top nav items */}
						<div className="flex items-center gap-2 lg:gap-3">
							{isLogin && (
								// <Link to={Approutes.profile.notifications}>
								// 	<div
								// 		className="flex flex-col items-center text-white cursor-pointer "
								// 		title="My Notifications"
								// 	>
								// 		<AiOutlineBell size={25} />
								// 		<span className="text-xs sm:text-sm">Notifications</span>
								// 	</div>
								// </Link>
								// <div className="max-h-screen dropdown">
								<>
									<Link to={Approutes.profile.notifications}>
										<div
											className="flex flex-col justify-center items-center p-2 bg-white rounded-full"
											title="My Notifications"
										>
											<img src={NotificationBell} alt="my notification" className="w-6 h-6" />
										</div>
									</Link>
									<div className="dropdown">
										<button
											tabIndex={0}
											className="flex flex-col items-center px-2 py-1 bg-white rounded-md cursor-pointer outline outline-4 outline-secondary text-primary"
											title="My Wallet"
										>
											<IoWalletOutline size={25} />
											<span className="text-xs sm:text-sm">Wallet</span>
										</button>
										<WalletDropdown />
									</div>
								</>

								// 	{/* <AccountHistory
								// 		tabIndex={0}
								// 		className={`dropdown-content transform -translate-x-2/3 h-fit min-w-[300px]  z-[10] py-1 rounded-xl bg-white shadow-md overflow-y-auto`}
								// 	/>
								// </div> */}
							)}
							<Link to={Approutes.profile.saved}>
								<div
									className="relative flex flex-col items-center text-white cursor-pointer max-md:hidden"
									title="Saved items"
								>
									<GoBookmark size={25} />
									<span className="text-xs sm:text-sm">Saved</span>
									{isLogin && saves?.saves.length > 0 && (
										<span className="absolute top-[-7px] rounded-full px-1 bg-secondary/90 right-0 font-semibold text-sm text-black">
											{saves?.saves.length}
										</span>
									)}
								</div>
							</Link>
							{/* post ad dropdown */}
							<div className="dropdown ">
								<div
									tabIndex={0}
									className="flex flex-col items-center text-white cursor-pointer "
									title="Post an ad"
								>
									<HiOutlineSpeakerphone size={25} />
									<span className="text-xs sm:text-sm whitespace-nowrap">Post ad</span>
								</div>
								<ul
									tabIndex={0}
									className={`dropdown-content transform -translate-x-2/3 min-h-fit w-fit  z-[10] px-4 py-6 bg-white shadow-md rounded-md `}
								>

									{!user?.phone[0]?.isVerified
										? <div className="flex flex-col gap-4 justify-center items-center">
											<p className="w-[18rem] text-justify">Please verify your phone number before you can post an AD.</p>
											<VerifyPhoneNumber phoneDetails={user?.phone[0]} />
										</div>
										: <>
											<h4 className="font-semibold whitespace-nowrap">Post Ad in</h4>
											<ul className="flex flex-col menu max-h-full w-full z-[10] py-4 ">
												{filteredCategories?.allCat?.map((category) => (
													<Link to={`${Approutes.postAd}/${category.id}`} key={category.id}>
														<li className="text-lg capitalize max-sm:text-base lg:pr-12 hover:underline whitespace-nowrap">
															{category.name}
														</li>
													</Link>
												))}
											</ul>
										</>

									}
								</ul>
							</div>
							{!isLogin ? (
								<Link to={Approutes.auth.initial}>
									<div
										className="flex flex-col items-center text-white cursor-pointer"
										title="Click to sign-in or register"
									>
										<CgProfile size={25} />
										<span className="text-xs whitespace-nowrap sm:text-sm">Sign-In</span>
									</div>
								</Link>
							) : (
								<>
									<Link to={Approutes.profile.messages}>
										<div
											className="relative flex flex-col items-center  text-white cursor-pointer max-md:hidden"
											title="My messages"
										>
											{' '}
											{isLogin && unread > 0 && (
												<span className="absolute top-[-5px] rounded-full px-1 bg-secondary/90 right-[7px] font-semibold text-sm text-black">
													{unread}
												</span>
											)}
											<BiEnvelope size={25} />
											<span className="text-xs sm:text-sm whitespace-nowrap">Messages</span>
										</div>
									</Link>
									<div className="dropdown dropdown-hover">
										<Link to={Approutes.profile.initial}>
											<div
												tabIndex={0}
												className="flex flex-col max-sm:hidden items-center text-white cursor-pointer"
												title="My profile"
											>
												<CgProfile size={25} />
												<span className="text-xs sm:text-sm whitespace-nowrap">{user?.firstname}</span>
											</div>
										</Link>
										<ul
											tabIndex={0}
											className={`dropdown-content transform -translate-x-[50%] sm:-translate-x-[74%] min-h-fit w-[15rem]  z-[10] p-4 bg-white shadow-md rounded-2xl`}
										>
											<ul className="flex flex-col gap-[0.4rem] menu max-h-full w-full z-[10] ">
												{/* <NavLink to={'/'}>
													<li className="text-lg capitalize max-sm:text-base lg:pr-12 hover:underline whitespace-nowrap">
														HOME
													</li>
												</NavLink> */}
												<NavLink to={Approutes.dashboard.initial}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Dashboard</li>
													</div>
												</NavLink>
												{/* <NavLink to={Approutes.profile.details}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Details</li>
													</div>
												</NavLink> */}
												<NavLink to={Approutes.profile.messages}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Messages</li>
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline opacity-50">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap   ">My Shop</li>
													</div>
												</NavLink>
												<NavLink to={Approutes.grab.initial}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Grab</li>
													</div>
												</NavLink>
												{/* <NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Transactions</li>
													</div>
												</NavLink> */}
												<NavLink to={Approutes.profile.notifications}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Notifications</li>
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline opacity-50">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Manage my Ads</li>
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline opacity-50">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Manage my shop</li>
													</div>
												</NavLink>
												<NavLink to={Approutes.profile.saved}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Saved Items</li>
													</div>
												</NavLink>
												<NavLink to={Approutes.profile.adverts}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Adverts</li>
													</div>
												</NavLink>
												<NavLink to={Approutes.contactUs}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Help & Contact</li>
													</div>
												</NavLink>
												<NavLink to={Approutes.logout}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Logout</li>
													</div>
												</NavLink>
											</ul>
										</ul>
									</div>
								</>
							)}
							{/* mobile categories/menu dropdown */}
							{!isLogin ? (
								<div className="dropdown dropdown-end">
									<button className="flex flex-col gap-0 px-4 py-0 capitalize bg-white border-none max-sm:text-xs lg:hidden btn btn-sm text-primary hover:bg-white">
										Categories
									</button>
									<ul
										tabIndex={0}
										className={`dropdown-content min-h-fit w-fit z-[10] px-4 py-6 bg-white shadow-md rounded-md`}
									>
										<h3 className="font-semibold max-lg:text-xl whitespace-nowrap">Categories</h3>
										<ul className="flex flex-col menu max-h-full w-full z-[10] py-4 ">
											{filteredCategories?.allCat?.map((category) => (
												<NavLink to={`${Approutes.product.category}/${btoa(category.id)}`} key={category.id}>
													<li className="text-lg capitalize max-sm:text-base lg:pr-12 hover:underline whitespace-nowrap">
														{category.name}
													</li>
												</NavLink>
											))}
										</ul>
									</ul>
								</div>
							) : (
								<>
									<button onClick={() => setNav(!nav)} className="ml-2 text-white cursor-pointer lg:hidden ">
										<VscMenu size={28} />
									</button>

									<div
										className={
											nav
												? ` transform translate-x-[0%] w-full h-full transition-all duration-500 fixed top-0 right-0 bottom-0 left-0 bg-primary/50 z-10 grid place-items-end`
												: ` transform translate-x-[100%] transition-all duration-500 fixed top-0 right-0 bottom-0 left-0 bg-primary/50 z-10 grid place-items-end`
										}
									>
										<div ref={navRef} className="w-[70%] h-full bg-white p-4 flex flex-col gap-[3rem] ">
											<button className="ml-auto lg:hidden " onClick={() => setNav(!nav)}>
												<IoMdClose size={28} />
											</button>
											<ul className="flex flex-col gap-4 self-start max-h-full w-full z-[10] ">
												<NavLink to={'/'}>
													<li className="text-base capitalize hover:underline whitespace-nowrap">HOME</li>
												</NavLink>
												<NavLink to={Approutes.dashboard.initial}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Dashboard</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												{/* <NavLink to={Approutes.profile.details}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Details</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink> */}
												<NavLink to={Approutes.profile.messages}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Messages</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline opacity-50">
														<li className="text-base whitespace-nowrap ">My Shop</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={Approutes.grab.initial}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Grab</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												{/* <NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Transactions</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink> */}
												<NavLink to={Approutes.profile.notifications}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Notifications</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline opacity-50">
														<li className="text-base whitespace-nowrap ">Manage my Ads</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline opacity-50">
														<li className="text-base whitespace-nowrap ">Manage my shop</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={Approutes.profile.saved}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Saved Items</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={Approutes.profile.adverts}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Adverts</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={Approutes.contactUs}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Help & Contact</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												{isLogin && (
													<NavLink to={Approutes.logout}>
														<div className="flex items-center hover:underline">
															<li className="text-base whitespace-nowrap ">Logout</li>
														</div>
													</NavLink>
												)}
											</ul>
										</div>
									</div>
								</>
							)}
						</div>
					</div>

					{/* <!-- Mobile search input --> */}
					<div className="flex items-center w-full px-1 mt-2 lg:hidden">
						<form className="relative w-full">
							<input
								title="Search for items here."
								type="text"
								className="w-full py-2 pl-4 pr-[12rem] text-black text-sm bg-white border border-transparent rounded-3xl  focus:border-secondary outline-none focus:ring focus:ring-opacity-10 focus:ring-secondary"
								placeholder="Searching for?....."
								defaultValue={searchParams.get('q') || ''}
								onChange={(e) => {
									const query = e.target.value;
									const stateId = searchParams.get('state_id') || '';
									handleSearch(query, stateId);
								}}
							/>
							<div className="absolute inset-y-0 right-0 flex items-center pr-3">
								<div className="border-l-4 border-l-primary">
									<select
										type="select"
										className="text-xs w-[10rem] h-6 border-transparent outline-none focus:border-none focus:ring focus:ring-transparent"
										defaultValue={searchParams.get('state_id') || ''}
										onChange={(e) => {
											const query = searchParams.get('q') || '';
											const stateId = e.target.value;
											handleSearch(query, stateId);
										}}
									>
										{statesOptions.map((option) => (
											<option value={option.value} key={option.value}>
												{option.key}
											</option>
										))}
									</select>
								</div>

								<button className="bg-primary p-[0.4rem] rounded-xl">
									<HiSearch size={23} className="text-white" />
								</button>
							</div>
						</form>
					</div>

					{/* bottom nav  */}
					<div className="mt-2 border-y-2 border-y-white ">
						<div className="max-w-[1380px] mx-auto px-2 relative flex items-center justify-between w-full  whitespace-nowrap">
							{/* // dropdown for categories */}
							<div className="dropdown ">
								<button className="flex flex-col gap-0 px-5 mr-16 text-sm capitalize bg-white border-none max-lg:hidden btn btn-sm hover:bg-white text-primary cat-btn">
									Browse by Categories
								</button>

								<ul
									tabIndex={0}
									className={`dropdown-content transform -translate-x-[1%] min-h-fit w-fit  z-[10] px-4 py-6 bg-white shadow-md rounded-md`}
								>
									<h4 className="font-semibold whitespace-nowrap">Categories</h4>
									<ul className="flex flex-col menu max-h-full w-full z-[10] py-4 ">
										{filteredCategories?.allCat?.map((category) => (
											<NavLink to={`${Approutes.product.category}/${btoa(category.id)}`} key={category.id}>
												<li className="text-lg capitalize max-sm:text-base lg:pr-12 hover:underline whitespace-nowrap">
													{category.name}
												</li>
											</NavLink>
										))}
									</ul>
								</ul>
							</div>
							{/* bottom nav lists */}
							<ul className="flex items-center justify-between w-full">
								<li className="dropdown dropdown-hover">
									<a href={`${Approutes.product.category}/${btoa(50)}`} tabIndex={0} className={listStyles}>
										CARS & VEHICLES
									</a>
									<a href={`${Approutes.product.category}/${btoa(50)}`} className={mobileListStyles}>
										<FaCarSide size={25} />
									</a>
									{filteredCategories?.vehicleCat && (
										<CategoryDropdown
											category={'CARS & VEHICLES'}
											subCategories={filteredCategories?.vehicleCat}
										/>
									)}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-hover">
									<a href={`${Approutes.product.category}/${btoa(51)}`} tabIndex={0} className={listStyles}>
										PROPERTY
									</a>
									<a href={`${Approutes.product.category}/${btoa(51)}`} className={mobileListStyles}>
										<FaBuilding size={25} />
									</a>
									{filteredCategories?.propertyCat && (
										<CategoryDropdown category={'PROPERTY'} subCategories={filteredCategories?.propertyCat} />
									)}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-hover ">
									<a href={`${Approutes.product.category}/${btoa(52)}`} tabIndex={0} className={listStyles}>
										SERVICES
									</a>
									<a href={`${Approutes.product.category}/${btoa(52)}`} className={mobileListStyles}>
										<MdMiscellaneousServices size={25} />
									</a>
									{filteredCategories?.servicesCat && (
										<CategoryDropdown category={'SERVICES'} subCategories={filteredCategories?.servicesCat} />
									)}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-hover ">
									<a href={`${Approutes.product.category}/${btoa(53)}`} tabIndex={0} className={listStyles}>
										AGRICULTURE
									</a>
									<a href={`${Approutes.product.category}/${btoa(53)}`} className={mobileListStyles}>
										<FaRegHandshake size={25} />
									</a>
									{filteredCategories?.agricCat && (
										<CategoryDropdown category={'AGRICULTURE'} subCategories={filteredCategories?.agricCat} />
									)}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-hover mr-4">
									<a href={`${Approutes.product.category}/${btoa(54)}`} tabIndex={0} className={listStyles}>
										ELECTRONICS
									</a>
									<a href={`${Approutes.product.category}/${btoa(54)}`} className={mobileListStyles}>
										<VscGitPullRequestGoToChanges size={25} />
									</a>
									{filteredCategories?.electCat && (
										<CategoryDropdown category={'ELECTRONICS'} subCategories={filteredCategories?.electCat} />
									)}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;

const listStyles =
	'hidden md:block uppercase flex-grow-0 flex-shrink-0 cursor-pointer text-white text-sm md:text-base font-medium py-2 px-4  hover:text-secondary transition-colors ';

const mobileListStyles = 'text-white md:hidden cursor-pointer ';
