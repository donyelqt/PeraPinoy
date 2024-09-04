"use client"
import React, { useState } from 'react'
import { db } from '../../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../../utils/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';


function AddExpense({ budgetId, user, refreshData }) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);

    // used to get add new expenses
    const addNewExpense = async () => {
        setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            loading: loading,
            budgetId: budgetId,
            createdAt: moment().format('MM/DD/yyy')
        }).returning({ insertedId: Budgets.id });

        setAmount('');
        setName('');
        if (result) {
            setLoading(false)
            refreshData()
            toast.success('New Expenses Added!')
        }
        setLoading(false);
    }
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add your expenses here! 👇</h2>
            <div className="mt-2">
                <h2 className="text-blue-600 font-medium my-1">Expenses Name</h2>
                <input className="flex text-blue-900 h-10 w-full rounded-md border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. New Shoes"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mt-2">
                <h2 className="text-blue-600 font-medium my-1">Amount</h2>
                <input className="flex text-blue-900 h-10 w-full rounded-md border border-input bg-slate-300 px-3 py-2 text-sm ring-offset-blue-600 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                  disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. 1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
            </div>
            <button disabled={!(name && amount)||loading}
                onClick={() => addNewExpense()}
                className='rounded-lg cursor-pointer bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring w-full mt-3 flex justify-center items-center'>
                {loading ?
                    <Loader className='animate-spin' /> : "Add New"
                }
            </button>
        </div>
    )
}

export default AddExpense