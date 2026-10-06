"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, UserCheck, ShieldCheck, Mail, User as UserIcon } from "lucide-react";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, updateUser } = useCart();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [zipCode, setZipCode] = useState(user.zipCode);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      address,
      city,
      state: user.state || "NY",
      zipCode,
    });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 border-b pb-3 mb-4 dark:border-zinc-800">
          <UserCheck className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-bold">Your Amazon Account</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
              Street Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-[#ffd814] py-2.5 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
            >
              Save Profile & Sign In
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-zinc-400 pt-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Secured with Amazon 256-bit encryption</span>
          </div>
        </form>
      </div>
    </div>
  );
};
