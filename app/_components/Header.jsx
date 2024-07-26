import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className='p-4 flex justify-between items-center shadow-2xl'>
      <Image
        src={'/PeraPinoy1.png'} // Note the leading slash
        alt='logo'
        width={100}
        height={80}
      />
      <Button className="hover:bg-tertiary">Get Started</Button>
    </div>
  );
}

export default Header;