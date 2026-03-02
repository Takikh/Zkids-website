# 🧒 Z-Kids — Kids Fashion E-Commerce Website

> **A modern online store for children's clothing, built for Z-Kids boutique located in Medea, Algeria.**

![Next.js](https://img.shields.io/badge/Next.js-13.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38bdf8?logo=tailwindcss)

---

## 📖 About

**Z-Kids** is a full-featured e-commerce web application designed and developed for a kids' clothing store based in **Berrouaghia, Medea, Algeria**. The website allows customers to browse products, add items to their cart, and place orders online. It also includes an admin dashboard for managing products and orders.

**Developed by:** Khelfat Takieddine  
**Client:** Z-Kids — Boutique de vêtements pour enfants  
**Location:** Berrouaghia, Centre Ville, Bazar Belhadj — Medea, Algeria

---

## ✨ Features

### Customer-Facing
- **Product Catalog** — Browse kids' clothing organized by category: Boys, Girls, and Accessories
- **Product Details** — View product images, descriptions, available sizes, pricing, and stock status
- **Shopping Cart** — Add/remove items, adjust quantities, and select sizes with cart persistence via `localStorage`
- **Checkout System** — Complete order form with real-time validation (name, email, phone, address)
- **Featured Products** — Highlighted products displayed on the homepage
- **Customer Testimonials** — Social proof section showcasing customer reviews
- **Contact Page** — Contact form and store location/information
- **Responsive Design** — Fully mobile-friendly layout that works on all screen sizes

### Multi-Language Support
- **French** (default) 🇫🇷
- **English** 🇬🇧
- **Arabic** 🇩🇿 (with RTL layout support)

### Admin Dashboard
- **Secure Authentication** — JWT-based login with password hashing (bcrypt)
- **Product Management** — Add, edit, and delete products from the catalog
- **Order Management** — View and track customer orders
- **Dashboard Statistics** — Overview of total products, orders, revenue, and low-stock alerts

---

## 🛠️ Tech Stack

| Layer            | Technology                                                  |
| ---------------- | ----------------------------------------------------------- |
| **Framework**    | [Next.js 13](https://nextjs.org/) (App Router)             |
| **Language**     | [TypeScript](https://www.typescriptlang.org/)               |
| **UI Library**   | [React 18](https://react.dev/)                              |
| **Styling**      | [Tailwind CSS 3](https://tailwindcss.com/)                  |
| **UI Components**| [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)  |
| **Icons**        | [Lucide React](https://lucide.dev/)                         |
| **Forms**        | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Auth**         | JWT ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Notifications**| [React Hot Toast](https://react-hot-toast.com/)            |
| **i18n**         | Custom translation system (FR / EN / AR)                    |
| **Carousel**     | [Embla Carousel](https://www.embla-carousel.com/)           |
| **Charts**       | [Recharts](https://recharts.org/)                           |

---

## 📁 Project Structure

```
Zkids-website/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage (hero, featured, categories, testimonials)
│   ├── layout.tsx              # Root layout with metadata
│   ├── globals.css             # Global styles
│   ├── admin/page.tsx          # Admin dashboard (products & orders management)
│   ├── cart/page.tsx           # Shopping cart page
│   ├── category/[category]/    # Dynamic category pages (boys, girls, accessories)
│   ├── checkout/page.tsx       # Checkout form with order placement
│   ├── contact/page.tsx        # Contact form & store info
│   ├── login/page.tsx          # Admin login page
│   ├── product/[id]/page.tsx   # Individual product detail page
│   └── api/                    # API routes
│       ├── auth/login/         # POST — Admin authentication
│       ├── auth/verify/        # GET — Token verification
│       ├── orders/             # GET/POST — Order management
│       └── products/           # GET — Product listing
├── components/
│   ├── Layout.tsx              # Main layout (header, nav, footer)
│   ├── ProductCard.tsx         # Reusable product card component
│   └── ui/                     # shadcn/ui component library (40+ components)
├── hooks/
│   ├── useCart.ts              # Shopping cart state management
│   ├── useTranslation.ts      # Multi-language hook (FR/EN/AR)
│   └── use-toast.ts           # Toast notification hook
├── lib/
│   ├── auth.ts                 # JWT & bcrypt authentication utilities
│   ├── data.ts                 # Product, Order & User data models
│   ├── i18n.ts                 # Translation strings (French, English, Arabic)
│   └── utils.ts                # Utility functions
├── next.config.js              # Next.js configuration (static export)
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-repo/zkids-website.git
cd zkids-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start development server             |
| `npm run build` | Build for production (static export) |
| `npm run start` | Start production server              |
| `npm run lint`  | Run ESLint                           |

---

## 🌐 Pages Overview

| Page                     | Route                   | Description                                      |
| ------------------------ | ----------------------- | ------------------------------------------------ |
| **Homepage**             | `/`                     | Hero banner, featured products, categories, testimonials |
| **Boys Category**        | `/category/boys`        | All boys' clothing products                      |
| **Girls Category**       | `/category/girls`       | All girls' clothing products                     |
| **Accessories**          | `/category/accessories` | Kids' accessories catalog                        |
| **Product Detail**       | `/product/[id]`         | Single product view with size selection           |
| **Shopping Cart**        | `/cart`                 | Cart items, quantities, and total                |
| **Checkout**             | `/checkout`             | Order form with validation                       |
| **Contact**              | `/contact`              | Contact form and store location                  |
| **Admin Login**          | `/login`                | Secure admin authentication                      |
| **Admin Dashboard**      | `/admin`                | Product & order management panel                 |

---

## 🔐 Admin Access

The admin panel is protected with JWT authentication. Default credentials:

| Field    | Value              |
| -------- | ------------------ |
| Email    | `admin@zkids.com`  |
| Password | `admin123`         |

> ⚠️ **Important:** Change the default credentials and `JWT_SECRET` before deploying to production.

---

## 📞 Contact & Store Info

| Info           | Details                              |
| -------------- | ------------------------------------ |
| **Store**      | Z-Kids                               |
| **Address**    | Berrouaghia, Centre Ville, Bazar Belhadj — Medea, Algeria |
| **Phone**      | +213 540 083 489                     |
| **Email**      | khelfat.takieddine@gmail.com         |
| **Developer**  | Khelfat Takieddine                   |

---

## 📄 License

This project is proprietary and developed exclusively for Z-Kids by **Khelfat Takieddine**. All rights reserved.

---

<p align="center">
  Built with ❤️ by <strong>Khelfat Takieddine</strong> for <strong>Z-Kids</strong>
</p>
