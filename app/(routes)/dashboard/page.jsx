"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

function Dashboard() {
  const {user}=useUser();
  return (
    <div className='p-10'>
        <h2 className='font-bold text-tertiary text-3xl'>Hello, {user?.fullName}! 👋</h2>
        <p className='text-gray-500'>Empower Your Finances with PeraPinoy</p>
    </div>
  )
}

export default Dashboard