"use client"
import { UserButton, useUser } from '@clerk/nextjs';
import { Banknote, BellIcon, Book, BookMarked, BookOpenCheck, BotMessageSquare, Brain, BrainCog, Coins, LayoutDashboard, LayoutGrid, LucideShieldPlus, Menu, MenuSquare, PiggyBankIcon, ReceiptIcon, ShoppingBasket, User, User2, UserCheck2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';

function SideNav() {
  const { user } = useUser();

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budget',
      icon: Banknote,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptIcon,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'PeraPinoyGPT',
      icon: BotMessageSquare,
      path: '/dashboard/chatbot'

    },
    {
      id: 5,
      name: 'Forecasting',
      icon: BookOpenCheck,
      path: '/dashboard/historicaldata'
    },
    {
      id: 6,
      name: 'Savings Reward',
      icon: Coins,
      path: '/dashboard/savingsreward'
    },
    {
      id: 7,
      name: 'Expense Alerts',
      icon: BellIcon,
      path: '/dashboard/expensealerts'
    },
    {
      id: 8,
      name: 'AI Shopping',
      icon: ShoppingBasket,
      path: '/dashboard/shopoptimize'
    },
    {
      id: 9,
      name: 'Financial Forums',
      icon: BookMarked,
      path: '/dashboard/forums'
    },
    { 
      id: 10, 
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
    <nav className='h-screen p-4 border bg-white shadow-md text-orange '>
      <div className='p-2 pb-2 flex justify-between items-center'>
        <Image src={'/NewLogo.png'}
          alt='logo'
          width={100}
          height={80}
        />
      </div>
      <div className='mt-1'>
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={menu.id}>
            <h2 className={`flex gap-2 items-center
          text-orange text-xs font-medium
          mb-1 
          p-2 cursor-pointer rounded-lg
          hover:text-orange hover:bg-blue-950
          ${path == menu.path && 'text-white bg-secondary'}
          `}>
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-5 mt-10 p-12 flex gap-1
          items-center'>
        <span className='text-primary rounded-lg mb-4 text-sm font-bold bg-blue-950 p-2 flex items-center justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
          User Profile</span>
      </div>
      <div className='fixed bottom-10 p-4 flex gap-2
          items-center'>
        <UserButton afterSignOutUrl='/' />
        <span className='text-slate-500 text-sm font-semibold'>{user?.fullName}</span>
      </div>
    </nav>
  )
}

export default SideNav