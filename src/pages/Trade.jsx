import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Trade() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#0b0f29] px-6">
      <div className="w-full max-w-2xl text-center space-y-6 p-10 bg-[#121a3a] rounded-3xl shadow-xl">
        <div className="flex justify-center">
          <FiAlertTriangle className="text-yellow-400 w-16 h-16 animate-bounce" />
        </div>

        {/* Title */}
        <h1 className="text-xl lg:text-3xl font-bold text-white">
          🚧 Under Maintenance
        </h1>

        {/* Description */}
        <p className="text-sm lg:text-lg text-gray-400">
          Sorry! This page is currently under maintenance. <br />
          Please check back later.
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition text-base lg:text-lg"
        >
          <strong>Go Back Home</strong>
        </button>
      </div>

    </div>
  );
}

export default Trade;
