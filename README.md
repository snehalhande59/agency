# TRAVELNEX — Premium Tours & Travel Management Platform

A modern, high-performance, and unified Tours & Travel Management ecosystem built with **React**, **Vite**, **Tailwind CSS**, and **Zustand**. Designed with inspiration from Uber, MakeMyTrip, and redBus, featuring a fresh light travel theme (`#F8FAFC` canvas, `#FFFFFF` cards, `#3898D8` primary accents, `#153B5B` dark navy typography, and `#19A89A` accents).

## ✨ Key Modules & Features

### 1. 🌟 Cinematic Homepage & Floating Booking Engine
- 5-slide high-definition travel photography hero slideshow with smooth crossfade and subtle Ken Burns zoom animation (`01/05` indicators, autoplay with pause-on-hover).
- Floating multi-service booking search panel with tabbed modes for Outstation, Airport, Local, Bus, and Train.
- Curated fleet showcase with specifications, passenger capacity, and luggage allowances.
- Maharashtra tourism highlights (Lonavala, Mahabaleshwar, Shirdi, Goa, Alibaug).
- Enterprise corporate mobility promotion banner.
- Verified customer testimonials & interactive FAQ accordion.

### 2. 🚆 Indian Railways IRCTC Gateway (Staging Simulation)
- Multi-station autocomplete, running day calendars, and train filtering.
- Travel classes: 1A, 2A, 3A, SL, CC, and EC.
- Quota selection: General, Tatkal, Senior Citizen, Ladies.
- Interactive berth preferences (Window, Lower, Upper, Aisle) and demo ticket generation.
- Clearly marked staging disclaimer: *"DEMO MODE – IRCTC integration pending authorization"*.

### 3. 🚌 Maharashtra State Road Transport (MSRTC)
- State bus search across Maharashtra depots and cities.
- Service fleet types: Shivneri Volvo AC, Shivshahi, Hirkani Nim-Aram, Asiad, and Lal Pari.
- Interactive 2x2 visual seat selection grid with real-time seat states (available, selected, reserved, ladies).
- Applicable government concessions (Senior Citizen 50%, Mahila Sanman 50%, Divyang).
- QR-style demo boarding pass and ticket cancellation simulation.

### 4. 💳 NCMC Smart Transit Mobility Card (One Nation One Card)
- Photorealistic RuPay NCMC Contactless Smart Card visual.
- Masked card number display and issuer bank selector (SBI, HDFC, ICICI, Axis).
- Instant wallet recharge simulation (₹200 to ₹2,000) with quick presets.
- Metro & bus transit passes (Daily unlimited, Weekly, Monthly commuter pass).
- Transaction history stream and lost card reporting workflow.

### 5. 🚖 10-Service Chauffeur & Fleet Booking Engine
- Local Taxi, Outstation One Way, Outstation Round Trip, Airport Pickup, Airport Drop, Hourly Rental, Luxury Car Rental, Mini Bus (14-26 seats), Luxury Tourist Coach (35-50 seats), and Group Transportation.
- Interactive multi-step checkout with simulated telematics route map, distance estimation, vehicle selection, and digital dispatch vouchers.

### 6. 🏢 Corporate Enterprise Mobility Suite
- **Corporate Admin Console**: Company profile, employee roster, verified chauffeur & vehicle registry, dynamic route stops, monthly cab contracts, travel requests approval, and consolidated GST invoices.
- **Corporate Employee Commute Portal**: Daily shift pickup/drop schedule, boarding pass with OTP & QR code, special cab requests, and ride history.

### 7. 📊 Super Admin & Customer Hubs
- **Super Admin Dashboard**: Multi-modal booking velocity charts, gross booking values, support ticket queues, and **Provider Integration Status Matrix** (*Railway: Pending Authorization, MSRTC: Pending Authorization, NCMC: Pending Authorization, Payment: Not Configured, Maps: Not Configured*).
- **Customer Hub**: Unified ticket archives, refunds management, digital wallet, profile settings, and direct helpline desk.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D & Visuals**: Three.js & Framer Motion

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
git clone https://github.com/snehalhande59/agency.git
cd agency
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```

---

## 🔒 Security & Architecture Mandate

All railway, bus, and card modules operate in a sandboxed staging simulation with zero external credentials exposed. No live payments, PNRs, or card PINs are processed or stored without verified upstream provider credentials.
