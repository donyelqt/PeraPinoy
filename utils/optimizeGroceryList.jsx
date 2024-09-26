const optimizeGroceryList = (groceryList) => {
    return groceryList.sort((a, b) => {
      const valueA = a.cost / a.nutrition;
      const valueB = b.cost / b.nutrition;
      return valueA - valueB;
    });
  };
  
  export default optimizeGroceryList;
  