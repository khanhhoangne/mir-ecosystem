import React from 'react';
import { FiAlertTriangle, FiChevronRight, FiLogOut, FiRefreshCw, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function Account() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const username = user?.email ? user.email.split("@")[0] : "";
  const initial = username.charAt(0).toUpperCase();

  // Logout và redirect về login
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Switch account = logout + redirect
  const handleSwitchAccount = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#0b0f29] px-6">
      <div className="w-full max-w-2xl text-center space-y-6 p-8 bg-[#121a3a] rounded-3xl shadow-2xl">

        {/* User Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white text-2xl font-bold">
            {initial}
          </div>
          <p className="text-white text-xl font-semibold">{username}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <button
              onClick={() => navigate('/history')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
            >
              <FiClock />
              History Transactions
            </button>

            <button
              onClick={handleSwitchAccount}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
            >
              <FiRefreshCw />
              Switch Account
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-semibold"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

        {/* Balance Box */}
        <div className="bg-[#161f47] w-full py-4 px-6 rounded-2xl shadow-xl flex flex-col items-center">
          <span className="text-gray-400 text-sm">Balance</span>
          <div className="flex items-center gap-2 mt-2">
            <img
              src="https://assets.coingecko.com/coins/images/325/large/Tether.png"
              className="w-7 h-7 rounded-full"
              alt="usdt"
            />
            <p className="text-lg sm:text-2xl font-bold text-white">
              1,500,000 USDT
            </p>
          </div>
        </div>

        {/* Membership */}
        <div className="bg-[#161f47] w-full py-4 px-6 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Membership</p>
            <p className="text-white text-xl font-bold mt-1">Lv4</p>
          </div>
          <span className="text-purple-400 font-semibold">Diamond Tier</span>
        </div>

      </div>
    </div>
  );
}

export default Account;
