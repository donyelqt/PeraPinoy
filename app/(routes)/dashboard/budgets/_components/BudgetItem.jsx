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
            <div className='p-8 border rounded-3xl hover:bg-slate-900 cursor-pointer h-[250px]'>
                <div className='flex gap-2 items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-bold text-tertiary'>₱{budget.amount - budget.totalSpend} </h2>
                        <h2 className='text-sm text-gray-500 font-semibold'>Balance</h2>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='text-right'>
                            <h2 className='text-orange text-sm font-bold'>{budget.name}</h2>
                            <h2 className='text-gray-500 text-sm font-semibold'>{budget.totalItem} Items</h2>
                        </div>
                        <h2 className='text-xl p-4 px-5 bg-tertiary rounded-3xl'>{budget?.icon}</h2>
                    </div>
                </div>


                <div className='mt-8'>
                    <div className='flex items-center justify-between mb-3'>
                        <div className="relative w-16 h-16">
                            {/* SVG for Circular Progress */}
                            <svg className="w-full h-full transform -rotate-180">
                                <circle
                                    className="text-slate-300"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="30"
                                    cx="32"
                                    cy="32"
                                />
                                <circle
                                    className="text-orange"
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
                            <h2 className='text-xs text-orange'>₱{budget.totalSpend ? budget.totalSpend : 0} Expense</h2>
                            <h2 className='text-white text-xs'>₱{budget.amount} <span className='text-xs'>Amount</span></h2> {/* <h2 className='text-xs text-blue-400'>₱{budget.amount - budget.totalSpend} Balance</h2> */}
                        </div>
                    </div>

                    <div className='w-full bg-white h-2 rounded-full'>
                        <div className=' bg-orange h-2 rounded-full'
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