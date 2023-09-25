import Register from './Register';
import Login from './Login';

const DesktopView = () => {
	return (
		<div className="flex flex-col w-full lg:flex-row my-4 divide-x-4 ">
			<div className="w-full">
				<Register />
			</div>
			<div className="w-full">
				<Login />
			</div>
		</div>
	);
};

export default DesktopView;
