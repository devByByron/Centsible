# Centsible - Learning Guide

This is a simplified version of the Centsible expense tracking application, designed specifically for **project-based learning**. All complex functionality has been removed and replaced with static mock data, allowing you to focus on learning React concepts, TypeScript, and modern web development patterns without getting overwhelmed by business logic.

## 🎯 Learning Objectives

This project is structured to help you learn:
- **React Fundamentals**: Components, props, state, hooks, and context
- **TypeScript**: Type safety, interfaces, and type definitions
- **Modern CSS**: Tailwind CSS utility classes and responsive design
- **Component Architecture**: Reusable UI components and design systems
- **Data Visualization**: Charts and graphs with Recharts
- **State Management**: React Context for global state
- **Routing**: Single-page application navigation

## 📚 Technology Stack Deep Dive

### **React 18**
**What it is**: A JavaScript library for building user interfaces (UIs). It lets you create reusable "components" that update automatically when data changes.

**Why we use it**: Makes building interactive web apps easier. Instead of manually updating HTML, React handles changes efficiently.

**Key concepts you'll learn**:
- **Components**: Like building blocks - small, focused pieces of UI
- **Props**: Data passed between components (like function parameters)
- **State**: Data that can change over time (useState hook)
- **Hooks**: Special functions for managing state and side effects
- **JSX**: HTML-like syntax in JavaScript

### **TypeScript**
**What it is**: A superset of JavaScript that adds "types" (like labels for data). It helps catch errors early and makes code more reliable.

**Why we use it**: Prevents bugs by ensuring variables and functions use the correct data types (e.g., a number can't be treated as a string).

**Key concepts you'll learn**:
- **Interfaces**: Blueprints for objects (like a Transaction interface)
- **Types**: Custom labels for data structures
- **Type checking**: Compiler catches errors before runtime
- **Generic types**: Reusable types with parameters

### **Tailwind CSS**
**What it is**: A utility-first CSS framework. Instead of writing custom styles, you use pre-built classes (e.g., `bg-blue-500` for a blue background).

**Why we use it**: Speeds up styling and ensures consistency. It's great for responsive designs (adapting to different screen sizes).

**Key concepts you'll learn**:
- **Utility classes**: `flex`, `p-4` (padding), `hover:bg-gray-200`
- **Responsive design**: `md:`, `lg:` prefixes for different screen sizes
- **Dark mode**: Automatic theme switching
- **Component styling**: Combining utilities for custom components

### **Vite**
**What it is**: A build tool that compiles and serves your app quickly during development.

**Why we use it**: Faster than older tools like Create React App. It handles hot reloading (instant updates when you save files).

### **Shadcn/UI**
**What it is**: A collection of pre-built, customizable UI components (like buttons, modals) built on top of Radix UI and styled with Tailwind.

**Why we use it**: Saves time by providing ready-made components. They're accessible (work well with screen readers) and look professional.

### **Recharts**
**What it is**: A React library for creating charts and graphs.

**Why we use it**: Makes data visualization easy. You pass data as props, and it renders interactive charts.

### **React Router**
**What it is**: A library for handling navigation between pages in a React app.

**Why we use it**: Allows "single-page app" behavior (switching views without reloading the page).

### **Framer Motion**
**What it is**: A library for adding animations to React components.

**Why we use it**: Makes UIs feel smooth and engaging with transitions and effects.

## 📁 Project Structure & File Explanations

Here's a detailed breakdown of every file and folder. I've included what each file does, why it exists, and how it fits into the bigger picture.

### **Root-Level Files**
- **`package.json`**: Project configuration. Lists all dependencies (React, Tailwind, etc.) and scripts (`npm run dev`)
- **`vite.config.ts`**: Vite configuration. Sets up React plugin and path aliases
- **`tsconfig.json`**: TypeScript configuration. Defines compiler options and type checking rules
- **`tailwind.config.js`**: Tailwind customization. Adds custom colors and theme settings
- **`index.html`**: Entry point. Contains the `<div id="root">` where React mounts

### **[`src`](src ) Folder - Main Application Code**

#### **`components/` Folder**
Reusable UI pieces. Think of these as Lego blocks that can be used across different pages.

**`ui/` Subfolder** - Shadcn/UI Components (Pre-built, customizable):
- **`button.tsx`**: Button component with variants (primary, secondary, destructive)
- **`card.tsx`**: Card containers for grouping content
- **`dialog.tsx`**: Modal/pop-up windows
- **`input.tsx`**: Form input fields
- **`table.tsx`**: Data tables with sorting and pagination
- **`alert-dialog.tsx`**: Confirmation dialogs ("Are you sure?")

**Custom Components**:
- **`Layout.tsx`**: Main app wrapper. Includes navbar, sidebar, and content area. Uses React Router's `<Outlet>`
- **`Navbar.tsx`**: Top navigation bar with app title, theme toggle, and user avatar
- **`Sidebar.tsx`**: Left navigation menu with links to different pages
- **`StatCard.tsx`**: Reusable card for displaying statistics (income, expenses, etc.)
- **`TransactionModal.tsx`**: Modal for adding/editing transactions (currently display-only)
- **`DeleteConfirmationDialog.tsx`**: Confirmation dialog for delete actions

#### **`context/` Folder**
Global state management. Instead of passing data through props manually, Context makes data available anywhere.

- **`ThemeContext.tsx`**: Manages dark/light theme switching. Provides `toggleTheme()` function
- **`TransactionContext.tsx`**: Provides mock transaction data to all components

#### **`data/` Folder**
Static data for the app. Since we removed real functionality, this acts as our "database".

- **`mockData.ts`**: Contains:
  - `Transaction` interface (TypeScript type definition)
  - Sample transactions array
  - Category definitions
  - Monthly data for charts
  - Summary statistics

#### **`pages/` Folder**
Main application screens. Each is a React component that renders when you navigate to that route.

- **`Dashboard.tsx`**: Home page with overview stats, charts, and recent transactions
- **`Transactions.tsx`**: Full transaction list with search, filters, and action buttons
- **`Analytics.tsx`**: Detailed charts and data visualizations
- **`Settings.tsx`**: User preferences and app settings
- **`NotFound.tsx`**: 404 error page for invalid URLs

#### **`lib/` Folder**
Utility functions and helpers.

- **`utils.ts`**: Helper functions like date formatting and currency display

## 🔄 How Data Flows Through the App

1. **Data Source**: `mockData.ts` contains all sample data
2. **Global State**: `TransactionContext.tsx` makes data available app-wide
3. **Page Components**: Pages like `Dashboard.tsx` consume data via `useContext()`
4. **UI Components**: Reusable components like `StatCard.tsx` receive data as props
5. **Display**: Data gets rendered as charts, tables, and statistics

## 🎯 Learning Opportunities by Category

### **React Concepts to Study**
1. **Component Composition**: How `Dashboard.tsx` combines `StatCard`, charts, and tables
2. **Props & Data Flow**: How data passes from `mockData.ts` → Context → Components
3. **State Management**: `useState` for local state, Context for global state
4. **Hooks**: `useContext`, `useState`, `useEffect` patterns
5. **Routing**: How React Router switches between pages

### **TypeScript Concepts to Study**
1. **Interfaces**: `Transaction` interface in `mockData.ts`
2. **Type Safety**: How TypeScript prevents bugs
3. **Generic Types**: Component prop types
4. **Union Types**: `income | expense` type definitions

### **CSS & Styling Concepts**
1. **Utility Classes**: Tailwind's `flex`, `grid`, `p-4`, `bg-green-500`
2. **Responsive Design**: `md:`, `lg:` breakpoints
3. **Dark Mode**: CSS custom properties and theme switching
4. **Component Variants**: Button styles (primary, secondary, destructive)

### **Data Visualization**
1. **Chart Components**: PieChart, BarChart, LineChart from Recharts
2. **Data Transformation**: How raw data becomes chart-ready format
3. **Interactive Elements**: Tooltips, legends, and hover effects

## 🛠️ Learning Exercises

### **Beginner Level** 🟢
1. **Modify Mock Data**: Change transaction amounts in `mockData.ts` and see UI updates
2. **Style Tweaks**: Change colors using Tailwind classes (e.g., `bg-blue-500` to `bg-red-500`)
3. **Add New Categories**: Extend the categories array and update components
4. **Component Props**: Add a new prop to `StatCard.tsx` and pass it from `Dashboard.tsx`

### **Intermediate Level** 🟡
1. **New Components**: Create a `BudgetCard.tsx` component similar to `StatCard.tsx`
2. **Custom Hooks**: Extract filtering logic from `Transactions.tsx` into a custom hook
3. **Theme Extensions**: Add a new color scheme to the theme system
4. **Form Handling**: Make the transaction modal actually functional
5. **Local Storage**: Save theme preference to browser storage

### **Advanced Level** 🔴
1. **State Management**: Replace mock data with real React state and CRUD operations
2. **API Integration**: Connect to a real backend API for data persistence
3. **Testing**: Add unit tests for components using Jest and React Testing Library
4. **Performance**: Implement React.memo, useMemo, and useCallback optimizations
5. **Advanced Routing**: Add protected routes and route guards

## 🔍 Key Files to Study First

Start with these files in order - they're the foundation of the app:

1. **[`src/data/mockData.ts`](src/data/mockData.ts )** - Understand the data structure
2. **[`src/context/TransactionContext.tsx`](src/context/TransactionContext.tsx )** - Learn Context API
3. **[`src/components/StatCard.tsx`](src/components/StatCard.tsx )** - Simple component example
4. **[`src/pages/Dashboard.tsx`](src/pages/Dashboard.tsx )** - Complex page component
5. **[`src/context/ThemeContext.tsx`](src/context/ThemeContext.tsx )** - Working theme system

## 💡 Learning Tips

- **Start Small**: Focus on one component at a time
- **Use DevTools**: Install React Developer Tools browser extension
- **Console Logging**: Add `console.log()` statements to see data flow
- **Break Things**: Experiment with changes to understand what breaks and why
- **Read Documentation**: Each library (React, Tailwind, etc.) has excellent docs
- **Build Gradually**: Add complexity one feature at a time

## 🚀 Getting Started with Learning

1. **Run the app**: `npm run dev` and explore each page
2. **Read the code**: Start with the Key Files listed above
3. **Make changes**: Try the Beginner exercises
4. **Ask questions**: Don't hesitate to experiment and break things
5. **Build something**: Use this as a foundation for your own projects

## 📚 Additional Resources

- **React Docs**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shadcn/UI**: https://ui.shadcn.com/
- **Recharts**: https://recharts.org/

Happy learning! This codebase is designed to be your playground for mastering modern React development. 🎉

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

3. **Explore the Code**
   - Start with `src/App.tsx` to understand the application structure
   - Look at `src/data/mockData.ts` to see the data models
   - Study individual components to understand React patterns

## Learning Exercises

### 🔧 Beginner Exercises
1. **Modify Mock Data**: Change the sample transactions and see how it affects the UI
2. **Style Tweaks**: Experiment with Tailwind classes to change colors and spacing
3. **Add New Categories**: Extend the mock data with new transaction categories

### 🔧 Intermediate Exercises
1. **New Components**: Create new statistic cards or chart components
2. **Routing**: Add new pages and navigation items
3. **Theme Customization**: Add new color schemes to the theme system

### 🔧 Advanced Exercises
1. **Add Functionality**: Gradually add back real state management and CRUD operations
2. **Local Storage**: Implement client-side data persistence
3. **API Integration**: Connect to a real backend API
4. **Testing**: Add unit tests for components and functions

## Key Files to Study

1. **`src/data/mockData.ts`** - All data types and sample data
2. **`src/context/TransactionContext.tsx`** - Simplified context provider
3. **`src/pages/Dashboard.tsx`** - Complex component with multiple features
4. **`src/components/StatCard.tsx`** - Reusable component example
5. **`src/context/ThemeContext.tsx`** - Working context with functionality

## Tips for Learning

- **Start Small**: Focus on one component at a time
- **Use DevTools**: Install React Developer Tools browser extension
- **Read the Code**: Take time to understand each line and pattern
- **Experiment**: Make small changes and see what happens
- **Build Gradually**: Add complexity back piece by piece

Happy learning! 🚀