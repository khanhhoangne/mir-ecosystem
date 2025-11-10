import React from "react";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Withdraw() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-b from-[#0f1535] to-[#131a42] px-6 py-6 text-gray-200">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
            >
                <FiArrowLeft className="text-xl" />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Title */}
            <div className="flex items-center justify-center gap-6 mb-8">
                <h1 className="text-xl font-semibold text-purple-300">Withdraw</h1>
            </div>

            {/* Network Selector */}
            <div className="bg-[#121a3a] p-4 rounded-2xl shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="https://assets.coingecko.com/coins/images/325/large/Tether.png"
                        className="w-10 h-10 rounded-full"
                        alt="USDT"
                    />
                    <div>
                        <p className="font-semibold">TRC20-USDT</p>
                        <p className="text-xs text-gray-400">Tether Network</p>
                    </div>
                </div>
                <FiChevronDown className="text-gray-300 text-xl" />
            </div>

            {/* Balance */}
            <div className="mt-6">
                <p className="text-sm text-gray-400 mb-1">Balance</p>
                <div className="bg-[#121a3a] p-4 rounded-xl shadow-md text-gray-100">
                    1,500,000.00 USDT
                </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
                <p className="text-sm text-gray-400 mb-1">Quantity</p>
                <input
                    type="number"
                    placeholder="5 - 10,000,000"
                    className="w-full p-4 rounded-xl bg-[#121a3a] border border-white/10
                     text-gray-100 placeholder-gray-500 outline-none focus:border-purple-400 transition"
                />
            </div>

            {/* Wallet Address */}
            <div className="mt-6">
                <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                <input
                    type="text"
                    placeholder="Please Enter Wallet Address"
                    className="w-full p-4 rounded-xl bg-[#121a3a] border border-white/10
                     text-gray-100 placeholder-gray-500 outline-none focus:border-purple-400 transition"
                />
            </div>

            {/* Key Password */}
            <div className="mt-6">
                <p className="text-sm text-gray-400 mb-1">Key</p>
                <input
                    type="password"
                    placeholder="Please Enter Key Password"
                    className="w-full p-4 rounded-xl bg-[#121a3a] border border-white/10
                     text-gray-100 placeholder-gray-500 outline-none focus:border-purple-400 transition"
                />
            </div>

            {/* Security Tip */}
            <div className="mt-6 text-xs leading-5">
                <p className="text-gray-300">
                    Security Tip: Please fill in your USDT address accurately, otherwise virtual currency withdrawals cannot be refunded.
                </p>
                <strong className="text-red-400 mt-2">
                    After the withdrawal is completed, if you haven't received USDT, please contact customer service for resolution.
                </strong>
            </div>

            {/* Withdraw Button */}
            <button
                className="w-full sm:max-w-xs md:max-w-sm mx-auto 
             mt-8 py-4 bg-purple-600 hover:bg-purple-700 
             text-white rounded-2xl shadow-xl font-semibold 
             text-lg transition block"
            >
                Withdraw Now
            </button>

        </div>
    );
}

export default Withdraw;
