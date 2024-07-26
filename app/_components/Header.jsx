import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className='p-2 flex justify-between items-center border shadow-sm'>
      <Image
        src={'/PeraPinoy1.png'} // Note the leading slash
        alt='logo'
        width={100}
        height={80}
      />
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;