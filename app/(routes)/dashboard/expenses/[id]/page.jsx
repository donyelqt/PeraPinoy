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
import { PenBox, PenSquareIcon, Trash2, UserPen } from 'lucide-react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from './_components/EditBudget'



function ExpensesScreen({ params }) {
    const { user } = useUser();
    const [budgetInfo, setbudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();
    useEffect(() => {

        user&&getBudgetInfo();

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


    // used to delete budget
    const deleteBudget = async () => {

        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .returning();

        if (deleteExpenseResult) {
            const result = await db.delete(Budgets)
                .where(eq(Budgets.id, params.id))
                .returning();
        }
        toast.success('Budget Deleted!');
        route.replace('/dashboard/budgets');



    }

    return (
        <div className='text-tertiary p-10'>
            <div className='mt-4'>
               {/* <div className='flex items-center'>
                    <h2 className='font-bold text-6xl'>Recent Expenses</h2>
                    <Image className="w-10 h-10 object-contain ml-4"
                        src={accounting}
                        alt="accounting" />
                </div> */}
                <ExpenseListTable expensesList={expensesList}
                    refreshData={() => getBudgetInfo()} />
            </div>
            <div className='flex items-center mt-10'>
                <h2 className='font-bold text-3xl sm:text-5xl md:text-5xl lg:text-5xl'>Expenses</h2>
                <Image className="w-10 h-10 object-contain ml-4"
                    src={expense}
                    alt="expense" />
                <div className='flex gap-2 items-center ml-auto'>
                    <EditBudget budgetInfo={budgetInfo} 
                    refreshData={()=>getBudgetInfo()} />
                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <button className='rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:bg-red-500 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 flex gap-2 ml-auto'>
                                <Trash2 />
                            </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className="bg-black data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
                            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-dark2 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                <AlertDialog.Title className="text-mauve12 text-white m-0 text-[17px] font-medium">
                                    Are you absolutely sure?
                                </AlertDialog.Title>
                                <AlertDialog.Description className="text-slate-300 text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                                    This action cannot be undone. This will permanently delete your current budget along with expenses and remove your
                                    data from our servers.
                                </AlertDialog.Description>
                                <div className="flex justify-end gap-[25px]">
                                    <AlertDialog.Cancel asChild>
                                        <button className="text-mauve11 text-white bg-blue-600 text-sm bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 px-12 py-3 inline-flex h-[50px] items-center justify-center rounded-lg font-medium leading-none outline-none hover:bg-yellow-600">
                                            Cancel
                                        </button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action asChild>
                                        <button onClick={() => deleteBudget()} className="block w-full rounded-lg bg-secondary px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                                            Confirm
                                        </button>
                                    </AlertDialog.Action>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                </div>


            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                <AddExpense budgetId={params.id}
                    user={user}
                    refreshData={() => getBudgetInfo()}
                />
                {budgetInfo ? <BudgetItem
                    budget={budgetInfo}
                /> :
                    <div className='h-[150px] w-full bg-slate-900 
            rounded-lg animate-pulse'>
                    </div>}
            </div>
        </div>
    )
}

export default ExpensesScreen