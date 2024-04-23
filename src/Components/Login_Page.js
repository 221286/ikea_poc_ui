import React, {  useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login_Page = () => {
  const emailref=useRef(null);
  const passwordref=useRef(null);
  const navigate= useNavigate();
  useEffect(()=>{
    //Retrieving the access Token
    const access_token=localStorage.getItem('access_token');
    if(access_token){
      navigate('/Home');
      return;
    }
    
  },[navigate])
 
  
 const Fetchuser=async()=>{
      try{
      const postData = {
      // Specify any data to be sent in the request body
      //'GodUser#123'
      //'god_user'
            
      username: emailref.current.value,
      password: passwordref.current.value
      };


      /* endpoint:54.198.138.169 */
      const response=await axios.post('http://54.198.138.169:7000/auth/login', postData, {
      headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
      }});
       // const response = await axios.get('http://54.198.138.169:7000/swagger-ui/index.html#/Profile%20Controller/minio');
        

      const {access_token,username}=response?.data?.data;
      localStorage.setItem('access_token',access_token);
      localStorage.setItem('roles',JSON.stringify(response?.data?.data?.roles[0]));
      localStorage.setItem('username',JSON.stringify(username));
      navigate('/Home');

      //console.log(data?.data[0]?.access_token);
    }catch(err){
      console.error(err);
    }

  }
  
  
  return (
    <div className='bg-yellow-400 min-h-screen flex flex-col justify-center items-center'>
  <div className="flex flex-col justify-center px-6 py-24 w-1/2 lg:px-8"> {/* Increased py value */}
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className='text-9xl rounded-lg shadow-lg text-center font-extrabold tracking-wider text-blue-700 gap-6'>IKEA</h1>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" onSubmit={(e)=>{
        e.preventDefault();
        Fetchuser();
      }} method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-grey-900">User Name</label>
          <div className="mt-2">
            <input id="email" ref={emailref} name="email" type="text" autoComplete="email" required className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> {/* Increased py value */}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-blue-700 hover:text-blue-500">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input id="password" name="password" ref={passwordref} type="password" autoComplete="current-password" required className="block w-full px-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> {/* Increased py value */}
          </div>
        </div>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button> {/* Increased py value */}
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <Link to={"/signup"} className="font-semibold leading-6 text-blue-700 hover:text-blue-500">Sign Up</Link>
      </p>
    </div>
  </div>
</div>

  
  )
}

export default Login_Page
