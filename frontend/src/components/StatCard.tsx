import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "success" | "danger";
};

export const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) => {
  const gradientClass = {
    default: "gradient-primary",
    success: "gradient-success",
    danger: "gradient-danger",
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-custom hover:shadow-custom-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-3xl font-bold mb-1">{value}</h3>
          {trend && (
            <p className="text-sm text-muted-foreground">{trend}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};
