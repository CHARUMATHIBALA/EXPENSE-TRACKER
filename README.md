# Expense Tracker - MERN Stack Application

A fully-featured, production-ready expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a modern fintech UI with dark navy theme, comprehensive expense management, and advanced analytics.

## 🚀 Features

### Authentication
- User registration and login with JWT
- Password hashing with bcrypt
- Protected routes and middleware
- Session management with localStorage

### Expense Management
- Add, edit, and delete expenses
- Income and expense tracking
- Category-based organization
- Date-based filtering and search
- Real-time updates

### Analytics & Reports
- Interactive charts with Chart.js
- Category-wise expense breakdown
- Monthly trend analysis
- CSV export functionality
- Comprehensive statistics

### User Interface
- Modern dark navy fintech theme
- Responsive design for all devices
- Smooth animations and transitions
- Professional typography
- Intuitive navigation with sidebar

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Lucide React** - Icons
- **CSS3** - Styling

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   └── expenseController.js   # Expense management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Expense.js            # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── expenseRoutes.js      # Expense endpoints
│   ├── server.js                 # Main server file
│   └── .env.example             # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Sidebar.jsx       # Sidebar navigation
│   │   │   ├── ExpenseCard.jsx   # Expense display card
│   │   │   ├── ChartComponent.jsx # Chart wrapper
│   │   │   └── Loader.jsx        # Loading component
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication state
│   │   │   └── ThemeContext.jsx  # Theme management
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── AddExpense.jsx    # Add expense form
│   │   │   ├── Expenses.jsx      # Expense list
│   │   │   ├── Reports.jsx       # Analytics page
│   │   │   └── Settings.jsx      # User settings
│   │   ├── services/
│   │   │   ├── api.js            # Axios configuration
│   │   │   └── expenseService.js  # Expense API calls
│   │   ├── styles/
│   │   │   └── global.css        # Global styles
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # App entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/:id` - Get single expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics

## 🎨 Design System

### Color Palette
- **Primary Navy**: #0f172a
- **Secondary Navy**: #1e293b
- **Blue Primary**: #1e3a8a
- **Blue Secondary**: #2563eb
- **Blue Light**: #3b82f6
- **Cyan**: #06b6d4
- **Emerald**: #10b981

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Cards with rounded corners and subtle shadows
- Gradient backgrounds for buttons and accents
- Smooth hover animations
- Responsive grid layouts

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

## 📱 Features in Detail

### Dashboard
- Overview cards showing total income, expenses, balance
- Recent transactions list
- Interactive charts (pie chart for categories, line chart for trends)
- Quick action buttons

### Expense Management
- Comprehensive expense form with validation
- Category-based organization
- Date picker for transaction dates
- Search and filter functionality
- Bulk operations support

### Reports & Analytics
- Multiple chart types (pie, bar, line)
- Date range filtering
- Category-wise breakdown
- Export to CSV functionality
- Statistical summaries

### User Settings
- Profile management
- Theme toggle (dark/light mode)
- Data export options
- Account management

## 🚀 Deployment

### Production Build

1. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Configure production environment**
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   ```

3. **Start production server**
   ```bash
   cd backend
   npm start
   ```

### Docker Deployment (Optional)
```dockerfile
# Dockerfile example for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem
4. Provide environment details (OS, Node.js version, etc.)

## 🔄 Updates & Roadmap

### Planned Features
- [ ] Mobile app version
- [ ] Multi-currency support
- [ ] Budget tracking
- [ ] Recurring expenses
- [ ] Advanced reporting
- [ ] Data synchronization
- [ ] Team collaboration
- [ ] Bank integration

### Recent Updates
- Added JWT authentication
- Implemented Chart.js integration
- Enhanced responsive design
- Added CSV export functionality
- Improved error handling
- Added loading states
- Enhanced security measures

---

**Built with ❤️ using modern web technologies**
