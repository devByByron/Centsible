# Centsible

A modern, responsive expense tracking application built with React, TypeScript, and Tailwind CSS. Track your income and expenses with beautiful charts, insights, and a clean, intuitive interface.

![Centsible Preview](https://via.placeholder.com/800x400/10b981/ffffff?text=Centsible+Expense+Tracker)

## ✨ Features

- 📊 **Interactive Dashboard** - Overview of your financial health with charts and statistics
- 💰 **Transaction Management** - Add, edit, and categorize income and expenses
- 📈 **Analytics & Insights** - Visual charts showing spending patterns and trends
- 🎨 **Dark/Light Theme** - Seamless theme switching with system preference detection
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Advanced Filtering** - Search and filter transactions by category, date, and amount
- 🎯 **Modern UI** - Built with shadcn/ui components for a polished experience

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devByByron/centsible.git
   cd centsible
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── Layout.tsx      # Main app layout
│   ├── Navbar.tsx      # Top navigation bar
│   ├── Sidebar.tsx     # Side navigation menu
│   ├── StatCard.tsx    # Statistics display cards
│   └── TransactionModal.tsx  # Transaction form modal
├── context/            # React Context providers
│   ├── ThemeContext.tsx     # Theme management
│   └── TransactionContext.tsx  # Transaction data provider
├── data/               # Mock data and types
│   └── mockData.ts     # Sample transactions and categories
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Overview dashboard
│   ├── Transactions.tsx # Transaction list and management
│   ├── Analytics.tsx   # Data visualization
│   ├── Settings.tsx    # User preferences
│   └── NotFound.tsx    # 404 error page
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
└── App.tsx             # Main application component
```

## 🎯 Usage

### Adding Transactions
1. Click the "Add Transaction" button on the Dashboard or Transactions page
2. Fill in the transaction details (amount, category, description, date)
3. Choose between income or expense type
4. Save to see it reflected in your charts and statistics

### Filtering Transactions
- Use the search bar to find specific transactions
- Filter by category, date range, or transaction type
- Sort by amount, date, or category

### Viewing Analytics
- Navigate to the Analytics page for detailed insights
- View spending patterns by category (pie chart)
- Track income vs expenses over time (line chart)
- Monitor monthly trends (bar chart)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) for the component library
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Contact

**Byron Young & Raees Johaadien**

- GitHub: [@devByByron](https://github.com/devByByron)
- Project Link: [https://github.com/devByByron/centsible](https://github.com/devByByron/centsible)

---

⭐ **Star this repo** if you find it helpful!
