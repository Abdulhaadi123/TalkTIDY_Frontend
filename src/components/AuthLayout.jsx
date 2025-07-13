import React from 'react';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-green-700">PRESENTLY</h1>
          <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
        </div>
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
