"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, MapPin, Check } from "lucide-react";

const POPULAR_LOCATIONS = [
  { city: "New York", zip: "10001", state: "NY" },
  { city: "Los Angeles", zip: "90001", state: "CA" },
  { city: "Chicago", zip: "60601", state: "IL" },
  { city: "Houston", zip: "77001", state: "TX" },
  { city: "Seattle", zip: "98101", state: "WA" },
  { city: "London", zip: "EC1A 1BB", state: "UK" },
];

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, deliveryLocation, updateDeliveryLocation } = useCart();
  const [zipInput, setZipInput] = useState("");

  if (!isLocationModalOpen) return null;

  const handleApplyZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim()) {
      updateDeliveryLocation(`Zip Code ${zipInput.trim()}`);
      setIsLocationModalOpen(false);
      setZipInput("");
    }
  };

  const handleSelectCity = (city: string, zip: string) => {
    updateDeliveryLocation(`${city} ${zip}`);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800">
        <button
          onClick={() => setIsLocationModalOpen(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 border-b pb-3 mb-4 dark:border-zinc-800">
          <MapPin className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-bold">Choose your location</h3>
        </div>

        <p className="text-xs text-gray-600 dark:text-zinc-400 mb-4">
          Delivery options and delivery speeds may vary for different locations.
        </p>

        {/* Zip Code Form */}
        <form onSubmit={handleApplyZip} className="flex gap-2 mb-6">
          <input
            type="text"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            placeholder="Enter US zip code"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          />
          <button
            type="submit"
            className="rounded-md bg-amber-400 px-4 py-2 text-xs font-bold text-gray-900 shadow hover:bg-amber-500"
          >
            Apply
          </button>
        </form>

        <div className="relative flex items-center justify-center mb-4">
          <span className="bg-white dark:bg-zinc-900 px-3 text-[11px] text-gray-400 uppercase font-semibold">
            Or select popular city
          </span>
          <div className="absolute inset-x-0 h-px bg-gray-200 dark:bg-zinc-800 -z-10" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {POPULAR_LOCATIONS.map((item) => {
            const locStr = `${item.city} ${item.zip}`;
            const isSelected = deliveryLocation === locStr;
            return (
              <button
                key={item.city}
                onClick={() => handleSelectCity(item.city, item.zip)}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition ${
                  isSelected
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 font-bold"
                    : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                }`}
              >
                <div>
                  <div className="font-medium">{item.city}</div>
                  <div className="text-[10px] text-gray-500 dark:text-zinc-400">{item.zip}</div>
                </div>
                {isSelected && <Check className="h-4 w-4 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
