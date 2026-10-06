"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export const FeaturedQuadrantCards: React.FC = () => {
  const { setFilterState } = useCart();

  const cards = [
    {
      title: "Gaming accessories",
      category: "Gaming",
      items: [
        { label: "Headsets", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
        { label: "Keyboards", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80" },
        { label: "Consoles", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80" },
        { label: "Controllers", image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=400&q=80" },
      ],
      linkText: "See more in Gaming",
    },
    {
      title: "Deals in Electronics",
      category: "Electronics",
      items: [
        { label: "Laptops", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
        { label: "Power Banks", image: "https://images.unsplash.com/photo-1609592424074-1ff2f7400d33?auto=format&fit=crop&w=400&q=80" },
        { label: "Headphones", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80" },
        { label: "Mice & Input", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80" },
      ],
      linkText: "Shop all Electronics",
    },
    {
      title: "Refresh your space",
      category: "Home & Kitchen",
      items: [
        { label: "Espresso", image: "https://images.unsplash.com/photo-1517668808822-9ede02f2a029?auto=format&fit=crop&w=400&q=80" },
        { label: "Pressure Cookers", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80" },
        { label: "Kitchenware", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80" },
        { label: "Home Decor", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80" },
      ],
      linkText: "Explore Home & Kitchen",
    },
    {
      title: "Trending in Fashion",
      category: "Fashion",
      items: [
        { label: "Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
        { label: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
        { label: "Running Gear", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80" },
        { label: "Accessories", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
      ],
      linkText: "See Fashion collection",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 relative z-20 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col justify-between bg-white dark:bg-zinc-900 p-5 rounded-lg shadow-md border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-zinc-100 mb-3">{card.title}</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {card.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        category: card.category,
                      }))
                    }
                    className="group text-left focus:outline-none"
                  >
                    <div className="relative h-24 w-full rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800 mb-1">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-zinc-300 group-hover:text-[#007185] font-medium leading-tight block truncate">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() =>
                setFilterState((prev) => ({
                  ...prev,
                  category: card.category,
                }))
              }
              className="text-xs font-bold text-[#007185] hover:text-[#c7511f] hover:underline self-start mt-2"
            >
              {card.linkText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
