import { Banner } from '../../components';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

const Auth = () => {
	return (
		<section className=" w-full m-auto py-4 xl:p-2 ">
			<Banner className="xl:my-2">
				<h4 className="text-center text-black text-2xl py-[0.2rem] font-bold">Welcome to Boonfu</h4>
			</Banner>
			<section className="hidden lg:flex">
				<DesktopView />
			</section>
			<section className=" md:flex flex lg:hidden ">
				<MobileView />
			</section>
		</section>
	);
};

export default Auth;
