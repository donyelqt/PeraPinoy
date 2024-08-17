import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {
    if (!budget) return null; // or return a loading indicator, etc.

    const calculateProgressPerc = () => {
        // (spend/total)*100
        const perc = (budget.totalSpend / budget.amount) * 100;
        return perc.toFixed(2);
    }
    return (
        <Link href={`/dashboard/expenses/${budget.id}`} className='p-5 border rounded-lg hover:bg-slate-900 cursor-pointer h-[160px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl p-3 px-4 bg-yellow-500 rounded-xl'>{budget?.icon}</h2>
                    <div>
                        <h2 className='text-white font-bold'>{budget.name}</h2>
                        <h2 className='text-gray-500 text-sm'>{budget.totalItem} Items</h2>
                    </div>
                </div>
                <h2 className='font-bold text-blue-600 text-lg'> ₱{budget.amount}</h2>
            </div>

            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-400'>₱{budget.totalSpend ? budget.totalSpend : 0} Spend</h2>
                    <h2 className='text-xs text-slate-400'>₱{budget.amount - budget.totalSpend} Balance</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className=' bg-blue-600 h-2 rounded-full'
                        style={{
                            width: `${calculateProgressPerc()}%`
                        }}
                    >

                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BudgetItem;