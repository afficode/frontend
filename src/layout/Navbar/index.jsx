import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Approutes } from '../../constants/routes';
import { Dropdown } from '../../ui';
import { AffiLogo } from '../../assets/images';
import { generateCategoryUrl } from '../../utils';
import { useCategories } from '../../hooks';

// icons
import { HiSearch, HiOutlineSpeakerphone, HiBookmark } from 'react-icons/hi';
import { SlArrowRight } from 'react-icons/sl';
import { BiEnvelope } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { VscMenu } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { BsShop } from 'react-icons/bs';
import { MdMiscellaneousServices } from 'react-icons/md';
import { TbMoneybag } from 'react-icons/tb';
import { FaCarSide, FaBuilding } from 'react-icons/fa';

const Navbar = () => {
	const [nav, setNav] = useState(false);

	const { data } = useCategories();

	const allCat = data?.filter((data) => data.id >= 10 && data.id < 100);
	const vehicleCat = data?.filter((data) => data.id >= 5000 && data.id < 5100);
	const propertyCat = data?.filter((data) => data.id >= 5100 && data.id < 5200);
	const servicesCat = data?.filter((data) => data.id >= 5200 && data.id < 5300);
	const dealsCat = data?.filter((data) => data.id >= 6500 && data.id < 6600);

	allCat && console.log(allCat);

	const navRef = useRef();

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

	const { pathname } = useLocation();

	const authenticated = false;

	return (
		<header className="fixed top-0 z-50 w-full bg-blue">
			<nav className="relative ">
				<div className="w-full pt-3 ">
					{/* top nav  */}
					<div className="max-w-[1380px] mx-auto px-2 flex items-center justify-between ">
						{/* logo */}
						<div className="flex items-center bg-white rounded-full p-[2px]">
							<NavLink to={'/'}>
								<img src={AffiLogo} className="w-9 h-9" alt="" />
							</NavLink>
						</div>

						{/* <!-- Search input on desktop screen --> */}
						<div className="items-center justify-between hidden md:flex">
							<div className="w-full px-10 mx-auto ">
								<div className="relative ">
									<input
										title="Search for items here."
										type="text"
										className="w-full lg:w-[32rem] xl:w-[40rem] py-2 pl-4 pr-[12rem] text-black bg-white border border-transparent rounded-3xl  focus:border-yellow outline-none focus:ring focus:ring-opacity-10 focus:ring-yellow"
										placeholder="Searching for?....."
									/>

									<span className="absolute inset-y-0 right-0 flex items-center pr-3">
										<span className="mr-10 border-l-4 border-l-blue">
											<span className="ml-4 text-sm lg:text-base">Nigeria</span>
										</span>

										<span className="bg-blue hover:bg-blue/80 p-[0.4rem] rounded-xl cursor-pointer">
											<HiSearch size={23} className="text-white" />
										</span>
									</span>
								</div>
							</div>
						</div>

						{/* top nav items */}
						<div className="flex items-center gap-2  md:gap-4">
							<div
								className="flex flex-col items-center text-white cursor-pointer max-md:hidden "
								title="Saved items"
							>
								<HiBookmark size={25} />
								<span className="text-xs sm:text-sm">Saved</span>
							</div>

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
										{allCat?.map((category) => (
											<NavLink to={''} key={category.id}>
												<li className="text-lg capitalize max-sm:text-base lg:pr-12 hover:underline whitespace-nowrap">
													{category.name}
												</li>
											</NavLink>
										))}
									</ul>
								</ul>
							</div>

							{!authenticated ? (
								<div
									className="flex flex-col items-center text-white cursor-pointer"
									title="Click to sign-in or register"
								>
									<CgProfile size={25} />
									<span className="text-xs whitespace-nowrap sm:text-sm">Sign-In</span>
								</div>
							) : (
								<>
									<div
										className="flex flex-col items-center text-white cursor-pointer max-md:hidden"
										title="My messages"
									>
										<BiEnvelope size={25} />
										<span className="text-xs sm:text-sm whitespace-nowrap">Messages</span>
									</div>
									<div className="flex flex-col items-center text-white cursor-pointer" title="My profile">
										<CgProfile size={25} />
										<span className="text-xs sm:text-sm whitespace-nowrap">Gideon</span>
									</div>
								</>
							)}

							{/* mobile categories/menu dropdown */}
							{pathname === '/' ? (
								<div className="dropdown dropdown-end">
									<button className="flex flex-col gap-0 px-2 py-0 capitalize bg-white border-none max-sm:text-xs md:hidden btn btn-sm text-blue px-4 hover:bg-white">
										Categories
									</button>
									<ul
										tabIndex={0}
										className={`dropdown-content min-h-fit w-fit z-[10] px-4 py-6 bg-white shadow-md rounded-md`}
									>
										<h3 className="font-semibold max-lg:text-xl whitespace-nowrap">Categories</h3>
										<ul className="flex flex-col menu max-h-full w-full z-[10] py-4 ">
											{allCat &&
												allCat?.map((category) => (
													<NavLink to={generateCategoryUrl(category.name)} key={category.id}>
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
									<div className="text-white cursor-pointer md:hidden ">
										<VscMenu size={28} onClick={() => setNav(!nav)} />
									</div>

									<div
										className={
											nav
												? ` transform translate-x-[0%] w-full h-full transition-all duration-500 fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-10 grid place-items-end`
												: ` transform translate-x-[100%] transition-all duration-500 fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-10 grid place-items-end`
										}
									>
										<div ref={navRef} className="w-[70%] h-full bg-white p-4 flex flex-col gap-[3rem] ">
											<IoMdClose
												size={28}
												className="ml-auto cursor-pointer lg:hidden "
												onClick={() => setNav(!nav)}
											/>
											<ul className="flex flex-col gap-4 self-start max-h-full w-full z-[10] ">
												<NavLink to={'/'}>
													<li className="text-base capitalize hover:underline whitespace-nowrap">HOME</li>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Dashboard</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Details</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
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
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Transactions</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
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
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">My Saved Items</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={Approutes.contactUs}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Help & Contact</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
												<NavLink to={'#'}>
													<div className="flex items-center hover:underline">
														<li className="text-base whitespace-nowrap ">Logout</li>
														<SlArrowRight size={20} className="ml-auto text-black " />
													</div>
												</NavLink>
											</ul>
										</div>
									</div>
								</>
							)}
						</div>
					</div>

					{/* <!-- Mobile search input --> */}
					<div className="flex items-center w-full mt-2 md:hidden px-1">
						<div className="relative w-full">
							<input
								title="Search for items here."
								type="text"
								className="w-full py-2 pl-4 pr-[12rem] text-black bg-white border border-transparent rounded-3xl  focus:border-yellow outline-none focus:ring focus:ring-opacity-10 focus:ring-yellow"
								placeholder="Searching for?....."
							/>

							<span className="absolute inset-y-0 right-0 flex items-center pr-3">
								<span className="mr-10 border-l-4 border-l-blue">
									<span className="ml-4 text-sm">Nigeria</span>
								</span>

								<span className="bg-blue hover:bg-blue/80 cursor-pointer p-[0.4rem] rounded-xl">
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
									<button className="flex flex-col gap-0 mr-16 text-sm capitalize bg-white border-none max-md:hidden btn btn-sm hover:bg-white text-blue px-5 cat-btn">
										Categories
									</button>

									<ul
										tabIndex={0}
										className={`dropdown-content transform -translate-x-[1%] min-h-fit w-fit  z-[10] px-4 py-6 bg-white shadow-md rounded-md`}
									>
										<h4 className="font-semibold whitespace-nowrap">Categories</h4>
										<ul className="flex flex-col menu max-h-full w-full z-[10] py-4 ">
											{allCat?.map((category) => (
												<NavLink to={generateCategoryUrl(category.name)} key={category.id}>
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
									<div tabIndex={0} className="mr-16 text-white cursor-pointer max-md:hidden">
										<VscMenu size={30} />
									</div>
									<ul
										tabIndex={0}
										className={`dropdown-content transform -translate-x-[5%] min-h-fit w-[20rem]  z-[10] p-4 bg-white shadow-md rounded-2xl`}
									>
										<ul className="flex flex-col gap-[0.4rem] menu max-h-full w-full z-[10] ">
											<NavLink to={'/'}>
												<li className="text-lg capitalize max-sm:text-base lg:pr-12 hover:underline whitespace-nowrap">
													HOME
												</li>
											</NavLink>
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Dashboard</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Details</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
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
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Transactions</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
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
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">My Saved Items</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={Approutes.contactUs}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Help & Contact</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
											<NavLink to={'#'}>
												<div className="flex items-center hover:underline">
													<li className="text-lg max-sm:text-base -12 whitespace-nowrap ">Logout</li>
													<SlArrowRight size={20} className="ml-auto text-black " />
												</div>
											</NavLink>
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
									<NavLink to={generateCategoryUrl('Vehicles')} tabIndex={0} className={listStyles}>
										VEHICLES
									</NavLink>
									<NavLink to={generateCategoryUrl('Vehicles')} className={mobileListStyles}>
										<FaCarSide size={25} />
									</NavLink>
									{vehicleCat && <Dropdown category={'VEHICLES'} subCategories={vehicleCat} />}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-hover">
									<NavLink to={generateCategoryUrl('Property')} tabIndex={0} className={listStyles}>
										PROPERTY
									</NavLink>
									<NavLink to={generateCategoryUrl('Property')} className={mobileListStyles}>
										<FaBuilding size={25} />
									</NavLink>
									{propertyCat && <Dropdown category={'PROPERTY'} subCategories={propertyCat} />}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-hover ">
									<NavLink to={generateCategoryUrl('Services')} tabIndex={0} className={listStyles}>
										SERVICES
									</NavLink>
									<NavLink to={generateCategoryUrl('Services')} className={mobileListStyles}>
										<MdMiscellaneousServices size={25} />
									</NavLink>
									{servicesCat && <Dropdown category={'SERVICES'} subCategories={servicesCat} />}
								</li>

								<span className="border border-r-4 border-white h-[2rem]" />

								<li className="dropdown dropdown-end dropdown-hover mr-4">
									<NavLink to={generateCategoryUrl('Deals')} tabIndex={0} className={listStyles}>
										DEALS
									</NavLink>
									<NavLink to={generateCategoryUrl('Deals')} className={mobileListStyles}>
										<TbMoneybag size={25} />
									</NavLink>
									{dealsCat && <Dropdown category={'DEALS'} subCategories={dealsCat} />}
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
	'hidden sm:block uppercase flex-grow-0 flex-shrink-0 cursor-pointer text-white text-sm md:text-base font-medium py-2 px-4  hover:text-yellow transition-colors ';

const mobileListStyles = 'text-white sm:hidden cursor-pointer ';
