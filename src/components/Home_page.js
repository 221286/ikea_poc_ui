import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Dashboard from "./Dashboard";
import Home_Head_dropdown from "./Home_Head_dropdown";

const Home_page = ({ Token }) => {
  const [homeselection, sethomeselection] = useState("Home");
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const user_name = JSON.parse(localStorage.getItem("username"));
  //Retrieving the access token from the local storage
  const roles = JSON.parse(localStorage.getItem("roles"));

  useEffect(() => {
    handle_header_selection();

    //console.log(roles);
    //console.log(access_token);
    //Redirecting to login Page if access token is not found
    if (!access_token) {
      navigate("/login");
    }
  }, [][navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handle_header_selection = () => {
    switch (homeselection) {
      case "Home":
        break;
      case "Admin Page":
        navigate("/Bucket");
        break;
      case "Sign Out":
        navigate("/login");
        localStorage.clear();
        return;
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-yellow-400 ">
        <div className="flex items-center justify-between h-24 px-6 bg-blue-700 rounded-b-xl shadow-3xl ">
          <span className="flex items-center gap-4 font-extrabold text-yellow-400 text-7xl ">
            {" "}
            IKEA
          </span>
          <Home_Head_dropdown
            homeselection={homeselection}
            sethomeselection={sethomeselection}
          ></Home_Head_dropdown>
        </div>
        {/*
           <button 
                className="px-4 py-2 font-semibold text-white bg-blue-700 rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:border-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onClick={handleLogout}
            >
                Logout
                <div className='w-1/3 p-3 bg-yellow-800'><Barchart></Barchart> </div>
  </button>*/}

        <Outlet />
      </div>
    </>
  );
};

export default Home_page;
