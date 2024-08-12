import React from 'react'

function CreateBudget() {
  return (
    <div>
      <div className='bg-slate-300 p-10 rounded-md items-center 
      flex flex-col border-2 border-dashed cursor-pointer hover:bg-blue-500 hover:text-black'>
        <h2 className='text-3xl text-black-600'>+</h2>
        <h2>Create New Budget</h2>
      </div>
    </div>
  )
}

export default CreateBudget