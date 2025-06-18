# Syfe Savings Planner

A lightweight, client-side-only Goal-Based Savings Planner built with **NextJs**, **Zustand**, **Tailwind CSS**, and **TypeScript**.

This app allows users to:

- Create and manage multiple financial goals
- Track savings progress visually with animated progress bars
- Add contributions by amount and date
- See live INR/USD exchange rates
- View a financial dashboard with totals & goal completion %
- Persist your data locally with Zustand

> Designed with a clean, responsive UI & smooth UX. Works seamlessly across desktop and mobile.

---

## 🔗 Live Demo

[Vercel Deployment → Click Here](https://syfe-saving-planner-nine.vercel.app/)

---

## 🛠️ Tech Stack

- **NextJs 15**
- **Zustand** for state management (with `persist`)
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Exchange Rate API** (`https://app.exchangerate-api.com`)
- **Vercel** for deployment

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/syfe-savings-planner.git
cd syfe-savings-planner
```

### 2.Install dependencies

```bash
npm install
```

### 3.Create a .env.local file in the root directory

```bash
touch .env.local
```

Then add your API key from [ExchangeRate API](https://app.exchangerate-api.com/) like this:

```bash
NEXT_PUBLIC_EXCHANGE_RATE_API=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Your app will be live at http://localhost:3000
