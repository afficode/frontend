import { Tabs } from 'flowbite-react';
import { MdAppRegistration, MdLogin } from 'react-icons/md';
import Register from './Register';
import Login from './Login';

const MobileView = () => {
    return (
        <div className="w-full">
            <Tabs.Group aria-label="Full width tabs" style="fullWidth">
                <Tabs.Item active icon={MdAppRegistration} title="Register">
                    <Register id={'mobile'} />
                </Tabs.Item>
                <Tabs.Item icon={MdLogin} title="Login">
                    <Login id={'mobile'} />
                </Tabs.Item>
            </Tabs.Group>
        </div>
    );
};

export default MobileView;
