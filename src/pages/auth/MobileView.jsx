import { MdAppRegistration, MdLogin } from 'react-icons/md';
import Register from './Register';
import Login from './Login';
import { useState } from 'react';

const MobileView = () => {
    const [view, setView] = useState('register');

    return (
        <div className="w-full">
            <div className="bg-primary flex items-center p-1 mb-6">
                <button
                    className={
                        view === 'register'
                            ? 'flex items-center justify-center gap-2 font-semibold p-4 bg-primary w-full text-white'
                            : 'flex items-center justify-center gap-2 font-semibold p-4 w-full bg-gray-200'
                    }
                    onClick={() => setView('register')}
                >
                    <MdAppRegistration /> Register
                </button>
                <button
                    className={
                        view === 'login'
                            ? 'flex items-center justify-center gap-2 font-semibold p-4 bg-primary w-full text-white'
                            : 'flex items-center justify-center gap-2 font-semibold p-4 w-full bg-gray-200'
                    }
                    onClick={() => setView('login')}
                >
                    <MdLogin /> Login
                </button>
            </div>

            <div>{view === 'login' ? <Login /> : <Register />}</div>
        </div>
    );
};

export default MobileView;
