import Register from './Register';
import Login from './Login';

const DesktopView = () => {
    return (
        <div className="flex flex-col w-full lg:flex-row my-4 divide-x-4 ">
            <div className="w-full">
                <Register id={'desktop'} />
            </div>
            <div className="w-full">
                <Login id={'desktop'} />
            </div>
        </div>
    );
};

export default DesktopView;
