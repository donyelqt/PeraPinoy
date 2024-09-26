"use client"; // Ensure you are using client-side rendering
import { useState, useCallback } from 'react';

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
  const [userHistory, setUserHistory] = useState([]); // Store user history

  const handleAddItem = useCallback((e) => {
    e.preventDefault();
    const newItem = {
      category: selectedCategory,
      cost: parseFloat(itemCost),
    };

    // Save the item to history for potential ML use
    setUserHistory((prev) => [...prev, newItem]);

    setGroceryItems((prevItems) => [...prevItems, newItem]);
    setItemCost(''); // Reset cost input to empty string
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

  const getMLBasedSuggestions = useCallback(() => {
    // Basic ML logic to recommend based on purchase history
    const categoryCounts = userHistory.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    // Recommend the category with the most purchases
    const recommendedCategory = Object.keys(categoryCounts).reduce((a, b) => 
      categoryCounts[a] > categoryCounts[b] ? a : b
    );

    return `Based on your previous purchases, you might want to buy more from the ${recommendedCategory} category!`;
  }, [userHistory]);

  const generateAiSuggestions = useCallback((items) => {
    setLoading(true);
    const suggestions = items.flatMap(getSuggestionsForItem);
    const mlSuggestion = getMLBasedSuggestions(); // Get ML-based suggestion
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
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-orange">Grocery List Optimizer</h2>
      <form onSubmit={handleAddItem} className="mb-4">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className="border p-2 mr-2 rounded-3xl"
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
          className="border p-2 mr-2 rounded-3xl" 
          placeholder="Cost" 
          required 
        />
        <button type="submit" className="bg-orange text-white p-2 rounded-3xl mt-2 hover:bg-secondary">Add Item</button>
      </form>
      <div className="mb-4">
        <label className="block mb-2 rounded-3xl">Set Spending Limit:</label>
        <input 
          type="number" 
          value={spendingLimit} 
          onChange={(e) => setSpendingLimit(e.target.value)} 
          className="border p-2 mb-2 rounded-3xl" 
          placeholder="Spending Limit" 
        />
      </div>
      <button onClick={handleOptimize} className="bg-orange text-white p-2 mb-4 rounded-3xl hover:bg-secondary">Optimize List</button>
      <h3 className="text-xl font-semibold">Optimized Grocery List:</h3>
      <ul>
        {optimizedItems.map((item, index) => (
          <li key={index} className="border-b p-2">
            {item.category} - Cost: ₱{item.cost}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold">Total Cost: <span className='text-orange'>₱{totalCost}</span></h3>
      <h3 className="text-xl font-semibold">Recommendations:</h3>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <ul>
          {aiSuggestions.length > 0 ? (
            aiSuggestions.map((suggestion, index) => (
              <li key={index} className="border-b p-2">{suggestion}</li>
            ))
          ) : (
            <li className="border-b p-2">No recommendations available.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default GroceryOptimizer;
