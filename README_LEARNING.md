# Centsible - Simplified Learning Version

This is a simplified version of the Centsible expense tracking application, designed for project-based learning. All complex functionality has been removed and replaced with static mock data, allowing you to focus on learning the design patterns and React concepts without getting overwhelmed by business logic.

## What Was Simplified

### ✅ Removed Complex Features
- **State Management**: No more complex useState hooks, async operations, or data mutations
- **API Calls**: No simulated async calls or loading states
- **Form Handling**: Forms are now display-only for visual learning
- **CRUD Operations**: No add, edit, or delete functionality
- **User Interactions**: Modals and buttons are simplified or disabled

### ✅ What You Still Have
- **Beautiful UI**: All the Tailwind CSS styling and component design
- **Mock Data**: Realistic sample data in `src/data/mockData.ts`
- **Navigation**: Working React Router between pages
- **Charts**: Recharts visualizations with static data
- **Animations**: Framer Motion animations for learning
- **Theme System**: Working dark/light theme toggle
- **Responsive Design**: Mobile-friendly layouts

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navbar.tsx      # Top navigation
│   ├── Sidebar.tsx     # Side navigation
│   ├── StatCard.tsx    # Statistics display cards
│   └── TransactionModal.tsx  # Simplified modal (display only)
├── context/            # React Context providers
│   ├── ThemeContext.tsx     # Theme switching logic
│   └── TransactionContext.tsx  # Simplified data provider
├── data/               # Mock data
│   └── mockData.ts     # All sample data and types
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Overview with charts
│   ├── Transactions.tsx # Transaction list with filters
│   ├── Analytics.tsx   # Detailed analytics
│   ├── Settings.tsx    # Settings page
│   └── NotFound.tsx    # 404 page
└── lib/                # Utility functions
    └── utils.ts        # Helper functions
```

## Learning Opportunities

### 🎯 React Concepts to Study
1. **Component Composition**: Study how complex UIs are built from smaller components
2. **Props and Types**: Learn TypeScript interfaces and prop passing
3. **Context API**: Understand global state management with React Context
4. **Hooks**: Practice with useState, useContext, and custom hooks
5. **Routing**: Learn React Router navigation patterns

### 🎯 Styling Concepts
1. **Tailwind CSS**: Study utility-first CSS approach
2. **Component Variants**: Learn design system patterns
3. **Responsive Design**: Understand mobile-first layouts
4. **Dark/Light Themes**: Study CSS custom properties for theming

### 🎯 Data Visualization
1. **Recharts**: Learn chart component usage and configuration
2. **Data Transformation**: Study how raw data becomes visualizations
3. **Interactive Charts**: Understand tooltip and legend implementations

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