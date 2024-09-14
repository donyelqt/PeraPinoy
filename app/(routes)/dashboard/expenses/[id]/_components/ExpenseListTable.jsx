import { Trash2 } from 'lucide-react'
import React from 'react'
import { db } from '../../../../../../utils/dbConfig'
import { Expenses } from '../../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { accounting } from '../../../../../../public'
import Image from 'next/image'

function ExpenseListTable({ expensesList, refreshData }) {

    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();


        if (result) {
            toast.success('Expenses Deleted!');
            refreshData()
        }
    }
    return (
        <div className='mt-5'>
            <div className='flex items-center'>
                <h2 className='font-bold text-5xl md:text-6xl lg:text-6xl text-tertiary'>Recent Expenses</h2>
                <Image className="w-10 h-10 object-contain ml-4"
                    src={accounting}
                    alt="accounting" />
            </div>
            <p className='text-gray-500 mt-2'>Track your all expenses here! </p>
            <div className='rounded-lg grid grid-cols-4 bg-slate-900 border p-2 mt-10 text-slate-300'>
                <h2 className='font-bold text-sm'>Name</h2>
                <h2 className='font-bold text-sm'>Amount</h2>
                <h2 className='font-bold text-sm'>Date</h2>
                <h2 className='font-bold text-sm'>Delete</h2>
            </div>
            {expensesList.map((expenses, index) => (
                <div className='rounded-lg grid text-xs grid-cols-4 bg-transparent border p-2 text-tertiary'>
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2>
                        <Trash2 className='text-red-600 cursor-pointer'
                            onClick={() => deleteExpense(expenses)}
                        />
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default ExpenseListTable