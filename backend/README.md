# TaskMaster Backend API

A robust Node.js + Express.js backend for the MERN stack To-Do List application.

## 🚀 Features

- **User Authentication**: JWT-based signup/login system
- **Task Management**: Full CRUD operations for tasks
- **Advanced Filtering**: Filter tasks by status, tags, priority, and due date
- **Data Validation**: Input validation using express-validator
- **Security**: Password hashing with bcrypt, JWT tokens
- **Database**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **CORS**: Enabled for frontend integration

## 📁 Project Structure

```
backend/
├── config/
│   └── config.env          # Environment variables
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── validation.js      # Input validation middleware
├── models/
│   ├── User.js            # User model schema
│   └── Task.js            # Task model schema
├── routes/
│   ├── auth.js            # Authentication routes
│   └── tasks.js           # Task management routes
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `config.env.example` to `config.env`
   - Update the following variables:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/taskmaster
     JWT_SECRET=your-super-secret-jwt-key
     NODE_ENV=development
     ```

4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | User registration | Public |
| POST | `/api/auth/login` | User authentication | Public |

### Task Routes (Protected)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/tasks` | Get all user tasks | Private |
| POST | `/api/tasks` | Create new task | Private |
| PUT | `/api/tasks/:id` | Update task | Private |
| DELETE | `/api/tasks/:id` | Delete task | Private |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion | Private |

### Query Parameters for GET /api/tasks

- `completed`: Filter by completion status (true/false)
- `tag`: Filter by specific tag
- `priority`: Filter by priority (low/medium/high)
- `dueDate`: Filter by specific date (YYYY-MM-DD format)

## 🔐 Authentication

All task routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Data Models

### User Schema
```javascript
{
  email: String (required, unique),
  password: String (required, min 6 chars),
  name: String (required, max 50 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Schema
```javascript
{
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  dueDate: Date (optional),
  isCompleted: Boolean (default: false),
  tags: [String] (max 20 chars each),
  priority: String (low/medium/high, default: medium),
  userId: ObjectId (ref to User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

Test the API endpoints using tools like Postman, Insomnia, or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# User signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"123456"}'

# User login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

## 🚀 Deployment

### Environment Variables for Production

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmaster
JWT_SECRET=your-super-secure-production-jwt-secret
NODE_ENV=production
```

### Deployment Platforms

- **Backend**: Render, Railway, Heroku, or DigitalOcean
- **Database**: MongoDB Atlas (recommended for production)

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm test`: Run tests (to be implemented)

### Code Style

- Use ES6+ features
- Follow Express.js best practices
- Implement proper error handling
- Use async/await for database operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.
