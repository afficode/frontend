import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-3">
            <h1 className="text-primary font-bold">Page not found</h1>
            <p className="font-semibold ">
				Click here to go home{' '}
                <Link to={'/'} className="text-secondary font-bold underline">
					Boonfu
                </Link>
            </p>
        </div>
    );
};

export default PageNotFound;
