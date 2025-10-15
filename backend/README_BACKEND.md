# Centsible Backend Development Guide

A comprehensive, step-by-step guide to building and integrating a Node.js, Express.js, and MongoDB backend for the Centsible expense tracking application.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Backend Setup](#backend-setup)
4. [Database Configuration](#database-configuration)
5. [Building the Express Server](#building-the-express-server)
6. [Creating Data Models](#creating-data-models)
7. [Implementing API Routes](#implementing-api-routes)
8. [Testing the API](#testing-the-api)
9. [Frontend Integration](#frontend-integration)
10. [Deployment](#deployment)
11. [User Authentication System](#user-authentication-system)
12. [Additional Advanced Features](#additional-advanced-features)
13. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This guide walks you through building a complete backend for Centsible. You'll learn:
- How to set up a Node.js server with Express
- Database design and MongoDB integration
- RESTful API development
- Connecting React frontend to backend
- Production deployment strategies

**What You'll Build:**
- A RESTful API with CRUD operations
- MongoDB database for persistent storage
- Authentication and authorization (optional)
- Error handling and validation
- Production-ready backend

---

## 📚 Prerequisites

### Required Knowledge
- Basic JavaScript (variables, functions, async/await)
- Understanding of HTTP methods (GET, POST, PUT, DELETE)
- Basic command line usage

### Required Software
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Postman** or **Insomnia** - For API testing
- **VS Code** or any code editor

### Check Your Installation
```bash
node --version    # Should show v16.0.0 or higher
npm --version     # Should show 8.0.0 or higher
```

---

## 🛠️ Backend Setup

### Step 1: Create Backend Directory

Navigate to your project root:
```bash
cd C:\Users\Byron.Young\Downloads\Projects\Centsible
mkdir backend
cd backend
```

### Step 2: Initialize Node.js Project

```bash
npm init -y
```

This creates a `package.json` file with default settings.

### Step 3: Install Dependencies

```bash
npm install express mongoose cors dotenv
```

**Dependency Explanations:**
- **express**: Web framework for building APIs
- **mongoose**: MongoDB object modeling tool
- **cors**: Enables cross-origin requests (React → Express)
- **dotenv**: Loads environment variables from `.env` file

### Step 4: Install Development Dependencies

```bash
npm install --save-dev nodemon prettier eslint
```

**Development Dependency Explanations:**
- **nodemon**: Automatically restarts server when code changes (development only)
- **prettier**: Code formatter to maintain consistent code style
- **eslint**: Linter to catch errors and enforce code quality standards

### Step 5: Configure package.json Scripts

Open `package.json` and add these scripts:

```json
{
  "name": "centsible-backend",
  "version": "1.0.0",
  "description": "Backend API for Centsible expense tracker",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{js,json,md}\""
  },
  "keywords": ["expense", "tracker", "api"],
  "author": "Byron Young & Raees Johaadien",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "prettier": "^3.0.0",
    "eslint": "^8.50.0"
  }
}
```

---

## 💾 Database Configuration

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (select free tier)
4. Wait 3-5 minutes for cluster creation

### Step 2: Create Database User

1. Go to **Database Access** in the sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `centsible_admin`
5. Password: Generate a secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### Step 3: Configure Network Access

1. Go to **Network Access** in the sidebar
2. Click **Add IP Address**
3. For development: Click **Allow Access from Anywhere** (0.0.0.0/0)
4. For production: Add your specific IP addresses

### Step 4: Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Select **Node.js** driver version **5.5 or later**
4. Copy the connection string (looks like this):

```
mongodb+srv://centsible_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 5: Create Environment Variables File

Create `.env` in the backend folder:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://centsible_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/centsible?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (Frontend URL)
CLIENT_URL=http://localhost:8080
```

**Important:**
- Replace `YOUR_PASSWORD` with your actual password
- Replace `cluster0.xxxxx` with your actual cluster address
- Add `centsible` as the database name in the URI

### Step 6: Create .gitignore

Create `.gitignore` in the backend folder:

```
node_modules/
.env
.DS_Store
*.log
```

**Why?** This prevents sensitive data (like your MongoDB password) from being committed to Git.

### Step 7: Configure Prettier

Create `.prettierrc` in the backend folder:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

Create `.prettierignore` in the backend folder:

```
node_modules/
.env
*.log
```

### Step 8: Configure ESLint

Create `.eslintrc.json` in the backend folder:

```json
{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  }
}
```

Create `.eslintignore` in the backend folder:

```
node_modules/
.env
*.log
```

**Using Prettier & ESLint:**
- Format code: `npm run format`
- Check for linting errors: `npm run lint`
- Auto-fix linting errors: `npm run lint:fix`

---

## 🖥️ Building the Express Server

### Step 1: Create server.js

Create `server.js` in the backend folder:

```javascript
// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS for frontend requests
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Log incoming requests (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// DATABASE CONNECTION
// ============================================

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit if database connection fails
  });

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Centsible API is running',
    version: '1.0.0',
    status: 'healthy'
  });
});

// API routes will be added here later
// app.use('/api/transactions', transactionRoutes);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});
```

### Step 2: Test the Server

Run the server:
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
🌍 Environment: development
🔗 API URL: http://localhost:5000
✅ MongoDB connected successfully
📦 Database: centsible
```

Visit `http://localhost:5000` in your browser - you should see a JSON response.

---

## 🏢 Analogy: What is the Server?

Think of your backend server as a restaurant manager:
- The **server.js** file is the manager who opens the restaurant, sets up the staff, connects to the kitchen (database), and makes sure everything runs smoothly.
- The **waiter (Express.js)** takes orders (requests) from customers (frontend), gets the right dish (data) from the kitchen (MongoDB), and serves it back.
- The **kitchen (MongoDB)** stores all the ingredients (data) and prepares the meals (responses).
- The **menu (routes)** lists all the dishes (API endpoints) you can order.

So, when your frontend wants something (like a list of transactions), it sends a request to the backend (restaurant). The manager (server.js) makes sure the waiter (Express) gets the right dish from the kitchen (MongoDB) and serves it to the customer (frontend).

This analogy helps you visualize how the backend works and how each part fits together!

---

## 📊 Creating Data Models

### Step 1: Create Models Directory

```bash
mkdir models
```

### Step 2: Create Transaction Model

Create `models/Transaction.js`:

```javascript
const mongoose = require('mongoose');

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create indexes for better query performance
transactionSchema.index({ date: -1 }); // Sort by date descending
transactionSchema.index({ type: 1, category: 1 }); // Filter by type and category

// Virtual property for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  return `$${this.amount.toLocaleString()}`;
});

// Export the model
module.exports = mongoose.model('Transaction', transactionSchema);
```

**Schema Breakdown:**
- **type**: Income or expense (enum restricts values)
- **amount**: Number, must be positive
- **category**: String (e.g., "Salary", "Food")
- **date**: Date object
- **description**: Optional text (max 500 characters)
- **timestamps**: Automatic createdAt/updatedAt fields

---

## 🛣️ Implementing API Routes

### Step 1: Create Routes Directory

```bash
mkdir routes
```

### Step 2: Create Transaction Routes

Create `routes/transactions.js`:

```javascript
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// ============================================
// GET ALL TRANSACTIONS
// ============================================
router.get('/', async (req, res) => {
  try {
    // Optional query parameters for filtering
    const { type, category, startDate, endDate } = req.query;
    
    // Build query object
    let query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    // Fetch transactions
    const transactions = await Transaction.find(query)
      .sort({ date: -1 }) // Most recent first
      .limit(100); // Limit results for performance
    
    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// GET SINGLE TRANSACTION BY ID
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }
    
    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// CREATE NEW TRANSACTION
// ============================================
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { type, amount, category, date, description } = req.body;
    
    if (!type || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        error: 'Please provide type, amount, category, and date'
      });
    }
    
    // Create transaction
    const transaction = new Transaction({
      type,
      amount,
      category,
      date,
      description
    });
    
    await transaction.save();
    
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// UPDATE TRANSACTION
// ============================================
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true // Validate update against schema
      }
    );
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// DELETE TRANSACTION
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Transaction deleted successfully',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// GET SUMMARY STATISTICS
// ============================================
router.get('/stats/summary', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance,
        transactionCount: transactions.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
```

### Step 3: Register Routes in server.js

Update `server.js` to include the transaction routes:

```javascript
// Add this after your middleware section
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);
```

The complete routes section should look like:

```javascript
// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Centsible API is running',
    version: '1.0.0',
    status: 'healthy'
  });
});

// Transaction routes
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);
```

---

## 🧪 Testing the API

### Using Postman

1. **Download Postman**: [getpostman.com](https://www.postman.com/)
2. **Create a new collection**: "Centsible API"

### Test Each Endpoint

#### 1. Get All Transactions
```
GET http://localhost:5000/api/transactions
```

#### 2. Create Transaction
```
POST http://localhost:5000/api/transactions
Content-Type: application/json

{
  "type": "income",
  "amount": 5000,
  "category": "Salary",
  "date": "2025-01-15",
  "description": "Monthly salary"
}
```

#### 3. Get Single Transaction
```
GET http://localhost:5000/api/transactions/:id
```
(Replace `:id` with actual MongoDB ID from previous response)

#### 4. Update Transaction
```
PUT http://localhost:5000/api/transactions/:id
Content-Type: application/json

{
  "amount": 5500,
  "description": "Monthly salary with bonus"
}
```

#### 5. Delete Transaction
```
DELETE http://localhost:5000/api/transactions/:id
```

#### 6. Get Summary Statistics
```
GET http://localhost:5000/api/transactions/stats/summary
```

### Expected Responses

**Success (201 Created):**
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "_id": "65abc123...",
    "type": "income",
    "amount": 5000,
    "category": "Salary",
    "date": "2025-01-15T00:00:00.000Z",
    "description": "Monthly salary",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "Please provide type, amount, category, and date"
}
```

---

## ⚛️ Frontend Integration

### Step 1: Create API Service

Create `src/services/api.js` in your React app:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for fetch requests
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Transaction API methods
export const transactionAPI = {
  // Get all transactions
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/transactions?${queryParams}` : '/transactions';
    return fetchAPI(endpoint);
  },

  // Get single transaction
  getById: async (id) => {
    return fetchAPI(`/transactions/${id}`);
  },

  // Create transaction
  create: async (transactionData) => {
    return fetchAPI('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  },

  // Update transaction
  update: async (id, transactionData) => {
    return fetchAPI(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData),
    });
  },

  // Delete transaction
  delete: async (id) => {
    return fetchAPI(`/transactions/${id}`, {
      method: 'DELETE',
    });
  },

  // Get summary stats
  getSummary: async () => {
    return fetchAPI('/transactions/stats/summary');
  },
};
```

### Step 2: Update Environment Variables

Create `.env` in your React app root:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Update TransactionContext

Replace `src/context/TransactionContext.tsx`:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Transaction } from "@/data/mockData";
import { transactionAPI } from "@/services/api";

type TransactionContextType = {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refreshTransactions: () => Promise<void>;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions on mount
  const refreshTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionAPI.getAll();
      setTransactions(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  // Add transaction
  const addTransaction = async (transactionData: Omit<Transaction, 'id'>) => {
    try {
      const response = await transactionAPI.create(transactionData);
      setTransactions(prev => [response.data, ...prev]);
    } catch (err) {
      console.error('Error adding transaction:', err);
      throw err;
    }
  };

  // Update transaction
  const updateTransaction = async (id: string, transactionData: Partial<Transaction>) => {
    try {
      const response = await transactionAPI.update(id, transactionData);
      setTransactions(prev =>
        prev.map(t => (t.id === id ? response.data : t))
      );
    } catch (err) {
      console.error('Error updating transaction:', err);
      throw err;
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: string) => {
    try {
      await transactionAPI.delete(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      throw err;
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        refreshTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }
  return context;
};
```

### Step 4: Update TransactionModal

Update the `handleSubmit` function in `src/components/TransactionModal.tsx`:

```typescript
const { addTransaction, updateTransaction } = useTransactions();

const handleSubmit = async () => {
  try {
    const transactionData = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    if (transaction) {
      await updateTransaction(transaction.id, transactionData);
    } else {
      await addTransaction(transactionData);
    }
    
    onClose();
  } catch (error) {
    console.error('Error saving transaction:', error);
    alert('Failed to save transaction');
  }
};
```

---

## 🚀 Deployment

### Option 1: Deploy to Render

1. Push your backend code to GitHub
2. Go to [render.com](https://render.com/) and sign up
3. Click **New** → **Web Service**
4. Connect your GitHub repo
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add `MONGO_URI`, `PORT`, `NODE_ENV`
6. Click **Create Web Service**

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app/)
2. Click **Deploy from GitHub repo**
3. Select your backend repository
4. Railway auto-detects Node.js
5. Add environment variables in **Variables** tab
6. Deploy automatically

### Update Frontend

After deployment, update your React `.env`:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🔐 User Authentication System

This section covers implementing a complete authentication system with:
- User Registration
- Email Verification (OTP)
- User Login (JWT)
- Forgot Password
- Reset Password
- Protected Routes

---

### Step 1: Install Authentication Dependencies

```bash
npm install bcryptjs jsonwebtoken nodemailer
```

**Package Explanations:**
- **bcryptjs**: Hashes passwords securely before storing in database
- **jsonwebtoken**: Creates and verifies JWT tokens for authentication
- **nodemailer**: Sends emails (for OTP verification and password reset)

---

### Step 2: Update Environment Variables

Add these to your `.env` file:

```env
# Existing variables...
MONGO_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:8080

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# Email Configuration (using Gmail as example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=Centsible <noreply@centsible.com>
```

**Important:**
- Generate a strong random string for `JWT_SECRET` (at least 32 characters)
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833?hl=en), not your regular password
- Never commit `.env` to Git!

---

### Step 3: Create User Model

Create `models/User.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default in queries
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    select: false // Don't return OTP in queries
  },
  otpExpires: {
    type: Date,
    select: false
  },
  resetPasswordOTP: {
    type: String,
    select: false
  },
  resetPasswordExpires: {
    type: Date,
    select: false
  }
}, {
  timestamps: true
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  
  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate 6-digit OTP
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  return otp;
};

// Method to generate reset password OTP
userSchema.methods.generateResetOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.resetPasswordOTP = otp;
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes
  return otp;
};

module.exports = mongoose.model('User', userSchema);
```

**Schema Breakdown:**
- **name**: User's full name
- **email**: Unique email with validation
- **password**: Hashed password (not returned in queries by default)
- **isVerified**: Boolean to track email verification status
- **otp**: Temporary OTP for email verification
- **otpExpires**: When the OTP expires
- **resetPasswordOTP**: OTP for password reset
- **resetPasswordExpires**: When the reset OTP expires

---

### Step 4: Create Email Utility

Create `utils/sendEmail.js`:

```javascript
const nodemailer = require('nodemailer');

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text message
 * @param {string} options.html - HTML message
 */
const sendEmail = async (options) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
```

**How it works:**
- Creates a nodemailer transporter with your email credentials
- Sends emails with customizable subject, text, and HTML content
- Returns success or throws error

---

### Step 5: Create Authentication Middleware

Create `middleware/auth.js`:

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes - verifies JWT token
 * Add this middleware to any route that requires authentication
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from "Bearer TOKEN"
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database (exclude password)
      req.user = await User.findById(decoded.id);

      // Check if user still exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'User no longer exists'
        });
      }

      // Check if user is verified
      if (!req.user.isVerified) {
        return res.status(401).json({
          success: false,
          error: 'Please verify your email first'
        });
      }

      next(); // Continue to next middleware/route handler
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error in authentication'
    });
  }
};

/**
 * Generate JWT token
 */
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};
```

**How it works:**
- Extracts JWT token from `Authorization: Bearer <token>` header
- Verifies the token is valid and not expired
- Checks if user exists and is verified
- Attaches user to `req.user` for use in route handlers
- Use `protect` middleware on any route that requires authentication

---

### Step 6: Create Authentication Routes

Create `routes/auth.js`:

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const { protect, generateToken } = require('../middleware/auth');

// ============================================
// REGISTER USER
// ============================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and password'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      isVerified: false
    });

    // Generate OTP
    const otp = user.generateOTP();

    // Save user
    await user.save();

    // Send OTP email
    const message = `
      <h1>Welcome to Centsible!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for registering. Please verify your email using the OTP below:</p>
      <h2 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't create an account, please ignore this email.</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Verify Your Centsible Account',
      html: message
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email for OTP verification.',
      data: {
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Registration failed'
    });
  }
});

// ============================================
// VERIFY EMAIL WITH OTP
// ============================================
router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and OTP'
      });
    }

    // Find user with OTP (include otp and otpExpires fields)
    const user = await User.findOne({ email }).select('+otp +otpExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: 'Email already verified'
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP'
      });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Email verified successfully!',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({
      success: false,
      error: 'Verification failed'
    });
  }
});

// ============================================
// RESEND OTP
// ============================================
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: 'Email already verified'
      });
    }

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    const message = `
      <h1>Your New OTP</h1>
      <p>Hi ${user.name},</p>
      <p>Here is your new OTP to verify your email:</p>
      <h2 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Your New Centsible OTP',
      html: message
    });

    res.json({
      success: true,
      message: 'New OTP sent to your email'
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resend OTP'
    });
  }
});

// ============================================
// LOGIN USER
// ============================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        error: 'Please verify your email first'
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

// ============================================
// FORGOT PASSWORD
// ============================================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No account found with that email'
      });
    }

    // Generate reset OTP
    const resetOTP = user.generateResetOTP();
    await user.save();

    // Send reset OTP email
    const message = `
      <h1>Password Reset Request</h1>
      <p>Hi ${user.name},</p>
      <p>You requested a password reset. Use the OTP below to reset your password:</p>
      <h2 style="color: #FF5722; font-size: 32px; letter-spacing: 5px;">${resetOTP}</h2>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Reset Your Centsible Password',
      html: message
    });

    res.json({
      success: true,
      message: 'Password reset OTP sent to your email'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process request'
    });
  }
});

// ============================================
// RESET PASSWORD
// ============================================
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email, OTP, and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters'
      });
    }

    // Find user with reset OTP fields
    const user = await User.findOne({ email }).select('+resetPasswordOTP +resetPasswordExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if OTP matches
    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP'
      });
    }

    // Check if OTP has expired
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new one.'
      });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful! You can now login with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Password reset failed'
    });
  }
});

// ============================================
// GET CURRENT USER (Protected Route Example)
// ============================================
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isVerified: req.user.isVerified,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get user'
    });
  }
});

module.exports = router;
```

**Route Explanations:**
- **POST /api/auth/register**: Creates new user and sends OTP email
- **POST /api/auth/verify**: Verifies email with OTP
- **POST /api/auth/resend-otp**: Resends OTP if expired
- **POST /api/auth/login**: Authenticates user and returns JWT token
- **POST /api/auth/forgot-password**: Sends password reset OTP
- **POST /api/auth/reset-password**: Resets password with OTP
- **GET /api/auth/me**: Gets current user info (requires authentication)

---

### Step 7: Protect Transaction Routes

Update `routes/transactions.js` to require authentication:

```javascript
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth'); // Import protect middleware

// Apply protection to all transaction routes
router.use(protect);

// ... rest of your transaction routes stay the same
```

**What this does:**
- All transaction routes now require a valid JWT token
- User must be logged in and verified to access transactions
- Each transaction will be associated with the logged-in user

---

### Step 8: Update server.js

Add authentication routes to `server.js`:

```javascript
// ... existing code ...

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Centsible API is running',
    version: '1.0.0',
    status: 'healthy'
  });
});

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Transaction routes (protected)
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);

// ... rest of code ...
```

---

### Step 9: Testing Authentication with Postman

#### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration successful! Please check your email for OTP verification.",
  "data": {
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### 2. Verify Email
Check your email for OTP, then:
```
POST http://localhost:5000/api/auth/verify
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email verified successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "65abc...",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": true
  }
}
```

**Save the token!** You'll need it for protected routes.

#### 3. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 4. Access Protected Route
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 5. Access Transactions (Now Protected)
```
GET http://localhost:5000/api/transactions
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 6. Forgot Password
```
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### 7. Reset Password
Check email for reset OTP, then:
```
POST http://localhost:5000/api/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "654321",
  "newPassword": "newpassword123"
}
```

---

### Step 10: Frontend Integration

Create `src/services/authAPI.js` in your React app:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authAPI = {
  // Register user
  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return response.json();
  },

  // Verify email
  verify: async (email, otp) => {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    return response.json();
  },

  // Resend OTP
  resendOTP: async (email) => {
    const response = await fetch(`${API_URL}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },

  // Login
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    
    // Store token in localStorage
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },

  // Reset password
  resetPassword: async (email, otp, newPassword) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });
    return response.json();
  },

  // Get current user
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    return response.json();
  },

  // Get token
  getToken: () => localStorage.getItem('token')
};
```

**Update `src/services/api.js`** to include token in requests:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fetchAPI = async (endpoint, options = {}) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Add token if exists
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ... rest of your transaction API methods ...
```

---

## 🎉 Authentication Complete!

You now have a fully functional authentication system with:
- ✅ User registration
- ✅ Email verification via OTP
- ✅ User login with JWT
- ✅ Forgot password
- ✅ Reset password
- ✅ Protected routes

---

## 🚀 Additional Advanced Features

### 1. Input Validation with Express Validator

Input validation ensures data integrity and prevents security issues.

#### Install Express Validator

```bash
npm install express-validator
```

#### Create Validation Middleware

Create `middleware/validation.js`:

```javascript
const { body, param, validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 */
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Transaction validation rules
 */
exports.validateTransaction = [
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be either income or expense'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
  body('date')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  checkValidation
];

/**
 * User registration validation
 */
exports.validateRegister = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
  checkValidation
];

/**
 * Login validation
 */
exports.validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  checkValidation
];

/**
 * MongoDB ID validation
 */
exports.validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  checkValidation
];

module.exports.checkValidation = checkValidation;
```

#### Use Validation in Routes

Update `routes/transactions.js`:

```javascript
const { validateTransaction, validateId } = require('../middleware/validation');

// Apply validation to routes
router.post('/', validateTransaction, async (req, res) => {
  // ... existing code ...
});

router.put('/:id', validateId, validateTransaction, async (req, res) => {
  // ... existing code ...
});

router.delete('/:id', validateId, async (req, res) => {
  // ... existing code ...
});
```

Update `routes/auth.js`:

```javascript
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, async (req, res) => {
  // ... existing code ...
});

router.post('/login', validateLogin, async (req, res) => {
  // ... existing code ...
});
```

**Benefits:**
- Prevents invalid data from reaching your database
- Provides clear error messages to users
- Improves security and data integrity

---

### 2. Rate Limiting

Rate limiting prevents abuse by limiting the number of requests from a single IP.

#### Install Rate Limiter

```bash
npm install express-rate-limit
```

#### Add to server.js

```javascript
const rateLimit = require('express-rate-limit');

// General rate limiter for all API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});

// Stricter rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later.'
  }
});

// Apply rate limiting
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

**What this does:**
- Limits general API requests to 100 per 15 minutes per IP
- Limits auth attempts to 5 per 15 minutes per IP
- Prevents brute force attacks and API abuse

---

### 3. Logging with Morgan

Morgan logs HTTP requests for debugging and monitoring.

#### Install Morgan

```bash
npm install morgan
```

#### Add to server.js

```javascript
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Create a write stream for logging to file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

// Log to console in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Log to file in production
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', { stream: accessLogStream }));
}
```

Update `.gitignore`:

```
node_modules/
.env
.DS_Store
*.log
logs/
```

**Benefits:**
- Track API usage and errors
- Debug issues more easily
- Monitor performance

---

### 4. User-Specific Transactions

Associate transactions with specific users so each user only sees their own data.

#### Update Transaction Model

Update `models/Transaction.js`:

```javascript
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type is required']
  },
  // ... rest of fields stay the same
}, {
  timestamps: true
});

// Index for better query performance
transactionSchema.index({ user: 1, date: -1 });
```

#### Update Transaction Routes

Update `routes/transactions.js`:

```javascript
// GET all transactions for logged-in user
router.get('/', async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    
    let query = { user: req.user._id }; // Only get user's transactions
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(100);
    
    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// CREATE transaction for logged-in user
router.post('/', async (req, res) => {
  try {
    const { type, amount, category, date, description } = req.body;
    
    if (!type || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        error: 'Please provide type, amount, category, and date'
      });
    }
    
    const transaction = new Transaction({
      user: req.user._id, // Associate with logged-in user
      type,
      amount,
      category,
      date,
      description
    });
    
    await transaction.save();
    
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// UPDATE - ensure user owns the transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id // Only update if user owns it
    });
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }
    
    Object.assign(transaction, req.body);
    await transaction.save();
    
    res.json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE - ensure user owns the transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id // Only delete if user owns it
    });
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Transaction deleted successfully',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET summary for logged-in user
router.get('/stats/summary', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance,
        transactionCount: transactions.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

**Benefits:**
- Each user only sees their own transactions
- Improved security and privacy
- Multi-user support

---

### 5. Error Handling Middleware

Create consistent error responses across your API.

#### Create Error Handler

Create `middleware/errorHandler.js`:

```javascript
/**
 * Custom error class
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new AppError(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new AppError(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error'
  });
};

module.exports = { AppError, errorHandler };
```

#### Update server.js

```javascript
const { errorHandler } = require('./middleware/errorHandler');

// ... all your routes ...

// Error handler (must be last middleware)
app.use(errorHandler);
```

**Benefits:**
- Consistent error responses
- Better error logging
- Cleaner code with centralized error handling

---

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
MongooseError: Could not connect to any servers
```
**Solution:**
- Check your connection string in `.env`
- Ensure IP whitelist includes your current IP
- Verify database user credentials

#### 2. CORS Error
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```
**Solution:**
- Check CORS configuration in `server.js`
- Verify `CLIENT_URL` in `.env` matches your frontend URL

#### 3. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in `.env`
- Or kill the process using port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

#### 4. Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
npm install
```

---

## 📚 Learning Resources

- **Node.js Documentation**: https://nodejs.org/docs/
- **Express.js Guide**: https://expressjs.com/en/guide/routing.html
- **MongoDB Manual**: https://www.mongodb.com/docs/manual/
- **Mongoose Docs**: https://mongoosejs.com/docs/guide.html
- **REST API Best Practices**: https://restfulapi.net/

---

## 🎓 Next Steps

1. **Add User Authentication**: Implement JWT-based auth
2. **Add Data Validation**: Use express-validator
3. **Implement Pagination**: Handle large datasets
4. **Add Search & Filters**: Advanced querying
5. **Write Tests**: Use Jest and Supertest
6. **Add Logging**: Use Winston or Morgan
7. **Implement Caching**: Use Redis for performance

---

## 📞 Support

If you encounter issues:
- Check the [Troubleshooting](#troubleshooting) section
- Review server logs for error messages
- Test endpoints with Postman
- Check MongoDB Atlas logs

**Contact:** Byron Young & Raees Johaadien

---

**Happy Coding! 🚀**
