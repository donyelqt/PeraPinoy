"use client"; // Ensure you are using client-side rendering
import { useState } from 'react';

const GroceryOptimizer = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [optimizedItems, setOptimizedItems] = useState([]);
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState([]); // AI suggestions state
  const [loading, setLoading] = useState(false); // Loading state for AI suggestions

  const handleAddItem = (e) => {
    e.preventDefault();
    const form = e.target;
    const newItem = {
      name: form.name.value,
      cost: parseFloat(form.cost.value),
    };
    setGroceryItems([...groceryItems, newItem]);
    form.reset();
  };

  const handleOptimize = () => {
    const { optimized, total } = optimizeGroceryList(groceryItems);
    setOptimizedItems(optimized);
    setTotalCost(total);
    
    // Get AI suggestions after optimizing the list
    generateAiSuggestions(optimized);
  };

  const optimizeGroceryList = (groceryList) => {
    const filteredList = groceryList.filter(item => item.cost <= spendingLimit);
    const optimized = filteredList.sort((a, b) => a.cost - b.cost); // Sort by cost for optimization
    const total = optimized.reduce((acc, item) => acc + item.cost, 0);
    
    return { optimized, total };
  };

  const generateAiSuggestions = (items) => {
    setLoading(true); // Set loading to true before generating suggestions

    const suggestions = items.map(item => {
      const baseSuggestion = `For ${item.name}, consider this:`;
      const priceSuggestion = item.cost < 50 ? "It's affordable, consider buying more!" : "This is a bit pricey; look for discounts.";

      // Extended list of suggestions
      const additionalSuggestions = [
        "Try to mix in more vegetables for balanced meals.",
        "Look for seasonal fruits to save money and get fresh produce.",
        "Plan meals ahead to avoid impulse purchases.",
        "Consider bulk buying for non-perishables to save costs.",
        "Check if there are any loyalty programs that can give you discounts.",
        "Try to substitute expensive items with cheaper alternatives.",
        "Buy in-season produce for better taste and lower prices.",
        "Use coupons to save on brands you already buy.",
        "Make a list before shopping to stick to your budget.",
        "Avoid shopping when hungry to reduce impulse buying.",
        "Consider generic brands; they can be cheaper and of equal quality.",
        "Track prices of items to know when to buy them on sale.",
        "Cook in batches to make use of perishable items before they spoil.",
        "Use leftovers creatively to minimize waste.",
        "Store items properly to extend their shelf life.",
        "Buy frozen fruits and vegetables; they are often cheaper and just as nutritious.",
        "Don't hesitate to ask staff for recommendations or sales!",
        "Consider community-supported agriculture (CSA) for fresh local produce at a good price.",
        "Use an app or website to compare prices at different stores before you shop."
      ];

      // Combine all suggestions into one message
      const allSuggestions = [baseSuggestion, priceSuggestion, ...additionalSuggestions].join(' ');

      return allSuggestions;
    });

    setAiSuggestions(suggestions);
    setLoading(false); // Reset loading state
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Grocery List Optimizer</h2>
      <form onSubmit={handleAddItem} className="mb-4">
        <input type="text" name="name" placeholder="Item Name" className="border p-2 mr-2 rounded-3xl" required />
        <input type="number" name="cost" placeholder="Cost" className="border p-2 mr-2 rounded-3xl" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Item</button>
      </form>
      <div className="mb-4">
        <label className="block mb-2">Set Spending Limit:</label>
        <input 
          type="number" 
          value={spendingLimit} 
          onChange={(e) => setSpendingLimit(e.target.value)} 
          className="border p-2 mb-2" 
          placeholder="Spending Limit" 
        />
      </div>
      <button onClick={handleOptimize} className="bg-green-500 text-white p-2 mb-4 rounded-3xl">Optimize List</button>
      <h3 className="text-xl font-semibold">Optimized Grocery List:</h3>
      <ul>
        {optimizedItems.map((item, index) => (
          <li key={index} className="border-b p-2">
            {item.name} - Cost: ₱{item.cost}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold">Total Cost: ₱{totalCost}</h3>
      <h3 className="text-xl font-semibold">Recommendations:</h3>
      {loading ? (
        <p>Loading recommendations...</p> // Loading message
      ) : (
        <ul>
          {aiSuggestions.length > 0 ? (
            aiSuggestions.map((suggestion, index) => (
              <li key={index} className="border-b p-2">{suggestion}</li>
            ))
          ) : (
            <li className="border-b p-2">No recommendations available.</li> // Handle no suggestions
          )}
        </ul>
      )}
    </div>
  );
};

export default GroceryOptimizer;
