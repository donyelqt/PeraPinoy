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
        <p className='text-tertiary font-bold text-3xl md:text-4xl lg:text-4xl'>Overview</p>
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
              <h2 className='font-bold text-2xl text-tertiary'>₱{totalBudget}</h2>
              <h2 className='text-md text-slate-500 font-semibold'>Total Budget</h2>
            </div>

          </div>
          <div className='p-7 border rounded-3xl flex items-center justify-between hover:bg-slate-900'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-red-700 p-3 h-20 w-20 rounded-full text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>

            <div>
              <h2 className='font-bold text-2xl text-tertiary'>₱{totalSpend}</h2>
              <h2 className='text-md text-slate-500 font-semibold'>Total Expense</h2>
            </div>

          </div>
          <div className='p-7 border rounded-3xl flex items-center justify-between hover:bg-slate-900'>
            <Wallet2
              className='bg-red-700 p-3 h-20 w-20 rounded-full text-white' />
            <div>
              <h2 className='font-bold text-2xl text-tertiary'>{budgetList?.length}</h2>
              <h2 className='text-md text-slate-500 font-semibold'>Budget Count No.</h2>
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