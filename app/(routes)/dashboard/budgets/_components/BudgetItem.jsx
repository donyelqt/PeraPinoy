import React from 'react'

function BudgetItem({budget}) {

  return (
    <div className='p-5 border rounded-lg'>
        <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 px-4 
            bg-slate-900 rounded-full'
            >{budget?.icon}</h2>
            <div>
                <h2>{budget.name}</h2>
                <h2>{budget.totalItem} Item</h2>
            </div>
            
        </div>
        <h2 className=''> ₱{budget.amount}</h2>
        </div>
    </div>
  )
}

export default BudgetItem