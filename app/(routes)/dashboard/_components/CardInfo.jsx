import { PiggyBankIcon, Receipt, Wallet2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { userfinanceinfo } from '../../../../public';
import Image from 'next/image';

function CardInfo({ budgetList }) {

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    budgetList && CalculateCardInfo();
  }, [budgetList])
  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach(element => {
      totalBudget_ = totalBudget_ + Number(element.amount)
      totalSpend_ = totalSpend_ + element.totalSpend
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    console.log(totalBudget_, totalSpend_)
  }
  return (
    <div className='mt-4'>
      <div className='flex'>
        <p className='text-tertiary font-bold text-3xl md:text-4xl lg:text-4xl'>Financial Overview</p>
        <Image className="w-10 h-10 object-contain ml-4"
          src={userfinanceinfo}
          alt="userfinanceinfo" />
      </div>
      {budgetList?.length > 0 ?
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div className='p-7 border rounded-3xl flex items-center justify-between hover:bg-slate-900'>
            <PiggyBankIcon
              key="icon"
              className='bg-red-700 p-3 h-20 w-20 rounded-full text-white' />
            <div>
              <h2 className='text-md text-white font-bold'>Total Budget</h2>
              <h2 className='font-bold text-2xl text-blue-600'>₱{totalBudget}</h2>
            </div>

          </div>
          <div className='p-7 border rounded-3xl flex items-center justify-between hover:bg-slate-900'>
            <Receipt
              key="icon"
              className='bg-red-700 p-3 h-20 w-20 rounded-full text-white' />
            <div>
              <h2 className='text-md text-white font-bold'>Total Expense</h2>
              <h2 className='font-bold text-2xl text-blue-600'>₱{totalSpend}</h2>
            </div>

          </div>
          <div className='p-7 border rounded-3xl flex items-center justify-between hover:bg-slate-900'>
            <Wallet2
              className='bg-red-700 p-3 h-20 w-20 rounded-full text-white' />
            <div>
              <h2 className='text-md text-white font-bold'>Budget Count No.</h2>
              <h2 className='font-bold text-2xl text-blue-600'>{budgetList?.length}</h2>
            </div>

          </div>
        </div>
        :
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {[1, 2, 3].map((item, index) => (
            <div className='h-[140px] w-full bg-slate-900 animate-pulse rounded-3xl'>

            </div>
          ))}
        </div>
      }

    </div>
  )
}

export default CardInfo