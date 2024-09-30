"use client"
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {

  const {user, isSignedIn}=useUser();
  return (
    <div className='p-4 flex justify-between items-center shadow-lg border'>
      <Image
        src={'/NewLogo.png'} // Note the leading slash
        alt='logo'
        width={100}
        height={80}
      />
      {isSignedIn?
      <UserButton /> :
      <Link href={'/sign-in'}>
      <btn className='w-full rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring sm:w-auto'>Get Started</btn>
      </Link> 
    }
    </div>
  );
}

export default Header;