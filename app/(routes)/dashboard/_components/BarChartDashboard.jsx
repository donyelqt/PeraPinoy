import React from 'react'
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
    return (
        <div className='border rounded-3xl p-8 hover:bg-slate-900'>
            <h2 className='text-tertiary font-bold text-3xl mb-5'>Expenses Statistics</h2>
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
                <YAxis dataKey="totalSpend"  />
                <Tooltip />
                <Legend />
                <Bar type='monotoneY' dataKey="totalSpend" name="Total Expenses" stackId="a" fill='#Ce1127'  /> //fill='#4169e1' #4169e1
                <Bar type='monotoneX' dataKey="amount" name="Budgets"  stackId="a" fill='#ff8c00' /> //fill='#87cefa' #f08080
            </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartDashboard