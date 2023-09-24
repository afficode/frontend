"use client";
import React, { useState } from "react";
import { Tabs, Banner } from "flowbite-react";
import { MdAppRegistration, MdLogin } from "react-icons/md";
import Register from "./Register";
import Login from "./Login";

const MobileView = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="w-full">
      <Tabs.Group aria-label="Full width tabs" style="fullWidth">
        <Tabs.Item active icon={MdAppRegistration} title="Register">
          <Register />
        </Tabs.Item>
        <Tabs.Item icon={MdLogin} title="Login">
          <Login />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default MobileView;
