import { PiggyBankIcon } from 'lucide-react'
import React from 'react'

function CardInfo({ budgetList }) {
  return (
    <div className='mt-7'>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm text-slate-300'>Total Budgets</h2>
          <h2 className='font-bold text-2xl text-blue-600'>₱15000</h2>
        </div>
        <PiggyBankIcon 
        className='bg-tertiary p-3 h-12 w-12 rounded-lg text-white' />
      </div>
    </div>
  )
}

export default CardInfo