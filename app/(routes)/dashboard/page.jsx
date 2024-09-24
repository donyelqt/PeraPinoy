"use client"
import { UserButton, UserProfile, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from "./_components/CardInfo"
import { db } from '../../../utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '../../../utils/schema';
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem';
import Image from 'next/image';
import { calcu } from '../../../public';
import ExpenseListTable from './expenses/[id]/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  useEffect(() => {
    user && getBudgetList();
  }, [user])

  // used to get budget list
  const getBudgetList = async () => {

    const result = await db.select({
      ...getTableColumns(Budgets),

      totalSpend: sql`sum(${Expenses.amount}::numeric)`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));


    setBudgetList(result);
    getAllExpenses();

  }

  // used to get all expenses belong to users
  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }

  return (
    <div className="p-10 space-y-8">
      <div className="bg-indigo-950 p-7 rounded-3xl shadow-lg">
        <div className="flex items-center">
          <UserButton afterSignOutUrl='/' />
          <h2 className='font-bold text-tertiary text-xl md:text-3xl lg:text-3xl ml-4'>
            <span className='text-orange'>Hello, </span>{user?.fullName}!👋
          </h2>
        </div>
        <p className='text-gray-300'>Empower Your Finances with PeraPinoy!</p>
      </div>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='text-blue-600 lg:mb-60 grid gap-5'>
          <div className='flex items-center'>
            <h2 className='text-tertiary font-bold text-3xl md:text-4xl lg:text-4xl'>Recent Budgets</h2>
            <Image className="w-10 h-10 object-contain ml-2"
              src={calcu}
              alt="calculator" />
          </div>
         
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
          
        </div>
        <div className='md:col-span-2 text-blue-600'>
          <BarChartDashboard
            budgetList={budgetList}
          />

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard