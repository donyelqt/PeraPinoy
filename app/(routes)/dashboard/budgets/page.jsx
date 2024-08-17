import React from 'react'
import BudgetList from './_components/BudgetList'
import Image from 'next/image'
import calcu from '../../../../public/calcu.png'

function Budget() {
  return (
    <div className='text-tertiary p-10'>
      <div className='flex items-center'>
        <h2 className='font-bold text-6xl'>Budgets</h2>
        <Image className="w-10 h-10 object-contain ml-4"
          src={calcu}
          alt="calculator" />
      </div>
      <BudgetList />
    </div>
  )
}

export default Budget