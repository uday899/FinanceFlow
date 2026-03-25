# FinanceFlow 💰

FinanceFlow is a modern, responsive personal finance tracking application that helps you manage your income and expenses, view weekly financial reports, and maintain a clear overview of your financial health. 

## 🚀 Features

- **Dashboard Overview**: Get a quick glance at your total income, total expenses, and net balance.
- **Add Transactions**: Easily record new income and expenses with descriptions and dates.
- **Weekly Reports**: Visualize your spending habits with interactive charts over the past week.
- **Transaction History**: View a detailed list of all your recent transactions.
- **Modern UI**: A sleek, user-friendly interface built with React and styled with modern Tailwind CSS.
- **Currency Support**: Fully formatted for Indian Rupees (₹).

## 🛠️ Technology Stack

**Frontend:**
- [React](https://reactjs.org/) (v19) - UI Library
- [Vite](https://vitejs.dev/) - Frontend Tooling/Bundler
- [Tailwind CSS](https://tailwindcss.com/) (v4) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Charting library for the weekly reports
- [Axios](https://axios-http.com/) - HTTP client for API requests

**Backend:**
- [Python 3](https://www.python.org/) - Programming language
- [FastAPI](https://fastapi.tiangolo.com/) - Web framework for building APIs
- [SQLAlchemy](https://www.sqlalchemy.org/) - SQL toolkit and Object-Relational Mapper (ORM)
- [Uvicorn](https://www.uvicorn.org/) - ASGI web server implementation for Python
- SQLite - Lightweight database

## 📁 Project Structure

```text
finance-report/
├── backend/                # FastAPI backend API
│   ├── database.py         # SQLAlchemy DB configuration
│   ├── main.py             # FastAPI entry point
│   ├── models.py           # Database models
│   ├── routes.py           # API endpoints
│   ├── schemas.py          # Pydantic validation schemas
│   └── requirements.txt    # Python dependencies
└── frontend/               # React frontend application
    ├── src/                # React source code (components, etc.)
    ├── index.html          # HTML template
    ├── package.json        # Node.js dependencies
    └── tailwind.config.js  # Tailwind styling configurations
```

## ⚙️ Getting Started

### Prerequisites

You need the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/downloads/) (v3.9 or higher)

### 1. Backend Setup

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **Windows:** 
     ```bash
     .\venv\Scripts\activate
     ```
   - **Mac/Linux:** 
     ```bash
     source venv/bin/activate
     ```
4. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the backend ASGI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The API will be running at `http://localhost:8000`.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The web application will be running at `http://localhost:5173`.*

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request if you want to improve the application.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
