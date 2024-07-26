import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className='p-4'>
      <Image
        src={'/PeraPinoy.png'} // Note the leading slash
        alt='logo'
        width={160}
        height={100}
      />
    </div>
  );
}

export default Header;