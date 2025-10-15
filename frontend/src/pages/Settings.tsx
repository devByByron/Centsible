import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Download, User, Moon, Sun, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  // Mock settings data for display
  const settingsData = {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      joinDate: "January 2025"
    },
    preferences: {
      notifications: true,
      autoBackup: false,
      currency: "USD",
      budgetAlerts: true
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your experience and preferences
        </p>
      </div>

      {/* User Profile Section */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <User className="h-8 w-8 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">User Profile</h3>
            <p className="text-sm text-muted-foreground">Manage your account information</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <p className="mt-1 text-sm font-medium">{settingsData.user.name}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p className="mt-1 text-sm font-medium">{settingsData.user.email}</p>
          </div>
          <div>
            <Label>Member Since</Label>
            <p className="mt-1 text-sm font-medium">{settingsData.user.joinDate}</p>
          </div>
          <Button variant="outline" disabled>
            Edit Profile
          </Button>
        </div>
      </motion.div>

      {/* Theme Settings */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          {theme === "dark" ? (
            <Moon className="h-8 w-8 text-muted-foreground" />
          ) : (
            <Sun className="h-8 w-8 text-muted-foreground" />
          )}
          <div>
            <h3 className="text-lg font-semibold">Appearance</h3>
            <p className="text-sm text-muted-foreground">Customize the look and feel</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme-toggle">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark theme
            </p>
          </div>
          <Switch
            id="theme-toggle"
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
      </motion.div>

      {/* App Preferences */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <SettingsIcon className="h-8 w-8 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Preferences</h3>
            <p className="text-sm text-muted-foreground">App behavior and notifications</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for important updates
              </p>
            </div>
            <Switch checked={settingsData.preferences.notifications} disabled />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Backup</Label>
              <p className="text-sm text-muted-foreground">
                Automatically backup your data
              </p>
            </div>
            <Switch checked={settingsData.preferences.autoBackup} disabled />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Budget Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when exceeding budgets
              </p>
            </div>
            <Switch checked={settingsData.preferences.budgetAlerts} disabled />
          </div>
          
          <div>
            <Label>Currency</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Current: {settingsData.preferences.currency}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <Download className="h-8 w-8 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Data Management</h3>
            <p className="text-sm text-muted-foreground">Export and manage your data</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Button variant="outline" disabled className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Download your transaction data as a CSV file
            </p>
          </div>
          
          <div>
            <Button variant="outline" disabled className="w-full sm:w-auto">
              Import Data
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Import transactions from a CSV file
            </p>
          </div>
        </div>
      </motion.div>

      {/* App Information */}
      <motion.div
        className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-4">About Centsible</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Version: 1.0.0</p>
          <p>A simple expense tracking application for learning React development</p>
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;