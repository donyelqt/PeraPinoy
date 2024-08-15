import { Trash2 } from 'lucide-react'
import React from 'react'

function ExpenseListTable({ expensesList }) {
    return (
        <div className='mt-5'>
            <div className='grid grid-cols-4 bg-transparent border p-2 text-white'>
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Delete</h2>
            </div>
            {expensesList.map((expenses, index) => (
                <div className='grid grid-cols-4 bg-slate-900 border p-2'>
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2>
                        <Trash2 className='text-red-600' />
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default ExpenseListTable