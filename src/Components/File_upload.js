import React, { useRef, useState } from 'react';
import mc from '../utils/mc';
import axios from 'axios';
let fileReaderStream = require('filereader-stream')

const File_upload = () => {
    const [file, setFile] = useState(null);
    const Bucketnameref=useRef(null);
    const access_token=localStorage.getItem('access_token');
    const [uploadsuccess,setuploadsucces]=useState("");
    


    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };
    
    const API_header={
      'Accept': '*/*',
      'Authorization': `Bearer ${access_token}` 
  }
    const handleSubmit= (e)=>{
    e.preventDefault();
    const data={
      bucket_name:Bucketnameref.current.value,
      file_name:file.name
    }
    const API_URL=`http://54.198.138.169:7000/file/add?bucket_name=${Bucketnameref.current.value}&file_name=${file.name}`;
   // console.log(Bucketnameref.current.value,file.name)
    //axios.put(API_URL,data,{headers: API_header}).then(res=>{console.log(res)}).catch(err=>{console.error(err)});
    File_upload();   

    }

    const File_upload=async()=>{
      const metaData = {
        'Content-Type': file.type,
        "X-Amz-Meta-App": "SPH-REACT-JS"
      }
      const readStream = fileReaderStream(file );
      
        try{

          const data={
            bucket_name:Bucketnameref.current.value,
            file_name:file.name
          }
          const API_URL=`http://54.198.138.169:7000/file/add?bucket_name=${Bucketnameref.current.value}&file_name=${file.name}`;
         

       mc.putObject(Bucketnameref.current.value,file.name,readStream,metaData,function(err,response){
            if(err){
              setuploadsucces("ERROR IN UPLOADING THE FILE TO MINIO")
            } else{
              
              axios.put(API_URL,data,{headers: API_header}).then(res=>{
                if(res?.data?.status===200){
                  setuploadsucces("FILE UPLOADED SUCCESSFULLY");
                }
                }).catch((err)=>{setuploadsucces("ERROR IN UPLOADING THE DATA IN BUCKET")});

            }
          })
        }catch(err){
          console.log(err);
        }
      
      
    }
    return (
      <div className='w-full flex items-center justify-center' >

<div className='w-1/3  ' >
<h1 className='text-5xl font-extrabold text-center border border-black shadow-xl rounded-xl my-10'>File Upload</h1>

            <form onSubmit={handleSubmit} >
            <label htmlFor="bucket_name" className="block text-sm font-medium leading-6 text-grey-900">Bucket Name<span className='text-green-700 font-bold'> {"(Only Admin can Upload)"}</span></label>
            <div className='my-4'>
            <input type="text" ref={Bucketnameref} className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name='bucket_name'  required />
            </div>

            
            
            <div className='my-4'>
            <input type='file' name='file' className="block bg hover:cursor-pointer mb-4 px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleFile} />
           <h1 className='font-bold text-red-500 text-center text-2xl' >{uploadsuccess}</h1>
            </div>
                
                <div className='mt-4'>
                <input type='submit' className="flex hover:cursor-pointer w-full justify-center text-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" value='Submit'/>

                </div>
            </form>
        </div>
      </div>
         
    );
};

export default File_upload;
