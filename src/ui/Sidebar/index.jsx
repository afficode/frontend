"use client";

import { Flowbite, Sidebar } from "flowbite-react";
import { useEffect } from "react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

const SidebarUI = ({ items }) => {
  return (
    <Sidebar
      aria-label="Sidebar for categories"
      className="min-h-[1000px] bg-black w-full"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {items?.null.map(({ id, name }, index) => (
            <>
              {" "}
              {Array.isArray(items[`${id}`]) ? (
                <Sidebar.Collapse
                  key={index}
                  label={`${name}`}
                  renderChevronIcon={(theme, open) => {
                    const IconComponent = open
                      ? HiOutlineMinusSm
                      : HiOutlinePlusSm;

                    return (
                      <IconComponent
                        key={index}
                        aria-hidden
                        className={twMerge(
                          theme.label.icon.open[open ? "on" : "off"]
                        )}
                      />
                    );
                  }}
                >
                  {items[`${id}`].map(({ id, name }, index) => (
                    <Sidebar.Item href="#" key={index}>
                      {name}
                    </Sidebar.Item>
                  ))}
                  <Sidebar.Item href="#">Sales</Sidebar.Item>
                  <Sidebar.Item href="#">Refunds</Sidebar.Item>
                  <Sidebar.Item href="#">Shipping</Sidebar.Item>
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item href="#">{`${name}`}</Sidebar.Item>
              )}
            </>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarUI;
