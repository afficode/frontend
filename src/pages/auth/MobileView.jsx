'use client';
import React, { useState } from 'react';
import { Tabs,Banner } from 'flowbite-react';
import { MdAppRegistration, MdLogin } from 'react-icons/md';
import Register from './Register';

const MobileView = () => {
    const [tab, setTab] = useState(0);
    
  return (
    <div className="">
      <Tabs.Group
      aria-label="Full width tabs"
      style="fullWidth"
    >
      <Tabs.Item
        active
        icon={MdAppRegistration}
        title="Register"
      >
        <Register />
      </Tabs.Item>
      <Tabs.Item
        icon={MdLogin}
        title="Login"
      >
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Dashboard tab's associated content
          </span>
          .
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </p>
      </Tabs.Item>

    </Tabs.Group>

    
    </div>
  )
}

export default MobileView