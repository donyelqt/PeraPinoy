const RewardsSystem = () => {
    return (
      <div className="bg-slate-900 shadow-lg rounded-lg p-6">
        <h2 className="text-xl text-tertiary font-semibold mb-2">Your Savings Rewards</h2>
        <p className="text-gray-500">Current Points: <span className="font-bold text-green-600">1,250</span></p>
        <p className="text-gray-500">You need <span className="font-bold text-red-600">750</span> more points for your next reward!</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">View Rewards</button>
        
        {/* Add the progress bar here */}
        <div className="bg-red-500 rounded-full h-2.5 w-full mt-4">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">60% of your next reward achieved!</p>
  
        {/* Add rewards list here */}
        <ul className="divide-y divide-gray-200 mt-4">
          <li className="py-4 flex justify-between">
            <div>
              <h3 className="text-lg text-tertiary font-medium">Stickers Reward</h3>
              <p className="text-gray-500">Redeem 1,000 points</p>
            </div>
            <span className="text-green-600 font-bold">Available</span>
          </li>
          <li className="py-4 flex justify-between">
            <div>
              <h3 className="text-lg text-tertiary font-medium">Gift Coupons</h3>
              <p className="text-gray-500">Redeem 500 points</p>
            </div>
            <span className="text-red-600 font-bold">Not Available</span>
          </li>
        </ul>
      </div>
    );
  };
  
  export default RewardsSystem;