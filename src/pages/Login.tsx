import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // src/pages/Login.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const user = await login(email, password);
  if (user) {
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('user', JSON.stringify(user)); // ✅ Store user info
    navigate('/dashboard');
  } else {
    setError('Invalid email or password');
  }
};


  return (
    <div className="flex min-h-screen">
      {/* Left section: login form */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
        <h2 className="text-3xl font-bold mb-6">Welcome back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="accent-blue-600" />
            <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Right section: description */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">ticktock</h1>
        <p className="text-lg leading-relaxed">
          Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
        </p>
      </div>
    </div>
  );
};

export default Login;
