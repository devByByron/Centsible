import { useTransactions } from "@/context/TransactionContext";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertCircle, DollarSign } from "lucide-react";
import { categoryStats, monthlyData, summary } from "@/data/mockData";

const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#06b6d4"];

const Analytics = () => {
  const { transactions } = useTransactions();

  // Using mock data for consistent analytics display
  const totalIncome = summary.totalIncome;
  const totalExpenses = summary.totalExpenses;
  const balance = summary.currentBalance;
  const savingsRate = summary.savingsRate;

  // Financial insights for learning
  const insights = [
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      description: "Of your income is saved",
      icon: TrendingUp,
      color: "text-green-600",
      trend: "Great job!"
    },
    {
      title: "Largest Expense",
      value: "Rent",
      description: `$${categoryStats[0].amount.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-600",
      trend: "35% of expenses"
    },
    {
      title: "Income Sources",
      value: "3",
      description: "Different income streams",
      icon: DollarSign,
      color: "text-blue-600",
      trend: "Diversified"
    },
    {
      title: "Monthly Average",
      value: `$${summary.avgExpensesPerMonth.toLocaleString()}`,
      description: "Average monthly expenses",
      icon: AlertCircle,
      color: "text-yellow-600",
      trend: "Under budget"
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your financial patterns
        </p>
      </div>

      {/* Key Insights */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{insight.title}</p>
                <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <p className="text-xs text-green-600 mt-1">{insight.trend}</p>
              </div>
              <insight.icon className={`h-8 w-8 ${insight.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expense Categories */}
        <motion.div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="amount"
                label={({ name, percentage }) => `${name} ${percentage}%`}
              >
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, ""]} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} name="Balance" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Income vs Expenses Bar Chart */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses by Month</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, ""]} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Breakdown Table */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
        <div className="space-y-4">
          {categoryStats.map((category, index) => (
            <div key={category.category} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.category}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">{category.percentage}%</span>
                <span className="font-bold">${category.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="font-semibold text-green-600">Total Income</h4>
          <p className="text-3xl font-bold mt-2">${totalIncome.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Average: ${summary.avgIncomePerMonth.toLocaleString()}/month
          </p>
        </motion.div>
        
        <motion.div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="font-semibold text-red-600">Total Expenses</h4>
          <p className="text-3xl font-bold mt-2">${totalExpenses.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Average: ${summary.avgExpensesPerMonth.toLocaleString()}/month
          </p>
        </motion.div>
        
        <motion.div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="font-semibold text-blue-600">Net Balance</h4>
          <p className="text-3xl font-bold mt-2">${balance.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {summary.transactionCount} total transactions
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;