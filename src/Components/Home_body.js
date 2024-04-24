import React from 'react'
import Dashboard from './Dashboard'

const Home_body = ({user_name}) => {
  return (
    <>
      <h1 className='text-4xl font-extrabold shadow-lg text-center'>Welcome to dashboard <span className='text-green-700'>{user_name?.toUpperCase()}</span> </h1>
  <Dashboard></Dashboard>
    </>
  )
}

export default Home_body
