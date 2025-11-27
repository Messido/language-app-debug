# Quick Setup Guide

## Getting Started with React Clerk Starter

### Step 1: Node.js Version Check

This project requires **Node.js 21+** or you can use Vite 5.x with Node 18+.

**Current Node Version**: You have Node.js 20.12.2

**Options:**

#### Option A: Upgrade Node.js (Recommended)

Download and install Node.js 21+ from [nodejs.org](https://nodejs.org)

Or use nvm:

```bash
nvm install 21
nvm use 21
```

#### Option B: Use Compatible Vite Version

If you prefer to stay on Node 20.x:

```bash
cd react-clerk-starter
npm install -D vite@^5.4.0 @vitejs/plugin-react@^4.3.0
```

### Step 2: Install Dependencies

```bash
cd react-clerk-starter
npm install
```

### Step 3: Set Up Clerk

1. Go to [https://clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Enable Email authentication
4. Copy your Publishable Key from the API Keys section

### Step 4: Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and paste your Clerk key
# VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

### Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 6: Test the App

1. Visit the homepage
2. Click "Get Started" to sign up
3. Create an account
4. You'll be redirected to the dashboard
5. Try signing out and signing back in
6. Close the browser and reopen - you'll still be logged in!

---

## Quick Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check for lint errors
```

---

## Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Visit [Clerk Documentation](https://clerk.com/docs)
- Review the [walkthrough.md](../.gemini/antigravity/brain/*/walkthrough.md) for implementation details

---

**Ready to build amazing apps! 🚀**
