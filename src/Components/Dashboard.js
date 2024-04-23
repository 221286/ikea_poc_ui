import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Barchart from './Barchart';
import Pie_chart from './Pie_chart';
const Dashboard = () => {
    const [dashboarddata,setdashboarddata]=useState([]);
    const [user,getuser]=useState(" ");
    const user_name=JSON.parse(localStorage.getItem('username'))?.toUpperCase();
    const access_token=localStorage.getItem('access_token');
    const headers={
        "Accept":"*/*",
        "Authorization":` Bearer ${access_token}`
    }
    useEffect(()=>{
    
    getuser(user_name);
    fetchBucketdetails();
    },[])
    const fetchBucketdetails=async()=>{
    try{
    const response=await axios.get('http://54.198.138.169:7000/bucket/dashboard',{headers});
    setdashboarddata(response?.data?.data);
    }catch(err){
        console.log(err);
    } 
    };  
    
return (
    <>
    {dashboarddata.map((content)=>{
        const {data_by_content_size,data_by_content_type,bucket_name,total_data_stored}=content;
        return (<div className='w-full p-4 rounded-2xl shadow-2xl   bg-white m-5 ' key={bucket_name}>
            <h1 className='text-4xl text-center font-extrabold'>{bucket_name?.toUpperCase()}</h1>
               {
               <div className='flex justify-between '>
               <Barchart data_by_content_size={data_by_content_size}></Barchart> 
               <Pie_chart data_by_content_type={data_by_content_type}></Pie_chart>
               
               
    </div> } 
    <h1 className='text-xl text-center font-extrabold'>Total Data Stored: {total_data_stored}</h1>
        </div>)
    })}
     
    </>
  )
}

export default Dashboard


/**{(<h2 className='text-5xl font-extrabold  mb-4' >Hello  <span className='text-green-800 font-extrabold'>{user}!!!</span>  </h2>)}
      <div className='w-screen border-green-800  pt-2 rounded-lg shadow-2xl'>
      
         <h2 className='text-4xl font-bold my-4 text-center mx-2'>BUCKET DETAILS</h2>
         <div className='flex justify-between  flex-col flex-wrap w-full px-28'>{dashboarddata.map(content=>{
            const {bucket_name,data_by_content_size,data_by_content_type}=content;
            return ( <div className=' p-2  w-full  rounded-xl shadow-xl hover:cursor-pointer bg-yellow-800 my-4 mx-2 '>
            <h3 className='hover:text-green-300 font-bold text-center block text-2xl underline' key={bucket_name}>
                
                
                {bucket_name?.toUpperCase()}</h3>
                <span className='underline font-bold text-xl'>Data by content size</span>
                <ul className='block font-medium text-xl'>
                    {data_by_content_size.map((type)=>{
                        const {group,usage}=type;
                        return (<li key={usage}>{group}</li>)
                    })}</ul>
                    <span className='underline font-bold text-xl'>Data by content size</span>
                <ul className='block font-medium text-xl'>
                    {data_by_content_type.map((type)=>{
                        const {group,usage,files}=type;
                        return (<> <li key={usage}>{group}</li> 
                        {files.map((file)=>{
                            const {id,name,content_size,content_type,created_at}=file;
                            return(<div key={id}><h1 className='underline text-yellow-200' >{name}</h1>
                            <h1  >{content_size}</h1>
                            <h1 >{created_at}</h1>
                            <h1>{content_type}</h1>
                            </div>)
                        })}
                        </>)
                    })}
                    
                </ul>

            </div>)
         })}</div> 
         
      
      <h3 className='text=xl font-extralight my-4'></h3>
      
        </div> */