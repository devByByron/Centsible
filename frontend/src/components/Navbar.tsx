import { Search, Moon, Sun, Plus } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTransactions } from "@/context/TransactionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionModal } from "@/components/TransactionModal";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { transactions } = useTransactions();
  const [addModalOpen, setAddModalOpen] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Balance Display */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? "text-success" : "text-destructive"}`}>
              ${balance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 w-64 bg-background/50"
            />
          </div>

          <Button
            size="icon"
            onClick={() => setAddModalOpen(true)}
            className="rounded-xl bg-primary hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <TransactionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        transaction={null}
      />
    </header>
  );
};
