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
