import { useTheme } from "@/context/ThemeContext";
import { useTransactions } from "@/context/TransactionContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Download, User, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { transactions } = useTransactions();

  const handleExportCSV = () => {
    // Mock CSV export
    const csvContent = [
      ["Date", "Type", "Category", "Amount", "Description"],
      ...transactions.map((t) => [
        t.date,
        t.type,
        t.category,
        t.amount.toString(),
        t.description,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Transactions exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and account</p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-custom"
      >
        <div className="flex items-center gap-4 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            <p className="text-xs text-muted-foreground mt-1">Member since January 2025</p>
          </div>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-custom"
      >
        <div className="flex items-center gap-4 mb-6">
          {theme === "light" ? (
            <Sun className="h-5 w-5 text-primary" />
          ) : (
            <Moon className="h-5 w-5 text-primary" />
          )}
          <h2 className="text-xl font-semibold">Appearance</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme-toggle" className="text-base">
              Dark Mode
            </Label>
            <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
          </div>
          <Switch id="theme-toggle" checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-custom"
      >
        <div className="flex items-center gap-4 mb-6">
          <Download className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Data Management</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-base font-medium mb-2">Export Transactions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Download all your transactions as a CSV file
            </p>
            <Button onClick={handleExportCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export to CSV
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-custom"
      >
        <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-secondary">
            <p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary">
            <p className="text-sm text-muted-foreground mb-1">Income Entries</p>
            <p className="text-2xl font-bold text-success">
              {transactions.filter((t) => t.type === "income").length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-secondary">
            <p className="text-sm text-muted-foreground mb-1">Expense Entries</p>
            <p className="text-2xl font-bold text-destructive">
              {transactions.filter((t) => t.type === "expense").length}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
