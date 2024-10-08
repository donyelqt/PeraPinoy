"use client"; // Ensure you are using client-side rendering
import { useState, useCallback } from 'react';
import { FaPlus, FaCheckCircle } from 'react-icons/fa'; // Importing icons

const categories = [
  // Food and Groceries
  { name: 'Fruits', priceRange: [0, 50] },
  { name: 'Vegetables', priceRange: [0, 30] },
  { name: 'Dairy', priceRange: [20, 100] },
  { name: 'Meat', priceRange: [50, 300] },
  { name: 'Snacks', priceRange: [10, 150] },
  { name: 'Grains', priceRange: [20, 100] },

  // Fashion
  { name: 'Clothing', priceRange: [100, 3000] },
  { name: 'Footwear', priceRange: [200, 5000] },

  // Entertainment
  { name: 'Books', priceRange: [50, 1000] },
  { name: 'Toys', priceRange: [50, 2000] },

  // Home Goods
  { name: 'Home Goods', priceRange: [100, 10000] },
  { name: 'Furniture', priceRange: [1000, 50000] },
  { name: 'Appliances', priceRange: [1000, 30000] },
  { name: 'Kitchenware', priceRange: [50, 5000] },

  // Personal Care & Health
  { name: 'Beauty & Personal Care', priceRange: [50, 5000] },
  { name: 'Health Products', priceRange: [50, 5000] },
  { name: 'Pet Supplies', priceRange: [20, 5000] },

  // Stationery and Office Supplies
  { name: 'Stationery', priceRange: [10, 500] },
  { name: 'Office Supplies', priceRange: [10, 1000] },

  // Sports Equipment
  { name: 'Sports Equipment', priceRange: [100, 20000] },

  // Technology Categories
  { name: 'Smartphones', priceRange: [5000, 80000] },
  { name: 'Laptops', priceRange: [15000, 120000] },
  { name: 'Tablets', priceRange: [8000, 60000] },
  { name: 'Smartwatches', priceRange: [3000, 40000] },
  { name: 'Headphones', priceRange: [1000, 15000] },
  { name: 'Gaming Consoles', priceRange: [15000, 60000] },
  { name: 'Cameras', priceRange: [5000, 100000] },
  { name: 'Printers', priceRange: [3000, 20000] },
  { name: 'Monitors', priceRange: [5000, 50000] },
  { name: 'Routers', priceRange: [2000, 15000] },
  { name: 'Drones', priceRange: [10000, 150000] },
  { name: 'VR Headsets', priceRange: [10000, 70000] },
];

const ShoppingOptimizer = () => {
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
        ? "It's a good deal; go for it!"
        : "This is a bit pricey; you may want to wait for a sale or discount.";

    suggestions.push(baseSuggestion, priceSuggestion);

    if (item.cost < minPrice) {
      suggestions.push(
        `For ${item.category}, consider comparing prices online for deals.`,
        "Look for seasonal sales to save on purchases.",
        "Check online reviews for quality before making bulk purchases."
      );
    } else if (item.cost <= maxPrice) {
      suggestions.push(
        `For ${item.category}, you might want to consider extended warranties.`,
        "Consider using cashback or discount cards for better savings.",
        "Compare similar item prices to get the best value."
      );
    } else {
      suggestions.push(
        "If this item is essential, consider looking for installment payment options.",
        "Evaluate if this item is necessary now; waiting might get you a better price.",
        "Consider alternative models or brands that offer similar features for a lower cost."
      );
    }

    return suggestions;
  };

  // Function to get recommendations based on user history
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
      <h2 className="text-3xl font-bold mb-6 text-orange">AI Shopping List Optimization</h2>
      {notification && (
        <div className="bg-green-500 text-white p-4 rounded-md shadow-md mb-4 flex items-center">
          <FaCheckCircle className="mr-2" />
          <span>{notification}</span>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-3xl p-6 mb-4">
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
        <h3 className="text-xl font-semibold text-orange mb-4">Items:</h3>
        {groceryItems.length > 0 ? (
          <ul className="list-disc pl-5">
            {groceryItems.map((item, index) => (
              <li key={index} className="py-2">
                {item.category} - Cost: ₱{item.cost}
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-2">No items added.</p>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-6 mb-4">
        <h3 className="text-xl font-semibold text-orange mb-4">Set Spending Limit:</h3>
        <input
          type="number"
          value={spendingLimit}
          onChange={(e) => setSpendingLimit(e.target.value)}
          className="border p-2 rounded-2xl w-full"
          placeholder="Enter spending limit"
        />
        <button onClick={handleOptimize} className="bg-orange text-white p-2 rounded-3xl mb-4 mt-4 hover:bg-secondary">
          Optimize Grocery List
        </button>
      </div>



      {optimizedItems.length > 0 && (
        <div className="bg-white shadow-lg rounded-3xl p-6 mb-4">
          <h3 className="text-xl font-semibold mb-4 text-orange">Optimized Shopping List:</h3>
          <ul className="list-disc pl-5">
            {optimizedItems.map((item, index) => (
              <li key={index} className="py-2">
                {item.category} - Cost: ₱{item.cost}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total Cost: <span className='text-orange'>₱{totalCost}</span></p>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-3xl p-6 mb-4">
        <h3 className="text-xl text-orange font-semibold mb-4">AI-Assisted Recommendations:</h3>

        {loading ? (
          <p className="font-bold text-gray-700">Loading recommendations...</p>
        ) : (
          <div>
            {aiSuggestions.length > 0 ? (
              <ul className="list-disc pl-5">
                {aiSuggestions.map((suggestion, index) => (
                  <li key={index} className="py-2  text-gray-800">
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-2 font-bold text-gray-600">No recommendations available.</p>
            )}

            {/* Additional Information Section */}
            <div className="mt-4 p-2 border-t border-gray-300">
              <h4 className="text-lg font-semibold">Additional Tips:</h4>
              <ul className="list-disc pl-5">
                <li>Check for seasonal sales to maximize savings.</li>
                <li>Compare prices across different platforms before purchasing.</li>
                <li>Consider buying in bulk for frequently used items.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingOptimizer;

