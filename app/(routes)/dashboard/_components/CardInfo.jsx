import { PiggyBankIcon, ReceiptCentIcon, ReceiptIcon, Wallet2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({ budgetList }) {

  const [totalBudget,setTotalBudget]=useState(0);
  const [totalSpend,setTotalSpend]=useState(0);
  
  useEffect(()=>{
    budgetList&&CalculateCardInfo();
  },[budgetList])
  const CalculateCardInfo=()=>{
    console.log(budgetList);
    let totalBudget_=0;
    let totalSpend_=0;

    budgetList.forEach(element =>{
      totalBudget_=totalBudget_+Number(element.amount)
      totalSpend_=totalSpend_+element.totalSpend
    });
    console.log(totalBudget_,totalSpend_)
  }
  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm text-slate-300'>Total Budgets</h2>
          <h2 className='font-bold text-2xl text-blue-600'>₱15000</h2>
        </div>
        <PiggyBankIcon
          className='bg-tertiary p-3 h-12 w-12 rounded-lg text-white' />
      </div>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm text-slate-300'>Total Spend</h2>
          <h2 className='font-bold text-2xl text-blue-600'>₱15000</h2>
        </div>
        <ReceiptIcon
          className='bg-tertiary p-3 h-12 w-12 rounded-lg text-white' />
      </div>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm text-slate-300'>No. of Budgets</h2>
          <h2 className='font-bold text-2xl text-blue-600'>₱15000</h2>
        </div>
        <Wallet2
          className='bg-tertiary p-3 h-12 w-12 rounded-lg text-white' />
      </div>
    </div>
  )
}

export default CardInfo