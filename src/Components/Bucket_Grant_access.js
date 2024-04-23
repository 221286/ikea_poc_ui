import React from 'react'

const Bucket_Grant_access = ({handleSubmit,bucketNameRef,selectedOption,setSelectedOption,userNameRef}) => {
  return (
    <>
      <div className='bg-yellow-400 min-h-screen flex flex-col justify-center items-center'>
      <div className="flex flex-col justify-center px-6 w-1/2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className='text-5xl rounded-lg shadow-lg text-center font-extrabold tracking-wider text-blue-700 gap-6'>Grant Access</h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="PUT">
            <div>
              <label htmlFor="bucketName" className="block text-sm font-medium leading-6 text-grey-900">Bucket Name</label>
              <div className="mt-2">
                <input id="bucketName" ref={bucketNameRef} name="bucketName" type="text" required className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium leading-6 text-grey-900">User Name</label>
              <div className="mt-2">
                <input id="userName" ref={userNameRef} name="userName" type="text" required className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-grey-900">Access Status</label>
              <div className="relative mt-2">
                <select
                  className="block appearance-none w-full hover:cursor-pointer bg-yellow-200 border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="GRANT">GRANT</option>
                  <option value="REVOKE">REVOKE</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414l-2.293-2.293-2.293 2.293a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 12zm0-10a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 4.414V16a1 1 0 11-2 0V4.414L7.707 6.707A1 1 0 016.293 5.293l3-3A1 1 0 0110 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className='mt-5'>
              <button type="submit" className="flex hover:cursor-pointer w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Grant Access</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Bucket_Grant_access
