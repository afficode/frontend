import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Approutes } from '../../constants';
import useAuth from '../../context/UserContext';

const RequireAuth = () => {
	const { isLogin } = useAuth();
	const location = useLocation();

	return (
		<>
			{isLogin ? (
				<Outlet />
			) : (
				<Navigate to={Approutes.auth.initial} state={{ from: location }} replace />
			)}
		</>
	);
};

export default RequireAuth;
