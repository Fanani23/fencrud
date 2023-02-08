import { Menu } from "@headlessui/react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const DropdownNavbar = ({ label, showCollapse, size, ...props }) => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`${
              open ? "bg-primary-500 " : ""
            }rounded-lg px-3 py-2 flex flex-col sm:flex-row items-center hover:bg-primary-500`}
          >
            {label}
            {showCollapse ? (
              open ? (
                <>
                  <MdExpandLess className="text-2xl hidden sm:block relative z-20" />
                </>
              ) : (
                <>
                  <MdExpandMore className="text-2xl hidden sm:block relative z-20" />
                </>
              )
            ) : (
              ""
            )}
          </Menu.Button>
          <Menu.Items
            className={`${
              size === "sm" ? "w-[100px] " : size === "md" ? "w-[200px] " : ""
            } absolute origin-top-right right-0 mt-1 bg-white rounded-lg py-1 shadow-lg`}
          >
            {props.children}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export default DropdownNavbar;
