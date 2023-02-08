import { useNavigate, useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import assets from "../../assets";
import { useEffect, useState } from "react";
import axios from "axios";
import DropdownNavbar from "../DropdownNavbar";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const profile = localStorage.getItem("photo");

  return (
    <>
      <nav className="fixed left-0 right-0 h-20 flex flex-row bg-orange-400 text-white z-50">
        <div className="flex flex-row justify-between items-center p-3 group bg-orange-400 min-w-fit md:w-60 lg:min-w-[270px]">
          <div type="button" onClick={() => navigate("/main")}>
            <img src={assets.logoSplash} alt="" className="hidden  md:block" />
          </div>
          <button
            className="hover:bg-slate-500 px-3 py-3.5 rounded-lg"
            onClick={toggleSidebar}
          >
            <MdMenu className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-row justify-end sm:justify-between items-center p-3 w-full">
          <h1 className="font-noto-sans text-xl font-semibold hidden sm:block">
            {location === "/" ? "Main" : capitalize(location.replace("/", ""))}
          </h1>
          <div className="flex flex-row items-center space-x-3">
            <DropdownNavbar
              showCollapse="true"
              size="sm"
              label={
                <>
                  {profile ? (
                    <img
                      src={profile}
                      alt="profile"
                      className="rounded-full mr-0 mx-auto sm:mr-5 relative z-20 group-active:shadow-md h-[50px] w-[50px]"
                    />
                  ) : (
                    <img
                      src="https://dummyimage.com/35/ffffff/000000.png&text=profile"
                      alt="profile"
                      className="rounded-full mr-0 mx-auto sm:mr-5 relative z-20 group-active:shadow-md"
                    />
                  )}
                </>
              }
            >
              {location === "/main" ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="hover:bg-primary-500 hover:text-white w-full text-black text-center px-3 py-2"
                >
                  Profile
                </button>
              ) : (
                <button
                  onClick={() => navigate("/main")}
                  className="hover:bg-primary-500 hover:text-white w-full text-black text-center px-3 py-2"
                >
                  Main
                </button>
              )}
              <button
                onClick={handleLogout}
                className="hover:bg-primary-500 hover:text-white w-full text-black text-center px-3 py-2"
              >
                Log Out
              </button>
            </DropdownNavbar>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
