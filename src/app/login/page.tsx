"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  
import  Link  from 'next/link';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading , setLoading] = useState(false)

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('All fields are required!');
      setLoading(false)
      return;
    }

    try {
      const req = await axios.post('https://yo-backend.onrender.com/auth/login',formData,{withCredentials:true});
      if(req.status === 200)
        router.push('/dashboard')
    }catch (error:any) {
      console.log(error)
        setError(error.response.data.message)
    }finally{
      setLoading(false)
    }  
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
      <div className="m-4 md:m-0 bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
