import { createContext, useContext, useState, ReactNode } from "react";

export type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (id: string, transaction: Omit<Transaction, "id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Mock data
const mockTransactions: Transaction[] = [
  { id: "1", type: "income", amount: 5000, category: "Salary", date: "2025-01-15", description: "Monthly salary" },
  { id: "2", type: "expense", amount: 1200, category: "Rent", date: "2025-01-05", description: "Monthly rent payment" },
  { id: "3", type: "expense", amount: 350, category: "Food", date: "2025-01-10", description: "Groceries and dining" },
  { id: "4", type: "expense", amount: 80, category: "Transport", date: "2025-01-12", description: "Gas and metro" },
  { id: "5", type: "income", amount: 500, category: "Freelance", date: "2025-01-20", description: "Web design project" },
  { id: "6", type: "expense", amount: 200, category: "Entertainment", date: "2025-01-18", description: "Movies and games" },
  { id: "7", type: "expense", amount: 150, category: "Utilities", date: "2025-01-08", description: "Electric and water bills" },
  { id: "8", type: "income", amount: 300, category: "Investment", date: "2025-01-25", description: "Stock dividends" },
];

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = async (id: string, transaction: Omit<Transaction, "id">) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...transaction, id } : t))
    );
  };

  const deleteTransaction = async (id: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransactions must be used within TransactionProvider");
  return context;
};
