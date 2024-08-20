"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

function Dashboard() {
  const {user}=useUser();
  return (
    <div className='p-5'>
        <h2 className='font-bold text-blue-600 text-3xl'>Hello, {user?.fullName}! 👋</h2>
    </div>
  )
}

export default Dashboard