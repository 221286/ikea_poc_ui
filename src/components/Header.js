import { Link, useNavigate } from "react-router-dom";
import usePopover from "../hooks/usePopover";

import { UserOutlined } from "@ant-design/icons";

import fileSystemLogo from "../assets/logo.png";

const Header = () => {
  const { isPopoverOpen, togglePopover, popoverRef, triggerRef } = usePopover();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-10 py-2 border-b bg-primary-300 border-grey-200">
      {/* <div className="text-lg text-primary-950 lg:text-2xl">
        <h4>File System POC</h4>
      </div> */}
      <div className="block h-auto max-w-full w-28">
        {/* <Link to="/overview"> */}
        <img src={fileSystemLogo} alt="logo" />
        {/* </Link> */}
      </div>
      <div className="relative ml-3 md:ml-auto">
        <div>
          <button
            ref={triggerRef}
            type="button"
            className="relative flex items-center gap-3 border-none rounded-full focus:outline-none"
            id="user-menu-button"
            onClick={togglePopover}
            onMouseEnter={togglePopover}
          >
            <div className="w-full p-1 border rounded-full border-primary-950">
              <UserOutlined />
            </div>
            {/* <span className="font-semibold">
            {user?.firstName || user?.lastName
                ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`
                : "User"}
            </span> */}
            <svg
              className={`h-5 w-5 ${
                isPopoverOpen ? "rotate-180 transform" : "rotate-0 transform"
              } transition-transform duration-300 ease-in-out`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
        {isPopoverOpen && (
          <div
            ref={popoverRef}
            className="absolute right-0 z-[20] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <Link
              to={`/profile`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Your Profile
            </Link>
            <div
              onClick={handleSignOut}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              Sign out
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
