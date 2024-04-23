import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup_Page = () => {
  const firstnameref=useRef();
  const lastnameref=useRef();
  const phoneref=useRef();
  const userref=useRef()
  const passref=useRef();
  const emailref=useRef();
  const consfirmpassref=useRef();
  const [message,getmessage]=useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
    const access_token=localStorage.getItem('access_token');
    if(access_token){
      navigate('/Home');
    }
  },[navigate]);
  const handle_Signup=async()=>{
    try{
      const Signupdata= {
        first_name: firstnameref.current.value,
        last_name: lastnameref.current.value,
        username: userref.current.value,
        password: passref.current.value,
        email: emailref.current.value,
        phone: phoneref.current.value
      };

     /*endpoint:54.198.138.169   */
     const response=await axios.post('http://54.198.138.169:7000/auth/register', Signupdata, {
     headers: {
     'accept': '*/*',
     'Content-Type': 'application/json'
     }
    })
    console.log(response.data.status);
    if(response.data.status===200){
navigate('/');
    }
    console.log(response.data.status);
    }catch(err){
      console.error(err);
    }

    


  }
  return (
    <div className='bg-yellow-400 min-h-screen flex flex-col justify-center items-center'>
    <div className="flex flex-col justify-center px-6 py-8 w-1/2 lg:px-8"> {/* Increased py value */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='text-9xl rounded-lg shadow-lg text-center font-extrabold tracking-wider text-blue-700 gap-6'>IKEA</h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to create account</h2>
      </div>
  
      <div className="mt-10 sm:mx-auto top-0 sm:w-full sm:max-w-sm">
        <form className="space-y-6 " onSubmit={(e)=>{

          e.preventDefault();
          if(passref.current.value===consfirmpassref.current.value){
            handle_Signup();
            getmessage(false);
          } else {
             getmessage(true);
          }
          
        }} action="#" method="POST">
          <div className="flex space-x-4">
            <div className='w-1/2'>
              <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-grey-900">First Name</label>
              <input id="first_name" ref={firstnameref} name="first_name" type="text" autoComplete="new-password" required className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            <div className='w-1/2'>
              <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-grey-900">Last Name</label>
              <input id="last_name" ref={lastnameref} name="last_name" type="text" autoComplete="new-password" required className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
  
          <div className="flex space-x-4">
            <div className='w-1/2'>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-grey-900">Username</label>
              <input id="username" ref={userref} name="username" type="text" autoComplete="new-password" required className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            <div className='w-1/2'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-grey-900">Email address</label>
              <input id="email" name="email" ref={emailref} type="email" autoComplete="email" required className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
  
          <div >
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-grey-900">Phone number</label>
            <input id="phone" name="phone" ref={phoneref} type="tel" autoComplete="tel" required className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
  
          <div className="flex space-x-4">
            <div className='w-1/2'>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <input id="password" name="password" ref={passref} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            <div className='w-1/2'>
              <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <input id="confirm_password" name="confirm_password" ref={consfirmpassref} type="password" autoComplete="new-password" required className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            
          </div>
          {message?(<span className='block text-lg font-medium leading-6 text-red-600'>Password does not match </span>):(<></>)}
  
          <div>
            <button type="submit" className="flex w-full focus:border-none justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
          </div>
        </form>
  
        <p className="mt-10 text-center text-sm text-gray-500">
          Already Signed Up ?
          <Link to={"/"} className="font-semibold leading-6 text-blue-700 hover:text-blue-500">Sign In</Link>
        </p>
      </div>
    </div>
  </div>
  
  )
}

export default Signup_Page
