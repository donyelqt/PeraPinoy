"use client";

import { ArrowRightCircleIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const HistoricalDataPage = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('🍚');
  const [chartData, setChartData] = useState({
    labels: [
      '2018', '2019', '2020', '2021', '2022', '2023', '2024'
    ],
    datasets: [{
      label: 'Historical Price Trends',
      data: [50, 52, 55, 54, 56, 57, 58], // Initial data for the selected commodity
      borderColor: 'rgba(255, 0, 0, 1)', // Red line color
      backgroundColor: 'rgba(255, 0, 0, 0.2)', // Light red background
      fill: true,
    }],
  });

  // Historical price data based on the Philippine market (in PHP) for each year
  const commodityData = {
    fuel: [50, 52, 55, 54, 56, 57, 58],
    rice: [40, 42, 41, 43, 44, 45, 46],
    eggs: [6, 6.5, 6.3, 6.7, 7, 7.2, 7.5],
    fish: [80, 82, 81, 84, 83, 85, 87],
    chicken: [90, 92, 91, 94, 93, 95, 97], // New commodity
    vegetables: [30, 32, 31, 34, 33, 35, 36], // New commodity
    fruits: [60, 62, 61, 64, 63, 65, 67] // New commodity
  };

  const handleCommodityChange = (event) => {
    const selected = event.target.value;
    setSelectedCommodity(selected);
    
    // Update chart data based on the selected commodity
    setChartData((prevData) => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: commodityData[selected],
        borderColor: 'rgba(255, 0, 0, 1)', // Ensure the line remains red
        backgroundColor: 'rgba(255, 0, 0, 0.2)', // Ensure the background remains light red
      }],
    }));
  };

  const handleSetPriceAlert = () => {
    alert(`Price alert set for ${selectedCommodity}!`);
  };

  return (
    <section className="text-gray-200 p-4 md:p-12 lg:p-12">
      <h1 className='font-bold text-3xl text-tertiary md:text-5xl mb-6'>Commodity Forecasting</h1>
      <div className="bg-transparent shadow-lg border p-10 rounded-3xl mx-auto">
        <div className="mb-8">
          <label className="block mb-2 text-tertiary text-lg">Select Commodity:</label>
          <select onChange={handleCommodityChange} className="border bg-white text-dark rounded-2xl p-3 mb-4 w-[120px] md:w-[15%]">
            {[ 
              { name: 'Fuel ⛽', value: 'fuel' },
              { name: 'Rice 🍚', value: 'rice' },
              { name: 'Eggs 🥚', value: 'eggs' },
              { name: 'Fish 🐟', value: 'fish' },
              { name: 'Chicken 🍗', value: 'chicken' }, // New option
              { name: 'Vegetables 🥕', value: 'vegetables' }, // New option
              { name: 'Fruits 🍏', value: 'fruits' } // New option
            ].map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 h-72 md:h-96 bg-white p-5 md:p-10 rounded-3xl">
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="mb-4">
          <h2 className="text-lg text-tertiary font-semibold">Historical Insights</h2>
          <p className='text-slate-400'>Prices have shown a significant trend over the past years.</p>
        </div>

        <button 
          onClick={handleSetPriceAlert}
          className="bg-red-600 text-white rounded-2xl p-4 hover:bg-red-700 transition duration-300"
        >
          Set Price Alert
          <ArrowRightCircleIcon className='ml-2 w-4 h-4 inline' />
        </button>
      </div>
    </section>
  );
};

export default HistoricalDataPage;
