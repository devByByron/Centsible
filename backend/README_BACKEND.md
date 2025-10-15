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
11. [Advanced Features](#advanced-features)
12. [Troubleshooting](#troubleshooting)

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
npm install --save-dev nodemon
```

**nodemon**: Automatically restarts server when code changes (development only)

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
    "test": "echo \"Error: no test specified\" && exit 1"
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
    "nodemon": "^3.0.1"
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

## 🔐 Advanced Features

### 1. User Authentication (JWT)

Install additional packages:
```bash
npm install bcryptjs jsonwebtoken
```

Create `models/User.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### 2. Input Validation

Install validator:
```bash
npm install express-validator
```

Create `middleware/validation.js`:
```javascript
const { body, validationResult } = require('express-validator');

exports.validateTransaction = [
  body('type').isIn(['income', 'expense']),
  body('amount').isFloat({ min: 0 }),
  body('category').notEmpty().trim(),
  body('date').isISO8601(),
  body('description').optional().trim().isLength({ max: 500 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

### 3. Rate Limiting

Install rate limiter:
```bash
npm install express-rate-limit
```

Add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

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
