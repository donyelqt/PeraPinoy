import React from 'react'

function BudgetItem({budget}) {

  return (
    <div className='p-5 border rounded-lg hover:bg-slate-900 cursor-pointer'>
        <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 px-4 
            bg-slate-900 rounded-full'
            >{budget?.icon}</h2>
            <div>
                <h2 className='text-white font-bold'>{budget.name}</h2>
                <h2 className='text-gray-500 text-sm'>{budget.totalItem} Item</h2>
            </div>
            
        </div>
        <h2 className='font-bold text-blue-600 text-lg'> ₱{budget.amount}</h2>
        </div>

        <div className='mt-5'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-xs text-slate-400'>₱{budget.totalSpend?budget.totalSpend:0} Spend</h2>
                <h2 className='text-xs text-slate-400'>₱{budget.amount-budget.totalSpend} Remaining</h2>
            
            
            </div>
            <div className='w-full 
            bg-slate-300 h-2 rounded-full'>
                <div className='w-[40%] 
            bg-blue-600 h-2 rounded-full'>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BudgetItem