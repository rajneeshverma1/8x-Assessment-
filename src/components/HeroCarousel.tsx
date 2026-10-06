"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  bgGradient: string;
  imageUrl: string;
  buttonText: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Mega Electronics Festival",
    subtitle: "Up to 40% OFF on Top Audio, Laptops & Smart Devices",
    tag: "LIMITED TIME DEAL",
    bgGradient: "from-slate-900 via-indigo-950 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Shop Electronics",
  },
  {
    id: 2,
    title: "Unbeatable Fashion & Footwear",
    subtitle: "Refresh your wardrobe with trending sneakers & designer apparel",
    tag: "PRIME MEMBER DEALS",
    bgGradient: "from-amber-950 via-red-950 to-zinc-900",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Explore Style",
  },
  {
    id: 3,
    title: "Upgrade Your Home & Kitchen",
    subtitle: "Premium coffee makers, espresso machines & smart appliances",
    tag: "BEST SELLERS",
    bgGradient: "from-emerald-950 via-teal-950 to-slate-900",
    imageUrl: "https://images.unsplash.com/photo-1517668808822-9ede02f2a029?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Discover Home",
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 text-white">
      {/* Background Slides */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-gradient-to-r ${slide.bgGradient} ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12">
              
              {/* Left Content */}
              <div className="max-w-lg space-y-3 z-20">
                <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
                  {slide.tag}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-200 drop-shadow">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => alert(`Navigating to ${slide.title}`)}
                  className="mt-2 inline-flex items-center rounded-md bg-[#febd69] px-5 py-2.5 text-xs font-bold text-gray-900 shadow-lg hover:bg-[#f3a847] transition transform active:scale-95"
                >
                  {slide.buttonText}
                </button>
              </div>

              {/* Right Image Banner */}
              <div className="hidden sm:block relative h-48 w-64 md:h-64 md:w-96 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="h-full w-full object-cover object-center transform hover:scale-105 transition duration-500"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 focus:outline-none"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 focus:outline-none"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? "w-6 bg-amber-400" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Amazon Style Bottom Gradient Overlay fading into products */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-100 dark:from-zinc-950 to-transparent pointer-events-none z-10" />
    </div>
  );
};
