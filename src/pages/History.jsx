import React from "react";
import {
    FiArrowDownCircle,
    FiArrowUpCircle,
    FiRepeat,
    FiHash,
    FiClock,
    FiDollarSign,
    FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function History() {
    const navigate = useNavigate();

    const historyData = [
        {
            id: "TXN12345678",
            type: "deposit",
            wallet: "WALLET-928371",
            amount: 1500,
            time: "2025-11-09 12:30",
        },
        {
            id: "TXN98765432",
            type: "withdraw",
            wallet: "WALLET-883192",
            amount: 800,
            time: "2025-11-08 18:20",
        },
        {
            id: "TXN555666421",
            type: "transfer",
            wallet: "WALLET-552200",
            amount: 320,
            time: "2025-11-08 10:05",
        },
        {
            id: "TXN55566521",
            type: "transfer",
            wallet: "WALLET-552200",
            amount: 120,
            time: "2025-11-08 10:05",
        },
        {
            id: "TXN55566643",
            type: "transfer",
            wallet: "WALLET-552200",
            amount: 420,
            time: "2025-11-08 10:05",
        },
        {
            id: "TXN55566677",
            type: "transfer",
            wallet: "WALLET-552200",
            amount: 120,
            time: "2025-11-08 10:05",
        }
    ];

    const shortenWallet = (address) => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="min-h-screen bg-[#0b0f29] px-6 py-8">

            {/* ✅ Back Button */}
            <button
                onClick={() => navigate('/account')}
                className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
                <FiArrowLeft className="text-lg" />
                <span className="text-sm font-medium">Back to Account</span>
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Transaction History
            </h1>

            <div className="space-y-3">
                {historyData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-[#121a3a] p-3 rounded-xl shadow-lg border border-white/5 hover:bg-[#182045] transition"
                    >
                        <div className="flex items-center gap-3">

                            {/* USDT Icon */}
                            <img
                                src="https://assets.coingecko.com/coins/images/325/large/Tether.png"
                                className="w-7 h-7 rounded-full object-cover"
                                alt="usdt"
                            />

                            <div className="flex-1">

                                {/* Type + Amount */}
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-semibold text-sm capitalize">
                                        {item.type}
                                    </span>

                                    <span className="text-white font-bold text-sm flex items-center gap-1">
                                        ${item.amount.toLocaleString()}
                                    </span>
                                </div>

                                {/* Wallet */}
                                <p className="text-gray-400 text-xs mt-1 font-mono">
                                    {shortenWallet(item.wallet)}
                                </p>

                                {/* TXID */}
                                <p className="text-gray-500 text-[11px] font-mono mt-1">
                                    TXID: {shortenWallet(item.id)}
                                </p>

                                {/* Time */}
                                <p className="text-gray-600 text-[11px] mt-1">
                                    {item.time}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default History;
