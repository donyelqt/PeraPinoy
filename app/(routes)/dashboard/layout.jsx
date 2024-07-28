import React from 'react'
import SideNav from './_components/SideNav'

function DashboardLayout({children}) {
  return (
    <div> 
      <div className='fixed md:w-64 hidden md:block bg-black border'>
        <SideNav />
      </div>
      <div className='md:ml-64 bg-secondary'>
      {children}
      </div>
      </div>
  )
}

export default DashboardLayout