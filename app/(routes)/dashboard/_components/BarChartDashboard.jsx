import React from 'react'
import { BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div>
        <BarChart 
        width={500}
        height={300}
        data={budgetList}
        margin={{
            top:5,
            right:5,
            left:5,
            bottom:5
        }}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

        </BarChart>
    </div>
  )
}

export default BarChartDashboard