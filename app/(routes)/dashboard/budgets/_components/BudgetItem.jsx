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
        <Link href={`/dashboard/expenses/${budget.id}`} >
            <div className='p-5 border rounded-3xl hover:bg-slate-900 cursor-pointer h-[210px]'>
                <div className='flex gap-2 items-center justify-between'>
                    <div>
                        <h2 className='font-bold text-blue-600 text-lg'>₱{budget.amount}</h2>
                        <h2 className='text-sm text-gray-500'>Amount</h2>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='text-right'>
                            <h2 className='text-white text-sm font-bold'>{budget.name}</h2>
                            <h2 className='text-gray-500 text-sm'>{budget.totalItem} Items</h2>
                        </div>
                        <h2 className='text-2xl p-3 px-4 bg-tertiary rounded-xl'>{budget?.icon}</h2>
                    </div>
                </div>


                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-3'>
                        <div className="relative w-16 h-16">
                            {/* SVG for Circular Progress */}
                            <svg className="w-full h-full transform -rotate-180">
                                <circle
                                    className="text-blue-500"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="30"
                                    cx="32"
                                    cy="32"
                                />
                                <circle
                                    className="text-red-500"
                                    strokeWidth="4"
                                    strokeDasharray="188"
                                    strokeDashoffset={188 - (188 * (budget.totalSpend / budget.amount))}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="30"
                                    cx="32"
                                    cy="32"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-xs font-bold text-yellow-200">
                                    {Math.round((budget.totalSpend / budget.amount) * 100)}%
                                </h2>
                            </div>
                        </div>

                        {/* Expense and Balance Info */}
                        <div>
                            <h2 className='text-xs text-red-500'>₱{budget.totalSpend ? budget.totalSpend : 0} Expense</h2>
                            <h2 className='text-xs text-gray-500'>₱{budget.amount - budget.totalSpend} Balance</h2>
                        </div>
                    </div>

                    <div className='w-full bg-blue-500 h-2 rounded-full'>
                        <div className=' bg-red-500 h-2 rounded-full'
                            style={{
                                width: `${calculateProgressPerc()}%`
                            }}
                        >

                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BudgetItem;