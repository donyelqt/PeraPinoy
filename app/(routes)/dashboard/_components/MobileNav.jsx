"use client"
import { UserButton } from '@clerk/nextjs';
import { BookOpenCheck, Brain, LayoutDashboard, LucideShieldPlus, PiggyBankIcon, ReceiptIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Prevent background from scrolling when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Close the menu whenever the path changes
    useEffect(() => {
        setIsOpen(false);
        document.body.style.overflow = ''; // Reset overflow when menu is closed
    }, [path]);

    const menuList = [
        { id: 1, name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 2, name: 'Budget Creation', icon: PiggyBankIcon, path: '/dashboard/budgets' },
        { id: 3, name: 'Expense Tracking', icon: ReceiptIcon, path: '/dashboard/expenses' },
        { id: 4, name: 'PeraPinoyGPT', icon: Brain, path: '/dashboard/chatbot' },
        { id: 5, name: 'Financial Blogs', icon: BookOpenCheck, path: '/dashboard/blogs' },
        { id: 6, name: 'Premium', icon: LucideShieldPlus, path: '/dashboard/premium' }
    ];

    return (
        <nav className="bg-transparent lg:hidden md:hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                </a>
                <button
                    onClick={toggleMenu}
                    data-collapse-toggle="navbar-hamburger"
                    type="button"
                    className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-blue-600 rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-hamburger"
                    aria-expanded={isOpen ? "true" : "false"}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`fixed top-0 left-0 w-[70%] h-full bg-gray-900 bg-opacity-95 z-50 ${isOpen ? 'block' : 'hidden'} lg:hidden`} id="navbar-hamburger">
                    <nav className='h-full p-4 text-blue-600'>
                        <div className='p-2 pb-2 flex justify-between items-center'>
                            <Image src={'/PeraPinoy1.png'} alt='logo' width={100} height={80} />
                            <button
                                onClick={toggleMenu}
                                className="text-white"
                            >
                                <XIcon size={30} className='hover:bg-dark p-2 rounded-lg text-red-600 w-10 h-10' />
                            </button>
                        </div>
                        <div className='mt-5'>
                            {menuList.map((menu) => (
                                <Link href={menu.path} key={menu.id}>
                                    <h2 className={`flex gap-2 items-center
                                        text-blue-600 font-medium
                                        mb-2 
                                        p-4 cursor-pointer rounded-3xl
                                        hover:text-blue-600 hover:bg-dark
                                        ${path === menu.path && 'text-blue-600 bg-dark'}
                                    `}>
                                        <menu.icon />
                                        {menu.name}
                                    </h2>
                                </Link>
                            ))}
                        </div>
                        <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                            <UserButton afterSignOutUrl='/' />
                            <span className="text-white font-semibold">User Profile</span>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    );
}

export default MobileNav;
