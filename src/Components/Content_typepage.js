import React from 'react'
import File_upload from './File_upload'
import Bucket_content_type_info from './Bucket_content_type_info';

const Content_typepage = () => {
  return (
    <div className='min-h-screen    w-full bg-yellow-400'>
      <div className='p-10'>
      <Bucket_content_type_info></Bucket_content_type_info>
      </div>
      
      <File_upload></File_upload>
      
    </div>
  )
}

export default Content_typepage;

