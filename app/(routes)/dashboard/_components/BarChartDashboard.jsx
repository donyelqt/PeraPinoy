import React from 'react'
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
    return (
        <div className='border rounded-3xl p-8 hover:bg-slate-900'>
            <h2 className='text-tertiary font-bold text-3xl mb-5'>Expenses Statistics</h2>
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
                <YAxis dataKey="totalSpend" />
                <Tooltip />
                <Legend />
                <Line type='monotoneY' dataKey="totalSpend" name="Total Expenses" stackId="a" stroke='#4169e1'  /> //fill='#4169e1'
                <Line type='monotoneX' dataKey="amount" name="Budgets"  stackId="a" stroke='#f08080' /> //fill='#87cefa'
            </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartDashboard