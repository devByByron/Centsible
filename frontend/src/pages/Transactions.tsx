import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TransactionModal } from "@/components/TransactionModal";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { Search, Filter, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Transaction } from "@/data/mockData";

const Transactions = () => {
  const { transactions } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesCategory = filterCategory === "all" || t.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(transactions.map((t) => t.category)));

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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View and browse your financial transactions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction Table */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
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
                  {filteredTransactions.map((transaction, index) => (
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
          )}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <p className="text-sm text-muted-foreground">Total Transactions</p>
          <p className="text-2xl font-bold">{filteredTransactions.length}</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-2xl font-bold text-green-600">
            +${filteredTransactions
              .filter(t => t.type === "income")
              .reduce((sum, t) => sum + t.amount, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">
            -${filteredTransactions
              .filter(t => t.type === "expense")
              .reduce((sum, t) => sum + t.amount, 0)
              .toLocaleString()}
          </p>
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

export default Transactions;