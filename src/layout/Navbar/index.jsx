import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Approutes } from '../../constants/routes';
import { Dropdown } from '../../ui';
import { AffiLogo } from '../../assets/images';
import { generateCategoryUrl } from '../../utils';
import { useCategories } from '../../hooks';
import useAuth from '../../context/UserContext';

// icons
import { HiSearch, HiOutlineSpeakerphone } from 'react-icons/hi';
import { SlArrowRight } from 'react-icons/sl';
import { AiOutlineBell } from 'react-icons/ai';
import { BiEnvelope } from 'react-icons/bi';
import { GoBookmark } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { VscGitPullRequestGoToChanges, VscMenu } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { BsShop } from 'react-icons/bs';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FaCarSide, FaBuilding, FaRegHandshake } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const history = useNavigate();
	const navRef = useRef();
	// const navigate = useNavigate();

	const { isLogin, user } = useAuth();

	// fetch categories
	const { data } = useCategories();

	// console.log(data);

	// filter categories
	const filteredCategories = {
		allCat: [],
		vehicleCat: [],
		propertyCat: [],
		servicesCat: [],
		dealsCat: [],
	};

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
			} else if (item.id >= 6500 && item.id < 6600) {
				filteredCategories.dealsCat.push(item);
			}
		});
	}
	const { pathname } = useLocation();
	const handleSearch = useDebouncedCallback((query) => {
		console.log(pathname);
		if (query) {
			history.push({
				q: query,
			});
		} else {
			// delete the query from the params
		}
	}, 500);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (navRef.current && !navRef.current.contains(e.target)) {
				setNav(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setNav]);

	return (
		<header className="fixed top-0 z-50 w-full bg-primary">
			<nav className="relative ">
				<div className="w-full pt-3 ">
					{/* top nav  */}
					<div className="max-w-[1380px] mx-auto px-2 flex items-center justify-between ">
						{/* logo */}
						<div className="flex items-center bg-white rounded-full p-[2px]">
							<NavLink to={'/'}>
								<img src={AffiLogo} className="w-9 h-9" alt="Boonfu.ng" />
							</NavLink>
						</div>

						{/* <!-- Search input on desktop screen --> */}
						<div className="items-center justify-between hidden lg:flex">
							<div className="w-full px-10 mx-auto ">
								<div className="relative ">
									<input
										title="Search for items here."
										type="text"
										className="w-full lg:w-[32rem] xl:w-[40rem] py-2 pl-4 pr-[12rem] text-black bg-white border border-transparent rounded-3xl  focus:border-secondary outline-none focus:ring focus:ring-opacity-10 focus:ring-secondary"
										placeholder="Searching for?....."
										onChange={(e) => {
											handleSearch(e.target.value);
										}}
									/>

									<span className="absolute inset-y-0 right-0 flex items-center pr-3">
										<span className="mr-10 border-l-4 border-l-primary">
											<span className="ml-4 text-sm lg:text-base">Nigeria</span>
										</span>

										<span className="bg-primary p-[0.4rem] rounded-xl">
											<HiSearch size={23} className="text-white" />
										</span>
									</span>
								</div>
							</div>
						</div>

						{/* top nav items */}
						<div className="flex items-center gap-2 lg:gap-3">
							<Link to={Approutes.profile.saved}>
								<div
									className="flex flex-col items-center text-white cursor-pointer max-md:hidden "
									title="Saved items"
								>
									<GoBookmark size={25} />
									<span className="text-xs sm:text-sm">Saved</span>
								</div>
							</Link>
							{isLogin && (
								<Link to={Approutes.profile.notifications}>
									<div
										className="flex flex-col items-center text-white cursor-pointer "
										title="My Notifications"
									>
										<AiOutlineBell size={25} />
										<span className="text-xs sm:text-sm">Notifications</span>
									</div>
								</Link>
							)}

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
											className="flex flex-col items-center text-white cursor-pointer max-md:hidden"
											title="My messages"
										>
											<BiEnvelope size={25} />
											<span className="text-xs sm:text-sm whitespace-nowrap">Messages</span>
										</div>
									</Link>
									<div className="dropdown dropdown-hover">
										<Link to={Approutes.profile.initial}>
											<div
												tabIndex={0}
												className="flex flex-col items-center text-white cursor-pointer"
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
												<NavLink to={Approutes.profile.details}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Details</li>
													</div>
												</NavLink>
												<NavLink to={Approutes.profile.messages}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Messages</li>
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Shop</li>
													</div>
												</NavLink>
												<NavLink to={'#'}>
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
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Manage my Ads</li>
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
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
							{pathname === '/' ? (
								<div className="dropdown dropdown-end">
									<button className="flex flex-col gap-0  py-0 capitalize bg-white border-none max-sm:text-xs lg:hidden btn btn-sm text-primary px-4 hover:bg-white">
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
									<button onClick={() => setNav(!nav)} className="text-white cursor-pointer ml-2 lg:hidden ">
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
												<NavLink to={Approutes.profile.details}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Details</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={Approutes.profile.messages}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Messages</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Shop</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
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
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Manage my Ads</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
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
					<div className="flex items-center w-full mt-2 lg:hidden px-1">
						<div className="relative w-full">
							<input
								title="Search for items here."
								type="text"
								className="w-full py-2 pl-4 pr-[12rem] text-black bg-white border border-transparent rounded-3xl  focus:border-secondary outline-none focus:ring focus:ring-opacity-10 focus:ring-secondary"
								placeholder="Searching for?....."
								onChange={(e) => {
									handleSearch(e.target.value);
								}}
							/>

							<span className="absolute inset-y-0 right-0 flex items-center pr-3">
								<span className="mr-10 border-l-4 border-l-primary">
									<span className="ml-4 text-sm">Nigeria</span>
								</span>

								<span className="bg-primary p-[0.4rem] rounded-xl">
									<HiSearch size={23} className="text-white" />
								</span>
							</span>
						</div>
					</div>

					{/* bottom nav  */}
					<div className="mt-2 border-y-2 border-y-white ">
						<div className="max-w-[1380px] mx-auto px-2 relative flex items-center justify-between w-full  whitespace-nowrap  ">
							{pathname === '/' ? (
								// dropdown for categories
								<div className="dropdown ">
									<button className="flex flex-col gap-0 mr-16 text-sm capitalize bg-white border-none max-lg:hidden btn btn-sm hover:bg-white text-primary px-5 cat-btn">
										Categories
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
							) : (
								//dropdown for menu
								<div className="dropdown">
									<div tabIndex={0} className="mr-16 text-white cursor-pointer max-lg:hidden">
										<VscMenu size={30} />
									</div>
									<ul
										tabIndex={0}
										className={`dropdown-content transform -translate-x-[5%] min-h-fit w-[20rem]  z-[10] p-4 bg-white shadow-md rounded-2xl`}
									>
										<ul className="flex flex-col gap-[0.4rem] menu max-h-full w-full z-[10] ">
											<NavLink to={Approutes.home}>
												<li className="text-lg capitalize max-sm:text-base lg:pr-12 hover:underline whitespace-nowrap">
													HOME
												</li>
											</NavLink>
											<NavLink to={Approutes.dashboard.initial}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Dashboard</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={Approutes.profile.details}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Details</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={Approutes.profile.messages}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Messages</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Shop</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Grab</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											{/* <NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Transactions</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink> */}
											<NavLink to={Approutes.profile.notifications}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Notifications</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Manage my Ads</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Manage my shop</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={Approutes.profile.saved}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Saved Items</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>

											<NavLink to={Approutes.profile.adverts}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Adverts</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={Approutes.contactUs}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Help & Contact</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											{isLogin && (
												<NavLink to={Approutes.logout}>
													<div className="flex items-center hover:underline">
														<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Logout</li>
													</div>
												</NavLink>
											)}
										</ul>
									</ul>
								</div>
							)}

							{/* bottom nav lists */}
							<ul className="flex items-center justify-between w-full">
								<li className={`${listStyles}`} title="Click to set up a shop">
									SET UP A SHOP
								</li>
								<li className={mobileListStyles} title="Click to set up a shop">
									<BsShop size={25} />
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-hover">
									<a href={`${Approutes.product.category}/${btoa(50)}`} tabIndex={0} className={listStyles}>
										CARS & VEHICLES
									</a>
									<a href={`${Approutes.product.category}/${btoa(50)}`} className={mobileListStyles}>
										<FaCarSide size={25} />
									</a>
									{filteredCategories?.vehicleCat && (
										<Dropdown category={'CARS & VEHICLES'} subCategories={filteredCategories?.vehicleCat} />
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
										<Dropdown category={'PROPERTY'} subCategories={filteredCategories?.propertyCat} />
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
										<Dropdown category={'SERVICES'} subCategories={filteredCategories?.servicesCat} />
									)}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-end dropdown-hover">
									<NavLink to={generateCategoryUrl('Deals')} tabIndex={0} className={listStyles}>
										DEALS
									</NavLink>
									<NavLink to={generateCategoryUrl('Deals')} className={mobileListStyles}>
										<FaRegHandshake size={25} />
									</NavLink>
									{filteredCategories?.dealsCat && (
										<Dropdown category={'DEALS'} subCategories={filteredCategories?.dealsCat} />
									)}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-end dropdown-hover mr-4">
									<NavLink to={generateCategoryUrl('Requests')} tabIndex={0} className={listStyles}>
										REQUESTS
									</NavLink>
									<NavLink to={generateCategoryUrl('Deals')} className={mobileListStyles}>
										<VscGitPullRequestGoToChanges size={25} />
									</NavLink>
									{filteredCategories?.dealsCat && (
										<Dropdown category={'REQUESTS'} subCategories={filteredCategories?.dealsCat} />
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
