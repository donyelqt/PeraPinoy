import Image from 'next/image'
import React from 'react'
import { membercard } from '../../../../public'

function PremiumPage() {
  return (
    <div className='text-tertiary p-10'>
      <div className='flex items-center'>
        <div className='font-bold text-5xl md:text-6xl lg:text-6xl'>Premium</div>
        <Image className="w-10 h-10 object-contain ml-4"
          src={membercard}
          alt="membercard" />
      </div>
    </div>
  )
}

export default PremiumPage