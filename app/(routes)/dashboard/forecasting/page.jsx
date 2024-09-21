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

const FinancialForecastingPage = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('🍚');
  const [chartData, setChartData] = useState({
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [{
      label: 'Price Trends',
      data: [50, 52, 55, 54, 56, 57, 58, 59, 60, 61, 62, 63], // Initial price for fuel
      borderColor: 'rgba(255, 0, 0, 1)', // Red line color
      backgroundColor: 'rgba(255, 0, 0, 0.2)', // Light red background
      fill: true,
    }],
  });

  // Price data based on the Philippine market (in PHP) for each month
  const commodityData = {
    fuel: [50, 52, 55, 54, 56, 57, 58, 59, 60, 61, 62, 63],
    rice: [40, 42, 41, 43, 44, 45, 46, 47, 48, 49, 50, 51],
    eggs: [6, 6.5, 6.3, 6.7, 7, 7.2, 7.5, 7.8, 8, 8.5, 8.7, 9],
    fish: [80, 82, 81, 84, 83, 85, 87, 86, 88, 89, 90, 91],
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
    <section className="text-gray-200 p-4 md:p-12 lg:p-16">
      <h1 className='font-bold text-3xl text-tertiary md:text-5xl mb-6 text-center'>Commodity Forecasting</h1>
      <div className="container bg-transparent border p-10 rounded-3xl mx-auto">
        <div className="mb-8">
          <label className="block mb-2 text-tertiary text-lg">Select Commodity:</label>
          <select onChange={handleCommodityChange} className="border bg-slate-300 text-dark rounded-2xl p-3 mb-4 w-[120px] md:w-[15%]">
            {[
              { name: 'Fuel ⛽', value: 'fuel' },
              { name: 'Rice 🍚', value: 'rice' },
              { name: 'Eggs 🥚', value: 'eggs' },
              { name: 'Fish 🐟', value: 'fish' }
            ].map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 h-72 md:h-96 bg-slate-300 p-5 md:p-10 rounded-3xl">
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="mb-4">
          <h2 className="text-lg text-tertiary font-semibold">Forecast Insights</h2>
          <p className='text-slate-400'>Prices expected to rise</p>
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

export default FinancialForecastingPage;



