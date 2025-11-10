import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Transfer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0f1535] to-[#131a42] px-6 py-6 text-gray-200">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
      >
        <FiArrowLeft className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Title */}
      <h1 className="text-xl font-semibold text-center mb-8 text-purple-300">
        Internal Transfer
      </h1>

      {/* Card Container */}
      <div className="bg-[#121a3a] p-4 rounded-2xl shadow-xl space-y-4">

        {/* Balance */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Balance</p>
          <div className="bg-[#161f47] p-4 rounded-xl text-gray-100 font-semibold shadow-inner">
            1,500,000.00 tether (USDT)
          </div>
        </div>

        {/* Account */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Account</p>
          <input
            type="text"
            placeholder="Recipient Must Be At Least VIP1"
            className="w-full p-4 rounded-xl bg-[#161f47] border border-white/10 
                       text-gray-100 placeholder-gray-500 outline-none 
                       focus:border-purple-400 transition"
          />
        </div>

        {/* Quantity */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Quantity</p>
          <input
            type="number"
            placeholder="Please Enter Transfer Amount"
            className="w-full p-4 rounded-xl bg-[#161f47] border border-white/10 
                       text-gray-100 placeholder-gray-500 outline-none 
                       focus:border-purple-400 transition"
          />
        </div>
      </div>

      {/* Transfer Button */}
      <div className="flex justify-center">
        <button
          className="w-full sm:max-w-xs md:max-w-sm mt-8 py-4 
                     bg-linear-to-r from-green-400 to-green-600 text-white 
                     rounded-2xl shadow-xl font-semibold text-lg transition
                     hover:brightness-110"
        >
          Internal Transfer
        </button>
      </div>

      {/* VIP Warning */}
      <p className="text-center text-sm text-red-400 mt-6 font-medium">
        VIP Members Can Use One-click Transfer Without Key
      </p>

      {/* Transfer Limit List */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-gray-200 mb-4">
          Transfer and receiving limit (days)
        </h2>

        <ul className="space-y-2 text-gray-300 text-sm">
          <li>VIP1 ( 10.00 USDT )</li>
          <li>VIP2 ( 100.00 USDT )</li>
          <li>VIP3 ( 30,000.00 USDT )</li>
          <li>VIP4 ( 100,000.00 USDT )</li>
          <li>VIP5 ( 200,000.00 USDT )</li>
          <li>VIP6 ( 2,000,000.00 USDT )</li>
        </ul>
      </div>

    </div>
  );
}

export default Transfer;
