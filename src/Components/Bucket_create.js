import React, { useRef } from 'react';
import axios from 'axios';

const Bucket_create = () => {
    const createbucketref = useRef(null);
    const access_token=localStorage.getItem('access_token');


    const handle_creatbucket = (e) => {
        e.preventDefault();
        console.log("Bucketname:", createbucketref.current.value);
        createBucket();
    };

    const createBucket = async () => {
        const bucketname = createbucketref.current.value;

        const headers = {
            'Accept': '*/*',
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        };

        const data = {
            name: bucketname,
            minioPort: 9001
        };
         /*end point:54.198.138.169*/
        const URL = 'http://54.198.138.169:7000/bucket/create';

        try {
            const response = await axios.post(URL, data, { headers });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='bg-yellow-400 min-h-screen flex flex-col justify-center items-center'>
                <div className="flex flex-col justify-center px-6 w-1/2 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className='text-5xl rounded-lg shadow-lg text-center font-extrabold tracking-wider text-blue-700 gap-6'>Create Bucket</h1>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handle_creatbucket} method="POST">
                            <div>
                                <label htmlFor="createbucketName" className="block text-sm font-medium leading-6 text-grey-900">Bucket Name</label>
                                <div className="mt-2">
                                    <input id="createbucketName" ref={createbucketref} name="createbucketName" type="text" required className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Bucket</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Bucket_create;
