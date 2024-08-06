import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
  return (
    <div className='text-gray-300 p-10'>
      <h2 className='text-bold text-3xl'>My Budgets</h2>
      <BudgetList />
    </div>
  )
}

export default Budget