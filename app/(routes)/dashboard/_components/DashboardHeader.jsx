import { UserButton } from '@clerk/nextjs'
import React from 'react'
import SideNav from './SideNav'
import MobileNav from './MobileNav'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-md border-b text-gray-300 flex justify-between'>
        <div>
            
        </div>
        <div>
            <MobileNav />
        </div>
    </div>
  )
}

export default DashboardHeader