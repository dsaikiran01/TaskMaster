# 🚀 TaskMaster - MERN Stack To-Do List Application

A comprehensive, production-ready task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure password hashing
- **Protected routes** and middleware
- **Input validation** and sanitization
- **CORS enabled** for cross-origin requests

### 📋 Task Management
- **Full CRUD operations** for tasks
- **Priority levels** (Low, Medium, High)
- **Due date management** with overdue detection
- **Custom tags** for task categorization
- **Completion tracking** with visual indicators

### 🎨 Modern UI/UX
- **Responsive design** with mobile-first approach
- **Tailwind CSS** for beautiful, consistent styling
- **TypeScript** for type safety and better development experience
- **Real-time updates** and smooth animations
- **Intuitive navigation** with collapsible sidebar

### 🔍 Advanced Features
- **Smart filtering** by status, priority, tags, and due dates
- **Task grouping** by date (Today, Tomorrow, Overdue)
- **Statistics dashboard** with task overview
- **Inline editing** for quick task updates
- **Search and organization** tools

## 🛠️ Tech Stack

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| React 18 | Node.js | MongoDB | Git |
| TypeScript | Express.js | Mongoose | npm/yarn |
| Tailwind CSS | JWT | bcryptjs | ESLint |
| React Router | CORS | express-validator | Prettier |

## 📁 Project Structure

```
TaskMaster/
├── backend/                 # Node.js + Express API
│   ├── config/             # Environment configuration
│   ├── middleware/         # Auth & validation middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React + TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── types/          # TypeScript definitions
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TaskMaster
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp config.env.example config.env
# Edit config.env with your settings

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication

### Tasks (Protected)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle completion

### Query Parameters
- `completed` - Filter by completion status
- `priority` - Filter by priority level
- `tag` - Filter by specific tag
- `dueDate` - Filter by due date

## 🎯 Key Features Explained

### 🔐 Authentication System
- Secure JWT token generation and validation
- Password hashing with bcryptjs
- Automatic token refresh and logout
- Protected route middleware

### 📊 Task Organization
- **Smart Grouping**: Tasks automatically grouped by due date
- **Priority System**: Visual priority indicators with color coding
- **Tag Management**: Flexible tagging system for organization
- **Overdue Detection**: Automatic overdue task identification

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on all devices
- **Real-time Updates**: Instant feedback for all actions
- **Intuitive Interface**: Clean, modern design following UX best practices
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Deployment

### Backend Deployment
- **Platforms**: Render, Railway, Heroku, DigitalOcean
- **Database**: MongoDB Atlas (recommended)
- **Environment Variables**: Set production values

### Frontend Deployment
- **Platforms**: Vercel, Netlify, AWS S3
- **Build Command**: `npm run build`
- **Environment**: Set `REACT_APP_API_URL` to production API

### Production Checklist
- [ ] Update environment variables
- [ ] Set secure JWT secret
- [ ] Enable HTTPS
- [ ] Configure CORS origins
- [ ] Set up monitoring and logging

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing
Use tools like Postman or Insomnia to test endpoints:
- Import the provided Postman collection
- Set up environment variables
- Test authentication flow
- Verify CRUD operations

## 🔧 Development

### Code Quality
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking
- **Git Hooks**: Pre-commit validation

### Development Workflow
1. Create feature branch
2. Implement changes
3. Write tests
4. Submit pull request
5. Code review
6. Merge to main

## 📱 Mobile Experience

- **Touch Optimized**: Large touch targets and gestures
- **Responsive Layout**: Adapts to all screen sizes
- **Offline Ready**: Service worker for offline functionality (future)
- **PWA Support**: Installable app experience (future)

## 🔮 Future Roadmap

### Phase 2 Features
- [ ] **Recurring Tasks**: Set up repeating task schedules
- [ ] **Subtasks**: Break down complex tasks
- [ ] **Collaboration**: Team task sharing and management
- [ ] **Notifications**: Email and push notifications

### Phase 3 Features
- [ ] **Dark Mode**: Theme switching capability
- [ ] **Advanced Analytics**: Task performance insights
- [ ] **Integration**: Calendar and email integration
- [ ] **Mobile App**: Native mobile applications

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check the README files in each directory
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

### Common Issues
- **MongoDB Connection**: Ensure MongoDB is running and accessible
- **Port Conflicts**: Check if ports 3000 and 5000 are available
- **Environment Variables**: Verify all required variables are set

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **MongoDB**: For the flexible NoSQL database
- **Express.js**: For the minimal web framework

## 📊 Project Status

- **Backend**: ✅ Complete
- **Frontend**: ✅ Complete
- **Documentation**: ✅ Complete
- **Testing**: 🟡 In Progress
- **Deployment**: 🟡 Ready for deployment

---

**Built with ❤️ using the MERN stack**

*Start organizing your life, one task at a time!*
