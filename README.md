# 🛒 Amazon E-Commerce Assessment Clone

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An enterprise-grade, ultra-responsive Amazon E-Commerce clone engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Designed for maximum performance, rich visual aesthetics, and flawless user interaction.

---

## 🌟 Executive Summary

This repository contains a full-stack assessment implementation of the **Amazon E-Commerce Platform**. It models the core shopping experience end-to-end: real-time search auto-filtering, multi-attribute category filtering, detailed product quick-view modals, interactive variant selectors, sliding shopping cart with free shipping thresholds, and a multi-step checkout experience complete with celebratory particle animations.

### 🎯 Key Highlights
- **⚡ Zero Latency State Management**: React Context state sync with `localStorage` persistence.
- **🎨 Premium Dark & Light UI**: Built with modern typography, smooth gradient cards, and glassmorphism elements.
- **📱 Fully Responsive**: Optimized across mobile phones, tablets, laptops, and ultra-wide displays.
- **💯 Production Ready**: Clean TypeScript compilation with 0 build warnings.

---

## ✨ Features Matrix

| Module | Feature Capabilities | Status |
| :--- | :--- | :---: |
| **Amazon Header** | Logo, Deliver to Location selector, Category Search select, Search clear, Account dropdown, Orders link, Cart counter badge | ✅ Active |
| **Category Nav** | All hamburger drawer menu, Today's Deals filter shortcut, Quick category tabs, Prime perks | ✅ Active |
| **Hero Carousel** | Auto-sliding promotional banners, manual prev/next navigation, smooth gradient backdrop, call-to-action buttons | ✅ Active |
| **Product Grid** | Responsive card grid, hover zoom preview, Prime check badges, sale tags, Star rating breakdown, Wishlist heart toggle | ✅ Active |
| **Filter Sidebar** | Department filter, Price Range slider ($0-$2000), Customer Rating threshold (1-4 Stars & up), Prime-only, Deals-only | ✅ Active |
| **Product Modal** | High-res gallery thumbnail switcher, Color & Size variant selectors, Specs breakdown table, Item features bullet points | ✅ Active |
| **Cart Drawer** | Slide-over sidebar, quantity updater, subtotal calculation, **Free Shipping Progress Bar**, Cart clear | ✅ Active |
| **Checkout Flow** | Multi-step shipping address & payment selection, Order summary, Confetti celebration effect, Tracking number generator | ✅ Active |

---

## 🖥️ UI Showcase & User Experience Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AMAZON HEADER & SEARCH                          │
├────────────────────────────────────────────────────────────────────────┤
│ [All Dropdown] | Search products...                | [Search Button]   │
├────────────────────────────────────────────────────────────────────────┤
│ CATEGORY SUB-HEADER: All | Today's Deals | Electronics | Fashion | Home│
├────────────────────────────────────────────────────────────────────────┤
│ HERO CAROUSEL: Mega Electronics Festival / Up to 40% OFF               │
├───────────────────────────────┬────────────────────────────────────────┤
│ FILTER SIDEBAR                │ PRODUCT GRID                           │
│ • Departments                 │ ┌────────────┐ ┌────────────┐          │
│ • Price Range ($0 - $2000)    │ │ Product 1  │ │ Product 2  │          │
│ • Rating (4★ & Up)            │ │ $348.00    │ │ $1,299.00  │          │
│ • Prime Eligible              │ └────────────┘ └────────────┘          │
└───────────────────────────────┴────────────────────────────────────────┘
```

---

## 🏗️ Architecture & Project Structure

```
amazon/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global Tailwind CSS v4 & custom animations
│   │   ├── layout.tsx            # Root layout wrapped with CartProvider context
│   │   └── page.tsx              # Main home page integrating all modules
│   ├── components/
│   │   ├── CartDrawer.tsx        # Slide-over sidebar cart & free shipping meter
│   │   ├── CategoryNav.tsx       # Sub-header category navigation & drawer menu
│   │   ├── CheckoutModal.tsx     # Multi-step checkout & confetti celebration
│   │   ├── FilterSidebar.tsx     # Price, rating, prime, & deals filter sidebar
│   │   ├── Header.tsx            # Amazon search bar, header, location selector
│   │   ├── HeroCarousel.tsx      # Promotional deal banner slider
│   │   ├── ProductCard.tsx       # Product card with badges, rating, & price
│   │   ├── ProductDetailModal.tsx# Quick view modal with gallery & variants
│   │   ├── ProductGrid.tsx       # Grid container for product cards
│   │   ├── SortBar.tsx           # Results counter & sort dropdown
│   │   └── Toast.tsx             # Floating notification toasts
│   ├── context/
│   │   └── CartContext.tsx       # React Context provider & state manager
│   ├── data/
│   │   └── mockProducts.ts       # Comprehensive product catalog data
│   └── types/
│       └── index.ts              # Core TypeScript interfaces
├── public/                       # Static public assets
├── package.json                  # Dependencies & scripts configuration
└── tsconfig.json                 # TypeScript strict mode settings
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rajneeshverma1/8x-Assessment-.git
   cd 8x-Assessment-
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) or [http://localhost:3005](http://localhost:3005).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start production build locally:**
   ```bash
   npm run start
   ```

---

## 📜 Available Scripts Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack fast refresh |
| `npm run build` | Compiles optimized Next.js production build and checks TypeScript types |
| `npm run start` | Runs production server for built application |
| `npm run lint` | Runs ESLint check across all codebase files |

---

## 🌐 Production Deployment Guide

### Deploying to Vercel
1. Import repository `https://github.com/rajneeshverma1/8x-Assessment-.git` into [Vercel](https://vercel.com).
2. Framework Preset: **Next.js**.
3. Click **Deploy**. Vercel will automatically build and publish the live production URL.

### Deploying to Netlify
1. Connect GitHub account on [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `.next`

---

## 📋 8x Assessment Checklist Compliance

- [x] Full responsive Amazon visual aesthetic & branding
- [x] Product search bar with live filtering & category select
- [x] Multi-attribute filter sidebar (Price, Rating, Prime, Deals)
- [x] Product quick-view modal with variant selection & specs
- [x] Slide-over cart drawer with free shipping calculator
- [x] Multi-step checkout modal with confetti particle animation
- [x] Client-side state persistence via `localStorage`
- [x] Zero TypeScript / Lint warnings on production build

---

## 👤 Author & Credits

Developed by **[rajneeshverma1](https://github.com/rajneeshverma1)** for the **8x Assessment**.

Licensed under the [MIT License](LICENSE).
