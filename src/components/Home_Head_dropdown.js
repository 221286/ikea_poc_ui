import React from 'react'

const Home_Head_dropdown = ({homeselection,sethomeselection}) => {
    const handleOptionChange=(e)=>{
        sethomeselection(e.target.value);
    }
  return (
    
    <div className="relative inline-block hover:cursor-pointer">
    <select defaultValue={homeselection}
      
      onChange={handleOptionChange}
      className="block appearance-none hover:cursor-pointer w-full bg-yellow-200 border border-gray-300 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      
      <option value="Home">Home</option>
      <option value="Admin Page">Admin Page</option>
      <option value="Sign Out" >Sign Out</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 12a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414l-2.293-2.293-2.293 2.293a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 12zm0-10a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 4.414V16a1 1 0 11-2 0V4.414L7.707 6.707A1 1 0 016.293 5.293l3-3A1 1 0 0110 2z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
  )
}

export default Home_Head_dropdown
