import { createContext, useContext, ReactNode } from "react";
import { mockTransactions, Transaction } from "@/data/mockData";

// Simplified context type - no complex state management
type TransactionContextType = {
  transactions: Transaction[];
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Simple provider that just supplies static mock data
export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TransactionContext.Provider value={{ transactions: mockTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error("useTransactions must be used within TransactionProvider");
  return context;
};
