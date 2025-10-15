import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { TransactionModal } from "@/components/TransactionModal";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { DollarSign, TrendingUp, TrendingDown, Pencil, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { categoryStats, monthlyData, summary, Transaction } from "@/data/mockData";

const Dashboard = () => {
  const { transactions } = useTransactions();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Using static calculations from mock data for learning
  const totalIncome = summary.totalIncome;
  const totalExpenses = summary.totalExpenses;
  const balance = summary.currentBalance;

  // Recent transactions for display (first 5)
  const recentTransactions = transactions.slice(0, 5);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete functionality
    console.log('Deleting transaction:', selectedTransaction?.id);
    setSelectedTransaction(null);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Total Balance"
            value={`$${balance.toLocaleString()}`}
            icon={DollarSign}
            trend="Looking good!"
            variant="success"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            icon={TrendingUp}
            trend="8.2% increase"
            variant="success"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Total Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            icon={TrendingDown}
            trend="3.1% decrease"
            variant="default"
          />
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expenses by Category */}
        <motion.div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
                label={({ name, percentage }) => `${name} (${percentage}%)`}
              >
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Income vs Expenses */}
        <motion.div
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
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
      </div>

      {/* Recent Transactions */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                      })}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {transaction.category}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-semibold ${
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => handleEdit(transaction)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteClick(transaction)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Edit Transaction Modal */}
      <TransactionModal
        open={editModalOpen}
        onClose={handleModalClose}
        transaction={selectedTransaction}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedTransaction(null);
        }}
        onConfirm={handleDeleteConfirm}
        transactionDescription={selectedTransaction?.description}
      />
    </div>
  );
};

export default Dashboard;