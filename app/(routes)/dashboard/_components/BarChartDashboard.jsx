import React from 'react'
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
    return (
        <div className='border rounded-lg p-10 hover:bg-slate-900'>
            <h2 className='text-tertiary font-bold text-3xl'>Expenses Breakdown</h2>
            <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                <Line type='monotoneX' dataKey="totalSpend" name="Total Expenses" stackId="a" stroke='#0000cd'  /> //fill='#4169e1'
                <Line type='monotoneY' dataKey="amount" name="Budgets"  stackId="a" stroke='#f08080' /> //fill='#87cefa'
            </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartDashboard