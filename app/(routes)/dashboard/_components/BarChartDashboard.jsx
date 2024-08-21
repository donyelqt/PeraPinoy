import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ budgetList }) {
    return (
        <div className='border rounded-lg p-10'>
            <BarChart
                width={500}
                height={300}
                data={budgetList}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSpend" stackId="a" fill='#4169e1 ' />
                <Bar dataKey="amount" stackId="a" fill='#87cefa' />

            </BarChart>
        </div>
    )
}

export default BarChartDashboard