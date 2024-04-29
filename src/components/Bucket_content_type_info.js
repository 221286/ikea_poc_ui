import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BasicTable from './Tabledatas';

const Bucket_content_type_info = () => {
    const params= useParams();
    const {bucketname}=params; 
    const [data,setdata]=useState([]);
    useEffect(()=>{
       fetchbucketdata();
    },[])

    const access_token=(localStorage.getItem('access_token'))
    const headers={
        "Accept": '*/*',
        "Authorization":`Bearer ${access_token}`

    }
    const URL=`http://54.198.138.169:7000/bucket/${bucketname}/dashboard`;
    const fetchbucketdata=async()=>{
        try{
         const response= await axios.get(URL,{headers});
         setdata(response?.data?.data.data_by_content_type);

        } catch(err){
         console.log(err);
        }
    } 
    const get=(data?.map((content)=>{
        const {files}=content;
        return files;
            

        
      }))?.flat();
  return (
    <div>
      <BasicTable get={get}></BasicTable>
      
    </div>
  )
}

export default Bucket_content_type_info
