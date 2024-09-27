"use client"; // Ensure you are using client-side rendering
import { useState, useCallback } from 'react';
import { FaPlus, FaCheckCircle } from 'react-icons/fa'; // Importing icons

const categories = [
  { name: 'Fruits', priceRange: [0, 50] },
  { name: 'Vegetables', priceRange: [0, 30] },
  { name: 'Dairy', priceRange: [20, 100] },
  { name: 'Meat', priceRange: [50, 300] },
  { name: 'Snacks', priceRange: [10, 150] },
  { name: 'Grains', priceRange: [20, 100] },
];

const GroceryOptimizer = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [optimizedItems, setOptimizedItems] = useState([]);
  const [spendingLimit, setSpendingLimit] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [itemCost, setItemCost] = useState('');
  const [userHistory, setUserHistory] = useState([]);
  const [notification, setNotification] = useState('');

  const handleAddItem = useCallback((e) => {
    e.preventDefault();
    const newItem = {
      category: selectedCategory,
      cost: parseFloat(itemCost),
    };

    setUserHistory((prev) => [...prev, newItem]);
    setGroceryItems((prevItems) => [...prevItems, newItem]);
    setItemCost('');

    setNotification(`Added ${selectedCategory} - Cost: ₱${newItem.cost}`);
    setTimeout(() => setNotification(''), 3000);
  }, [selectedCategory, itemCost]);

  const optimizeGroceryList = useCallback((groceryList) => {
    const filteredList = groceryList.filter(item => item.cost <= parseFloat(spendingLimit));
    const optimized = filteredList.sort((a, b) => a.cost - b.cost);
    const total = optimized.reduce((acc, item) => acc + item.cost, 0);
    return { optimized, total };
  }, [spendingLimit]);

  const getSuggestionsForItem = (item) => {
    const categoryInfo = categories.find(cat => cat.name === item.category);
    const [minPrice, maxPrice] = categoryInfo.priceRange;

    const suggestions = [];
    const baseSuggestion = `For ${item.category}, consider this:`;
    const priceSuggestion = item.cost < minPrice 
      ? "It's very affordable; consider buying more!" 
      : item.cost <= maxPrice
      ? "It's affordable; consider buying more!" 
      : "This is a bit pricey; look for discounts.";
    
    suggestions.push(baseSuggestion, priceSuggestion);

    if (item.cost < minPrice) {
      suggestions.push(
        "Try to mix in more vegetables for balanced meals.",
        "Look for seasonal fruits to save money and get fresh produce.",
        "Consider buying in bulk for non-perishables.",
        "Use coupons to save on brands you already buy."
      );
    } else if (item.cost <= maxPrice) {
      suggestions.push(
        "Track prices of items to know when to buy them on sale.",
        "Check for loyalty programs that offer discounts.",
        "Consider buying generic brands for savings."
      );
    } else {
      suggestions.push(
        "Consider looking for sales or discounts to reduce costs.",
        "Evaluate if this item is necessary; it may be better to skip it this time."
      );
    }

    return suggestions;
  };

  // New function to get recommendations based on user history
  const getMLBasedSuggestions = useCallback(() => {
    const categoryCounts = userHistory.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const recommendedCategory = Object.keys(categoryCounts).reduce((a, b) => 
      categoryCounts[a] > categoryCounts[b] ? a : b
    );

    return `Based on your previous purchases, you might want to buy more from the ${recommendedCategory} category!`;
  }, [userHistory]);

  const generateAiSuggestions = useCallback((items) => {
    setLoading(true);
    const suggestions = items.flatMap(getSuggestionsForItem);
    const mlSuggestion = getMLBasedSuggestions();
    setAiSuggestions([...suggestions, mlSuggestion]);
    setLoading(false);
  }, [getSuggestionsForItem, getMLBasedSuggestions]);

  const handleOptimize = useCallback(() => {
    const { optimized, total } = optimizeGroceryList(groceryItems);
    setOptimizedItems(optimized);
    setTotalCost(total);
    generateAiSuggestions(optimized);
  }, [groceryItems, optimizeGroceryList, generateAiSuggestions]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-orange">AI Grocery List Optimization</h2>
      {notification && (
        <div className="bg-green-500 text-white p-4 rounded-md shadow-md mb-4 flex items-center">
          <FaCheckCircle className="mr-2" />
          <span>{notification}</span>
        </div>
      )}
      <div className="bg-white border shadow-lg rounded-3xl p-6 mb-4">
        <form onSubmit={handleAddItem} className="flex flex-col gap-2 sm:flex-row">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="border p-2 mr-2 rounded-2xl flex-1"
          >
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input 
            type="number" 
            value={itemCost} 
            onChange={(e) => setItemCost(e.target.value)} 
            className="border p-2 mr-2 rounded-2xl flex-1" 
            placeholder="Cost" 
            required 
          />
          <button type="submit" className="bg-orange text-white p-2 rounded-3xl mt-2 sm:mt-0 flex items-center hover:bg-secondary">
            <FaPlus className="mr-1" /> Add Item
          </button>
        </form>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-6 mb-4">
        <label className="block mb-2 font-semibold">Set Spending Limit:</label>
        <input 
          type="number" 
          value={spendingLimit} 
          onChange={(e) => setSpendingLimit(e.target.value)} 
          className="border p-2 mb-4 rounded-2xl w-full" 
          placeholder="Spending Limit" 
        />
        <button onClick={handleOptimize} className="bg-orange text-white p-2 rounded-2xl hover:bg-secondary">
          Optimize List
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-6 mb-4">
        <h3 className="text-xl font-semibold">Optimized Grocery List:</h3>
        <ul>
          {optimizedItems.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item.category} - Cost: ₱{item.cost}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4">Total Cost: <span className='text-orange'>₱{totalCost}</span></h3>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-6 mb-4">
        <h3 className="text-xl font-semibold">AI - Assisted Recommendations:</h3>
        {loading ? (
          <p>Loading recommendations...</p>
        ) : (
          <ul>
            {aiSuggestions.length > 0 ? (
              aiSuggestions.map((suggestion, index) => (
                <li key={index} className="border-b py-2">{suggestion}</li>
              ))
            ) : (
              <li className="border-b py-2">No recommendations available.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroceryOptimizer;
