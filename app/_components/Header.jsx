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
      <button className='block w-full rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-tertiary focus:outline-none focus:ring sm:w-auto'>Get Started</button>
    </div>
  );
}

export default Header;