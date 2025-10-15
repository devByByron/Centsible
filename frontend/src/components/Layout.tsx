import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
