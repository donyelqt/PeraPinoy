const RewardsSystem = () => {
    return (
      <div className="shadow-xl border rounded-3xl p-6">
        <h2 className="text-xl text-tertiary font-semibold mb-2">Your Savings Rewards</h2>
        <p className="text-gray-500">Current Savings: <span className="font-bold text-green-600">1,000</span></p>
        <p className="text-gray-500">Meet Savings: <span className="font-bold text-green-600">5,000</span></p>
        <p className="text-gray-500">You need <span className="font-bold text-red-600">4,000</span> more savings for your next reward!</p>
        <button className="mt-4 bg-orange text-white py-2 px-4 rounded-3xl hover:bg-secondary">View Rewards</button>
        <button className="mt-4 flex justify-center bg-secondary text-white py-2 px-4 rounded-3xl hover:bg-red-7000">View Leaderboards</button>
        
        {/* Add the progress bar here */}
        <div className="bg-red-500 rounded-full h-2.5 w-full mt-4">
          <div className="bg-orange h-2.5 rounded-full" style={{ width: '20%' }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">20% of your next reward achieved!</p>
  
        {/* Add rewards list here */}
        <ul className="divide-y divide-gray-200 mt-4">
          <li className="py-4 flex justify-between">
            <div>
              <h3 className="text-lg text-tertiary font-medium">Stickers Reward</h3>
              <p className="text-gray-500">Redeem</p>
            </div>
            <span className="text-green-600 font-bold">Available</span>
          </li>
          <li className="py-4 flex justify-between">
            <div>
              <h3 className="text-lg text-tertiary font-medium">Gift Coupons</h3>
              <p className="text-gray-500">Redeem</p>
            </div>
            <span className="text-red-600 font-bold">Not Available</span>
          </li>
        </ul>
      </div>
    );
  };
  
  export default RewardsSystem;