# Digaxy Logistics

Digaxy Logistics is a modern, high-performance web application designed to streamline logistics and moving services. It provides a seamless interface for customers to book deliveries, and for drivers and helpers to manage their tasks and earnings.

## 🚀 Features

### For Customers
- **Dynamic Booking Flow**: Real-time service selection, vehicle choice, and address mapping using Google Maps and Leaflet.
- **Smart Estimation**: Automatic distance and price calculations based on the selected vehicle type and route.
- **Real-time Notifications**: Instant updates via WebSockets for booking statuses and important alerts.
- **Service Options**: Multiple service types including Home Moving, Furniture Delivery, Donation Pickups, and more.

### For Drivers & Helpers
- **Role-specific Dashboards**: Tailored interfaces for drivers and helpers to manage their workload.
- **Job History & Earnings**: Track completed tasks and earnings with detailed breakdowns.
- **Onboarding Wizard**: Comprehensive multi-step onboarding process for new partners.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Maps**: [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) & [Leaflet](https://leafletjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.stevenly.me/) & Custom WebSockets

## 📦 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API Routes)
│   ├── (auth)/           # Authentication flows (Login, Signup, etc.)
│   ├── (dashboard)/      # Protected dashboards (Customer, Driver, Helper)
│   └── ...
├── components/           # Reusable UI components
│   ├── auth/             # Onboarding and auth-specific components
│   ├── layout/           # Shared layouts (Sidebar, Header, Footer)
│   └── ...
├── services/             # API service layers
├── stores/               # Zustand global state stores
├── types/                # TypeScript interfaces and types
├── utils/                # Helper functions and utilities
└── public/               # Static assets (Images, Icons)
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd digaxy-logistics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://your-api-url:8400/api
   NEXT_PUBLIC_WS_URL=ws://your-api-url:8400
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📄 License

Copyright © 2026 Digaxy Logistics. All rights reserved.
