# Centsible - Simplified Learning Version

This is a simplified version of the Centsible expense tracking application, designed for project-based learning. All complex functionality has been removed and replaced with static mock data, allowing us to focus on learning the design patterns and React concepts without getting overwhelmed by business logic.

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

## Technology Stack Overview

Before diving into the files, let's understand the main technologies used in this project. This will help you grasp why certain files exist and how they work together.

### **React**
- **What it is**: A JavaScript library for building user interfaces (UIs). It lets you create reusable "components" that update automatically when data changes.
- **Why we use it**: Makes building interactive web apps easier. Instead of manually updating HTML, React handles changes efficiently.
- **Key concepts**: Components (like building blocks), props (data passed between components), state (data that can change), and hooks (functions for managing state and side effects).

### **TypeScript**
- **What it is**: A superset of JavaScript that adds "types" (like labels for data). It helps catch errors early and makes code more reliable.
- **Why we use it**: Prevents bugs by ensuring variables and functions use the correct data types (e.g., a number can't be treated as a string).
- **Key concepts**: Interfaces (blueprints for objects), types (custom labels), and type checking.

### **Tailwind CSS**
- **What it is**: A utility-first CSS framework. Instead of writing custom styles, you use pre-built classes (e.g., `bg-blue-500` for a blue background).
- **Why we use it**: Speeds up styling and ensures consistency. It's great for responsive designs (adapting to different screen sizes).
- **Key concepts**: Classes like `flex`, `p-4` (padding), and `hover:bg-gray-200` (hover effects).

### **Vite**
- **What it is**: A build tool that compiles and serves your app quickly during development.
- **Why we use it**: Faster than older tools like Create React App. It handles hot reloading (instant updates when you save files).

### **Shadcn/UI**
- **What it is**: A collection of pre-built, customizable UI components (like buttons, modals) built on top of Radix UI and styled with Tailwind.
- **Why we use it**: Saves time by providing ready-made components. They're accessible (work well with screen readers) and look professional.

### **Recharts**
- **What it is**: A React library for creating charts and graphs.
- **Why we use it**: Makes data visualization easy. You pass data as props, and it renders interactive charts.

### **React Router**
- **What it is**: A library for handling navigation between pages in a React app.
- **Why we use it**: Allows "single-page app" behavior (switching views without reloading the page).

### **Framer Motion**
- **What it is**: A library for adding animations to React components.
- **Why we use it**: Makes UIs feel smooth and engaging with transitions and effects.

### **Other Tools**
- **ESLint**: Checks code for errors and enforces style rules.
- **PostCSS**: Processes CSS for better compatibility.
- **Lucide React**: Provides icons (like the pencil or trash icons in your tables).

## In-Depth File and Folder Explanations

Here's a detailed breakdown of every file and folder in the [`src`](src ) directory. I've grouped them by folder for clarity, explaining their purpose, key contents, and how they fit into the app. Think of this as a map to help you navigate the codebase.

### **Root-Level Files (Outside [`src`](src ))**
- **[`package.json`](package.json )**: Defines the project (name: "centsible", version, dependencies like React and Tailwind). It lists scripts (e.g., `npm run dev` to start the app) and metadata.
- **[`vite.config.ts`](vite.config.ts )**: Configures Vite (the build tool). It sets up plugins for React and Tailwind, and defines how the app is built/served.
- **[`tsconfig.json`](tsconfig.json )**: Configures TypeScript (e.g., which files to check, strict rules for type safety).
- **`tailwind.config.js`**: Customizes Tailwind CSS (e.g., adds custom colors or fonts for your theme).
- **[`index.html`](index.html )**: The main HTML file. It includes the `<div id="root">` where React renders the app, and links to CSS/JS.
- **[`README.md`](README.md )**: General project info (not the learning one you're reading).

### **[`src`](src ) Folder (Main Application Code)**
This is where your app's logic lives. Everything here is compiled by Vite into a working web app.

#### **`components/` Folder**
Reusable pieces of UI that can be used across pages. Components are like Lego blocks—small, focused, and combinable.

- **`ui/` Subfolder**: Contains Shadcn/UI components (pre-built, customizable). These are the "atoms" of your UI.
  - **`button.tsx`**: Defines a Button component (e.g., for "Submit" or "Cancel"). It uses variants (styles like "primary" or "destructive") and handles clicks.
  - **`card.tsx`**: A Card component for grouping content (e.g., wrapping stats or forms). Includes headers, bodies, and footers.
  - **`dialog.tsx`**: A modal/dialog component (pop-up windows). Used for your edit/delete modals.
  - **`input.tsx`**: Input fields (text boxes) for forms. Handles user input and validation.
  - **`table.tsx`**: Table components for displaying data in rows/columns (like your transaction tables).
  - **`alert-dialog.tsx`**: Confirmation dialogs (e.g., "Are you sure?"). Used in your delete modal.
  - **Other `.tsx` files**: Similar pre-built components (e.g., `badge.tsx` for tags, `chart.tsx` for Recharts integration).

- **`Layout.tsx`**: Wraps the entire app with a consistent structure (e.g., navbar + sidebar + main content). It uses React Router's `<Outlet>` to render the current page.
- **`Navbar.tsx`**: The top navigation bar. Includes the app title, theme toggle, and user avatar. It stays visible across pages.
- **`Sidebar.tsx`**: The left-side menu. Contains links to pages (Dashboard, Transactions, etc.) and uses React Router for navigation.
- **`StatCard.tsx`**: A reusable card for displaying statistics (e.g., "Total Income: $500"). It takes props like title, value, and icon, and styles them with Tailwind.
- **`TransactionModal.tsx`**: A modal for adding/editing transactions. Currently display-only (with mock data), but shows form fields and submit logic.
- **`DeleteConfirmationDialog.tsx`**: A confirmation dialog for deletions. Uses Shadcn's AlertDialog to show "Are you sure?" with Cancel/Delete buttons.

#### **`context/` Folder**
Manages "global state" (data shared across components). Instead of passing props down manually, Context provides data anywhere in the app.

- **`ThemeContext.tsx`**: Handles dark/light mode switching. It stores the current theme and provides a `toggleTheme` function. Components use `useContext` to access it.
- **`TransactionContext.tsx`**: Provides mock transaction data. It defines a `TransactionProvider` that wraps the app, making data available via `useContext`. (Simplified—no real CRUD yet.)

#### **`data/` Folder**
Static data for the app. Since functionality is removed, this is where all "fake" data lives.

- **`mockData.ts`**: Contains TypeScript interfaces (e.g., `Transaction` type) and sample data arrays (e.g., transactions, categories). This is the "database" for learning—easy to modify and see changes.

#### **`pages/` Folder**
The main "screens" of your app. Each is a React component rendered by React Router.

- **`Dashboard.tsx`**: The home page. Shows overview stats, charts, and recent transactions. Combines multiple components (StatCard, charts) for a summary view.
- **`Transactions.tsx`**: Lists all transactions in a table. Includes filters/search and action buttons (edit/delete). Uses mock data from Context.
- **`Analytics.tsx`**: Displays detailed charts (pie, bar, line) for spending analysis. Uses Recharts to visualize data.
- **`Settings.tsx`**: A simple settings page (e.g., for themes or preferences). Currently basic, but expandable.
- **`NotFound.tsx`**: The 404 page for invalid URLs. Shows a friendly message and link back to Dashboard.

#### **`lib/` Folder**
Utility functions and helpers. Keeps reusable logic separate from components.

- **`utils.ts`**: Helper functions (e.g., date formatting, currency display). Used across the app for consistency.

### **How Files Work Together**
- **Data Flow**: `mockData.ts` → `TransactionContext.tsx` → Pages/Components (e.g., Dashboard reads data via Context).
- **UI Flow**: Pages use components from `components/` (e.g., `Dashboard.tsx` renders `StatCard` and charts).
- **Styling**: All files use Tailwind classes for consistent looks. Themes come from `ThemeContext.tsx`.
- **Navigation**: `Layout.tsx` + `Sidebar.tsx`/`Navbar.tsx` handle routing via React Router.
- **Modals**: `TransactionModal.tsx` and `DeleteConfirmationDialog.tsx` are triggered by button clicks in tables.

This structure follows React best practices: separation of concerns (UI, data, logic), reusability, and scalability. As you learn, experiment by modifying files and seeing the effects!

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
   - Start with [`src/App.tsx`](src/App.tsx ) to understand the application structure
   - Look at [`src/data/mockData.ts`](src/data/mockData.ts ) to see the data models
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

1. **[`src/data/mockData.ts`](src/data/mockData.ts )** - All data types and sample data
2. **[`src/context/TransactionContext.tsx`](src/context/TransactionContext.tsx )** - Simplified context provider
3. **[`src/pages/Dashboard.tsx`](src/pages/Dashboard.tsx )** - Complex component with multiple features
4. **[`src/components/StatCard.tsx`](src/components/StatCard.tsx )** - Reusable component example
5. **[`src/context/ThemeContext.tsx`](src/context/ThemeContext.tsx )** - Working context with functionality

## Tips for Learning

- **Start Small**: Focus on one component at a time
- **Use DevTools**: Install React Developer Tools browser extension
- **Read the Code**: Take time to understand each line and pattern
- **Experiment**: Make small changes and see what happens
- **Build Gradually**: Add complexity back piece by piece

## Author
Byron Young & Raees Johaadien

Happy learning! 🚀
