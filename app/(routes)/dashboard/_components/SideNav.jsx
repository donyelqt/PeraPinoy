"use client"
import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard, LayoutGrid, LucideShieldPlus, PiggyBankIcon, ReceiptIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
function SideNav() {
  const menuList=[
    {
      id:1,
      name:'Dashboard',
      icon:LayoutDashboard,
      path:'/dashboard'
    },
    {
      id:2,
      name:'Budgets',
      icon:PiggyBankIcon,
      path:'/dashboard/budgets'
    },
    {
      id:3,
      name:'Expenses',
      icon:ReceiptIcon,
      path:'/dashboard/expenses'
    },
    {
      id:4,
      name:'Premium',
      icon:LucideShieldPlus,
      path:'/dashboard/premium'
    }
  ]
  const path=usePathname();

  useEffect(()=>{
    console.log(path)
  },[path])
  return (
    <div className='h-screen p-4 border shadow-md text-blue-600'>
      <Image src={'/PeraPinoy1.png'} 
      alt='logo'
      width={100}
      height={80}
      />
      <div className='mt-5'>
        {menuList.map((menu,index)=>(
          <Link href={menu.path}>
          <h2 className={`flex gap-2 items-center
          text-blue-600 font-medium
          mb-2 
          p-4 cursor-pointer rounded-lg
          hover:text-blue-600 hover:bg-blue-100
          ${path==menu.path&&'text-blue-600 bg-blue-100'}
          `}>
            <menu.icon />
            {menu.name}
          </h2>
          </Link>
        ))}
      </div>
          <div className='fixed bottom-10 p-5 flex gap-2
          items-center'>
            <UserButton />
            Profile
          </div>
    </div>
  )
}

export default SideNav