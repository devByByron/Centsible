export type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description: string;
};

export type CategoryStats = {
  category: string;
  amount: number;
  percentage: number;
  color: string;
};

export type MonthlyData = {
  month: string;
  income: number;
  expenses: number;
  balance: number;
};

// Sample transactions for learning
export const mockTransactions: Transaction[] = [
  // January 2025
  { id: "1", type: "income", amount: 5000, category: "Salary", date: "2025-01-01", description: "Monthly salary payment" },
  { id: "2", type: "expense", amount: 1200, category: "Rent", date: "2025-01-02", description: "Monthly apartment rent" },
  { id: "3", type: "expense", amount: 350, category: "Food", date: "2025-01-03", description: "Weekly groceries at supermarket" },
  { id: "4", type: "expense", amount: 80, category: "Transport", date: "2025-01-04", description: "Gas and public transport" },
  { id: "5", type: "income", amount: 800, category: "Freelance", date: "2025-01-05", description: "Web development project" },
  { id: "6", type: "expense", amount: 200, category: "Entertainment", date: "2025-01-06", description: "Movies and dining out" },
  { id: "7", type: "expense", amount: 150, category: "Utilities", date: "2025-01-07", description: "Electricity and water bills" },
  { id: "8", type: "income", amount: 300, category: "Investment", date: "2025-01-08", description: "Stock dividends" },
  { id: "9", type: "expense", amount: 120, category: "Shopping", date: "2025-01-09", description: "Clothing and accessories" },
  { id: "10", type: "expense", amount: 60, category: "Health", date: "2025-01-10", description: "Pharmacy and supplements" },
  
  // December 2024
  { id: "11", type: "income", amount: 5000, category: "Salary", date: "2024-12-01", description: "Monthly salary payment" },
  { id: "12", type: "expense", amount: 1200, category: "Rent", date: "2024-12-02", description: "Monthly apartment rent" },
  { id: "13", type: "expense", amount: 400, category: "Food", date: "2024-12-05", description: "Holiday groceries and dining" },
  { id: "14", type: "expense", amount: 90, category: "Transport", date: "2024-12-07", description: "Holiday travel expenses" },
  { id: "15", type: "income", amount: 600, category: "Freelance", date: "2024-12-10", description: "Logo design project" },
  { id: "16", type: "expense", amount: 500, category: "Entertainment", date: "2024-12-15", description: "Holiday celebrations" },
  { id: "17", type: "expense", amount: 180, category: "Utilities", date: "2024-12-20", description: "Winter heating bills" },
  { id: "18", type: "expense", amount: 300, category: "Shopping", date: "2024-12-22", description: "Holiday gifts" },
  
  // November 2024
  { id: "19", type: "income", amount: 5000, category: "Salary", date: "2024-11-01", description: "Monthly salary payment" },
  { id: "20", type: "expense", amount: 1200, category: "Rent", date: "2024-11-02", description: "Monthly apartment rent" },
  { id: "21", type: "expense", amount: 320, category: "Food", date: "2024-11-05", description: "Monthly groceries" },
  { id: "22", type: "expense", amount: 70, category: "Transport", date: "2024-11-08", description: "Monthly transport pass" },
  { id: "23", type: "income", amount: 450, category: "Freelance", date: "2024-11-12", description: "Website maintenance" },
  { id: "24", type: "expense", amount: 180, category: "Entertainment", date: "2024-11-15", description: "Concert and dinner" },
  { id: "25", type: "expense", amount: 140, category: "Utilities", date: "2024-11-18", description: "Monthly utility bills" },
];

// Category statistics for pie charts
export const categoryStats: CategoryStats[] = [
  { category: "Rent", amount: 3600, percentage: 35, color: "#8b5cf6" },
  { category: "Food", amount: 1070, percentage: 20, color: "#3b82f6" },
  { category: "Entertainment", amount: 880, percentage: 15, color: "#10b981" },
  { category: "Utilities", amount: 470, percentage: 10, color: "#f59e0b" },
  { category: "Transport", amount: 240, percentage: 8, color: "#ef4444" },
  { category: "Shopping", amount: 420, percentage: 7, color: "#ec4899" },
  { category: "Health", amount: 60, percentage: 5, color: "#06b6d4" },
];

// Monthly income vs expenses data
export const monthlyData: MonthlyData[] = [
  { month: "Nov", income: 5450, expenses: 3330, balance: 2120 },
  { month: "Dec", income: 5600, expenses: 3870, balance: 1730 },
  { month: "Jan", income: 6100, expenses: 2160, balance: 3940 },
];

// Summary statistics
export const summary = {
  totalIncome: 17150,
  totalExpenses: 9360,
  currentBalance: 7790,
  transactionCount: 25,
  avgIncomePerMonth: 5716,
  avgExpensesPerMonth: 3120,
  savingsRate: 45.4,
};

// Categories for dropdowns/forms
export const incomeCategories = [
  "Salary",
  "Freelance",
  "Investment",
  "Business",
  "Gift",
  "Other"
];

export const expenseCategories = [
  "Rent",
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Health",
  "Education",
  "Other"
];

// Recent activity for dashboard
export const recentActivity = mockTransactions.slice(0, 5);

// Goals and targets (static for learning)
export const financialGoals = [
  { id: "1", title: "Emergency Fund", target: 15000, current: 7790, progress: 52 },
  { id: "2", title: "Vacation Savings", target: 3000, current: 1200, progress: 40 },
  { id: "3", title: "New Laptop", target: 2000, current: 800, progress: 40 },
];