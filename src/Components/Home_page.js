import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Dashboard from './Dashboard';

const Home_page = ({Token,}) => { 
const navigate=useNavigate();
const access_token= localStorage.getItem('access_token');
const user_name=JSON.parse(localStorage.getItem('username'))
useEffect(()=>{
//Retrieving the access token from the local storage

const roles=JSON.parse(localStorage.getItem('roles'));
//console.log(roles);
//console.log(access_token);
//Redirecting to login Page if access token is not found
if(!access_token){
 navigate('/');
                 }
                },[navigate]);

const handleLogout=()=>{
localStorage.clear();
navigate('/');
    
                 }

    

  return (
    <>
    <div className=" h-screen p-5 w-full bg-yellow-400">
      {/*
           <button 
                className="bg-blue-700 hover:bg-blue-500 focus:outline-none focus:border-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
                onClick={handleLogout}
            >
                Logout
                <div className='w-1/3 p-3 bg-yellow-800'><Barchart></Barchart> </div>
  </button>*/}
  <h1 className='text-4xl font-extrabold shadow-lg text-center'>Welcome to dashboard <span className='text-green-700'>{user_name?.toUpperCase()}</span> </h1>
  <Dashboard></Dashboard>
  
   
        </div>

    </>
  )
}

export default Home_page
