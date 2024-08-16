"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from './_components/AddExpense';
import { coins, expense, accounting } from '../../../../../public';
import Image from 'next/image';
import ExpenseListTable from './_components/ExpenseListTable'
import { Trash2 } from 'lucide-react';

function ExpensesScreen({ params }) {
    const { user } = useUser();
    const [budgetInfo, setbudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    useEffect(() => {

        user && getBudgetInfo();

    }, [user]);


    // get budget info
    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount}::numeric)`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id)

        setbudgetInfo(result[0]);
        getExpensesList();
    }


    // get latest expenses
    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id));
        setExpensesList(result);
        console.log(result)
    }

    return (
        <div className='text-blue-600 p-10'>
            <div className='mt-4'>
                <div className='flex items-center'>
                    <h2 className='font-bold text-6xl'>Recent Expenses</h2>
                    <Image className="w-10 h-10 object-contain ml-4"
                        src={accounting}
                        alt="accounting" />
                </div>
                <ExpenseListTable expensesList={expensesList}
                    refreshData={() => getBudgetInfo()} />
            </div>
            <div className='flex items-center mt-10'>
                <h2 className='font-bold text-5xl'>Expenses</h2>
                <Image className="w-10 h-10 object-contain ml-4"
                    src={expense}
                    alt="expense" />
                <button className='rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:bg-red-500 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 flex gap-2 ml-auto'>
                    <Trash2 /> Delete
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo ? <BudgetItem
                    budget={budgetInfo}
                /> :
                    <div className='h-[150px] w-full bg-slate-900 
            rounded-lg animate-pulse'>
                    </div>}
                <AddExpense budgetId={params.id}
                    user={user}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
        </div>
    )
}

export default ExpensesScreen