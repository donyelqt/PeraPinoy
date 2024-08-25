"use client"
import { UserButton } from '@clerk/nextjs';
import { Book, BookOpenCheck, Brain, BrainCog, LayoutDashboard, LayoutGrid, LucideShieldPlus, Menu, MenuSquare, PiggyBankIcon, ReceiptIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budget Creation',
      icon: PiggyBankIcon,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expense Tracking',
      icon: ReceiptIcon,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'PeraPinoyGPT',
      icon: Brain,
      path: '/dashboard/chatbot'

    },
    {
      id: 5,
      name: 'Financial Blogs',
      icon: BookOpenCheck,
      path: '/dashboard/blogs'
    },
    {
      id: 6,
      name: 'Premium',
      icon: LucideShieldPlus,
      path: '/dashboard/premium'
    }
  ]
  const path = usePathname();

  useEffect(() => {
    console.log(path)
  }, [path])
  return (
    <nav className='h-screen p-4 border shadow-md text-blue-600 bg-gray-900'>
      <div className='p-2 pb-2 flex justify-between items-center'>
        <Image src={'/PeraPinoy1.png'}
          alt='logo'
          width={100}
          height={80}
        />
      </div>
      <div className='mt-5'>
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={menu.id}>
            <h2 className={`flex gap-2 items-center
          text-blue-600 font-medium
          mb-2 
          p-4 cursor-pointer rounded-lg
          hover:text-blue-600 hover:bg-dark
          ${path == menu.path && 'text-blue-600 bg-dark'}
          `}>
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2
          items-center'>
        <UserButton afterSignOutUrl='/' />
        Profile
      </div>
    </nav>
  )
}

export default SideNav