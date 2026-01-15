# 💰 Finance Tracker

A comprehensive personal finance management application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### Core Features
- 🏦 **Multiple Account Management** - Track checking, savings, credit cards, cash, investments, and loans from different banks
- 💸 **Transaction Tracking** - Record income and expenses with detailed information
- 📍 **Location Tracking** - Track where transactions happened (merchant and location)
- 📊 **Dashboard** - Overview of your financial health with real-time statistics
- 🎯 **Financial Goals** - Set and track savings goals
- 💳 **Debt Tracking** - Monitor credit cards, loans, and payment schedules
- 🔄 **Recurring Transactions** - Automate recurring bills and income
- 📈 **Budgets** - Set monthly budgets per category and track spending
- 🔍 **Search & Filter** - Find transactions easily by description, merchant, location, or account
- 📤 **Data Import/Export** - Import CSV from banks and export for backup/taxes
- 🔔 **Notifications** - Budget warnings, low balance alerts, and bill reminders

### Technical Features
- 🔐 Secure authentication with Supabase
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design
- 🔒 Row Level Security (RLS) for data protection
- ⚡ Real-time updates
- 🌙 Clean, professional interface

## 🚀 Getting Started

### 🎮 Try Demo Mode First! (No Setup Required)

Want to explore the app before setting up? **Try Demo Mode!**

1. Start the development server:
   ```bash
   npm install
   npm run dev
   ```

2. Open http://localhost:3000

3. Click **"🎮 Try Demo Mode"** on the login page

4. Explore the app with realistic sample data!

See `DEMO_MODE.md` for more details about demo mode.

### 📋 Full Setup (For Real Use)

#### Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works great!)

#### Quick Setup (10 minutes)

Follow the step-by-step guide in **`QUICK_START.md`** - it will walk you through:
1. Creating a Supabase account
2. Setting up your database
3. Configuring environment variables
4. Testing the app

#### Detailed Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Follow the detailed instructions in `SUPABASE_SETUP.md`
   - Create a Supabase project
   - Run the database schema from `supabase/schema.sql`
   - Copy your credentials to `.env.local`

3. **Create environment file:**
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### First Steps
1. **Sign up** for an account
2. **Add your first account** (e.g., checking account, credit card)
3. **Create categories** for organizing transactions
4. **Add transactions** to start tracking your finances
5. **Set budgets** to control spending
6. **Create goals** to save for the future

### Managing Accounts
- Add multiple accounts from different banks
- Each account tracks its own balance
- Supports checking, savings, credit cards, cash, investments, and loans
- Mark accounts as active/inactive

### Tracking Transactions
- Record income and expenses
- Add location and merchant information
- Categorize transactions
- Tag transactions for easy filtering
- Add notes and receipts

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Lucide React
- **Charts:** Recharts
- **Date Handling:** date-fns

## 🔒 Security

- Row Level Security (RLS) policies ensure users can only access their own data
- Secure authentication with Supabase
- Environment variables for sensitive credentials
- Protected routes with middleware

## 📝 Database Schema

The app uses the following main tables:
- `accounts` - Bank accounts and financial accounts
- `transactions` - Income and expense records
- `categories` - Transaction categories
- `budgets` - Budget limits per category
- `financial_goals` - Savings goals
- `debts` - Debt tracking
- `recurring_transactions` - Recurring bills and income

See `supabase/schema.sql` for the complete schema.

---

Built with ❤️ using Next.js and Supabase
