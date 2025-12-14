'use client'
import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoMdPersonAdd } from "react-icons/io";
import { registerUser } from '@/app/services/auth';
import AlertBox from '../../components/Alert-Succes'; 

export default function AddUsersPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value ?? ''  // ensures value never undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak sesuai");
      return;
    }
    setError('');
    try {
      const username = `${formData.name}`;
      const result = await registerUser({
        username,
        email: formData.email,
        password: formData.password
      });
      
      setSuccess("User berhasil ditambahkan!");
      handleReset();
    } catch (err) {
      setError(err.message || 'Gagal mendaftar');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="flex justify-center items-center flex-1 bg-gray-50 py-10">

      {success && (
        <div className="absolute top-6 z-100">
          <AlertBox Message={success} />
        </div>
      )}

      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <IoMdPersonAdd className='text-2xl text-primary' />
            <h2 className="card-title text-2xl font-bold">Masukan Data User Baru</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/** Nama Depan **/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name ?? ''}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/** Email **/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email ?? ''}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/** Password **/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password ?? ''}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
                <span onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                  {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                </span>
              </div>
            </div>

            {/** Konfirmasi Password **/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Konfirmasi Password</span>
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword ?? ''}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
                <span onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                  {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                </span>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="card-actions justify-end mt-6">
              <button type="button" onClick={handleReset} className="btn btn-outline">Reset</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
