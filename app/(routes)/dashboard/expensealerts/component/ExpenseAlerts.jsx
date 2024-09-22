"use client"; // This marks the component as a Client Component

import React, { useState, useEffect } from 'react';
import { MdElectricalServices, MdCreditCard, MdWaterDrop, MdDelete } from 'react-icons/md'; // Importing icons

const ExpenseAlerts = () => {
  const [alerts, setAlerts] = useState(() => {
    // Get alerts from localStorage or set to an empty array
    const savedAlerts = localStorage.getItem('alerts');
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  const [newAlert, setNewAlert] = useState({
    type: '',
    amount: '',
    dueDate: '',
    urgency: 'normal',
  });

  useEffect(() => {
    // Save alerts to localStorage whenever alerts change
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  const handleAddAlert = () => {
    const id = alerts.length + 1;
    const alertToAdd = { id, ...newAlert };
    setAlerts([...alerts, alertToAdd]);
    setNewAlert({ type: '', amount: '', dueDate: '', urgency: 'normal' });
  };

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'electricity':
        return <MdElectricalServices className="text-yellow-500" size={24} />;
      case 'credit card':
        return <MdCreditCard className="text-blue-500" size={24} />;
      case 'water':
        return <MdWaterDrop className="text-blue-400" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg p-5 md:p-10 lg:p-10 mb-40 mx-auto space-y-6">
      <h2 className="text-4xl md:text-5xl font-semibold text-tertiary text-center">Expense Alerts</h2>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 border rounded-lg shadow-md flex justify-between items-center ${
            alert.urgency === 'overdue' ? 'border-red-600' : alert.urgency === 'soon' ? 'border-orange-400' : 'border-blue-600'
          }`}
        >
          <div className="flex items-center">
            {getIcon(alert.type)} {/* Render the icon based on the alert type */}
            <div className="ml-3">
              <div className="text-lg text-blue-300 font-semibold">{alert.type}</div>
              <div className="text-gray-400">{alert.dueDate}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl text-blue-600 font-bold">{alert.amount}</div>
            <button
              onClick={() => handleDeleteAlert(alert.id)}
              className="mt-2 py-2 p-2 text-sm font-medium rounded-md bg-red-700 hover:bg-yellow-600 text-slate-300 flex items-center"
            >
              <MdDelete className='flex items-center' size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}

      <div className="p-4 border rounded-lg shadow-md bg-transparent">
        <h3 className="text-lg font-semibold text-tertiary mb-4">Add New Expense Alert</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Type (Electricity, Credit Card, Water)"
            value={newAlert.type}
            onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="text"
            placeholder="Amount (e.g., ₱ 3,500)"
            value={newAlert.amount}
            onChange={(e) => setNewAlert({ ...newAlert, amount: e.target.value })}
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="text"
            placeholder="Due Date (e.g., Due in 3 days)"
            value={newAlert.dueDate}
            onChange={(e) => setNewAlert({ ...newAlert, dueDate: e.target.value })}
            className="w-full p-2 border rounded-xl"
          />
          <select
            value={newAlert.urgency}
            onChange={(e) => setNewAlert({ ...newAlert, urgency: e.target.value })}
            className="w-full p-2 border rounded-xl"
          >
            <option value="normal">Normal</option>
            <option value="soon">Soon</option>
            <option value="overdue">Overdue</option>
          </select>
          <button
            onClick={handleAddAlert}
            className="w-full p-2 bg-blue-500 text-white rounded-3xl mt-3 hover:bg-blue-600 transition"
          >
            Add Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAlerts;

