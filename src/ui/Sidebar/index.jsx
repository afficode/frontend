"use client";

import { Sidebar } from "flowbite-react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { Approutes } from "../../constants";

const SidebarUI = ({ items }) => {
  console.log(items);
  return (
    <Sidebar
      aria-label="Sidebar for categories"
      className="min-h-[1000px] bg-black w-full tracking-tighter line-clamp-1"
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
                  <Sidebar.Item
                    href={`${Approutes.product.category}/${btoa(id)}`}
                    key={index}
                  >
                    {name}
                  </Sidebar.Item>
                  {items[`${id}`].map(({ id, name }, index) => (
                    <Sidebar.Item
                      href={`${Approutes.product.category}/${btoa(id)}`}
                      key={index}
                    >
                      {name}
                    </Sidebar.Item>
                  ))}
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
