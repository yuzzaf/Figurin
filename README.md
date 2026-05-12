# 🛍️ Figurin - Modern eCommerce Platform

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Figurin** is a full-stack, modern e-commerce web application built using the powerful combination of **Next.js** (App Router), **TypeScript**, and **MongoDB**. It provides a seamless shopping experience with server-side rendering (SSR) for optimal performance and SEO, and client-side rendering (CSR) for interactive user interfaces.

## ✨ Features Implemented

### 🔐 Authentication
- **User Registration**: Secure user sign-up with email and password validation.
- **User Login**: Secure authentication system to access protected routes.
- **Protected Routes**: Only authenticated users can manage their wishlists.

### 🏠 Home Page
- **Dynamic Banner Promo**: Engaging promotional banners for users.
- **Featured Products**: Highlighted selection of top products (5-10 items).
- **Store Information**: Details about the eCommerce platform.

### 🛒 Product Browsing
- **Product Listing**: Browse all available products dynamically.
- **Search Functionality**: Search for products by name with debouncing for performance.
- **Infinite Scroll Pagination**: Seamlessly load more products as you scroll.
- **Product Details Page**: View in-depth details of a specific product with Dynamic Meta Tags for SEO.

### ❤️ Wishlist Management
- **Add to Wishlist**: Save favorite items for later (requires login).
- **Remove from Wishlist**: Easily manage saved items.
- **Dedicated Wishlist Page**: A complete overview of all saved products.

## 🚀 Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/) (React)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Styling:** CSS / Tailwind CSS (Depending on implementation)
- **Authentication:** Custom JWT / NextAuth (Depending on implementation)

## 🛠️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or MongoDB Atlas Cluster)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd gc02-yuzzaf
   ```

2. **Navigate to the app directory (if applicable):**
   ```bash
   cd app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory and add your credentials:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/figurin?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📝 License

This project was developed as part of a Hacktiv8 learning challenge. All rights reserved by the respective authors.
