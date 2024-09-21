import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className='p-2 flex justify-between items-center border shadow-lg'>
      <Image
        src={'/NewLogo.png'} // Note the leading slash
        alt='logo'
        width={100}
        height={80}
      />
      <Button className="hover:bg-tertiary">Get Started</Button>
    </div>
  );
}

export default Header;