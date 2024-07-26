import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className='p-8 flex justify-between items-center'>
      <Image
        src={'/PeraPinoy1.png'} // Note the leading slash
        alt='logo'
        width={95}
        height={80}
      />
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;