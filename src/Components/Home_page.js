import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router';
import Dashboard from './Dashboard';
import Home_Head_dropdown from './Home_Head_dropdown';

const Home_page = ({Token,}) => { 
const [homeselection,sethomeselection] =useState("Home");
const navigate=useNavigate();
const access_token= localStorage.getItem('access_token');
const user_name=JSON.parse(localStorage.getItem('username'))
//Retrieving the access token from the local storage
const roles=JSON.parse(localStorage.getItem('roles'));


useEffect(()=>{
  handle_header_selection();

//console.log(roles);
//console.log(access_token);
//Redirecting to login Page if access token is not found
if(!access_token){
 navigate('/Login');
                 }

                },[][navigate]);

const handleLogout=()=>{
localStorage.clear();
navigate('/Login');
    
                 }

const handle_header_selection=()=>{
switch(homeselection){
  case "Home":
    break;
  case "Admin Page":
  navigate("/Bucket");
  break;
  case "Sign Out":
    navigate('/Login');
    localStorage.clear();
    return;
    break;
  default:
  break;
    
  
                      
  }
}    

  return (
    <>
    <div className=" h-screen  w-full bg-yellow-400">
    <div className='bg-blue-700 h-24 rounded-b-xl shadow-3xl flex justify-between items-center px-6 '>
     <span className='flex items-center text-yellow-400 text-7xl font-extrabold gap-4  '> IKEA</span>
     <Home_Head_dropdown homeselection={homeselection} sethomeselection={sethomeselection}></Home_Head_dropdown>
     </div>
      {/*
           <button 
                className="bg-blue-700 hover:bg-blue-500 focus:outline-none focus:border-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
                onClick={handleLogout}
            >
                Logout
                <div className='w-1/3 p-3 bg-yellow-800'><Barchart></Barchart> </div>
  </button>*/}
  
  
   <Outlet/>
        </div>

    </>
  )
}

export default Home_page
