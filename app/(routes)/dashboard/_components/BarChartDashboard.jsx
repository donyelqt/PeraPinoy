import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
    return (
        <div className='border rounded-lg p-10 hover:bg-slate-900'>
            <h2 className='text-tertiary font-bold text-3xl'>Expenses Breakdown</h2>
            <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={budgetList}
                margin={{
                    top:7
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSpend" name="Total Expense" stackId="a" fill='#0000cd'  /> //fill='#4169e1'
                <Bar dataKey="amount" name="Amount"  stackId="a" fill='#f08080' /> //fill='#87cefa'

            </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartDashboard