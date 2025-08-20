# TaskMaster Backend API

A robust Node.js + Express.js backend for the TaskMaster MERN stack application.

---

## 🚀 Features

- **User Authentication**: JWT-based signup/login system
- **Task Management**: Full CRUD operations for tasks
- **Advanced Filtering**: Filter tasks by status, tags, priority, and due date
- **Data Validation**: Input validation using `express-validator`
- **Security**: Password hashing with `bcrypt`, JWT tokens
- **Environment Config**: `.env.local` and `.env.production` supported
- **Database**: MongoDB with Mongoose ODM

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **CORS**: Enabled for frontend integration

---

## 📁 Project Structure

```

backend/
├── config/
│   └── env.js               # Loads .env.local or .env.production
├── middleware/
│   ├── auth.js              # JWT auth middleware
│   └── validation.js        # Input validation middleware
├── models/
│   ├── User.js              # User schema
│   └── Task.js              # Task schema
├── routes/
│   ├── auth.js              # Authentication routes
│   └── tasks.js             # Task routes
├── server.js                # Main entry point
├── Dockerfile               # (Optional) Docker support
├── package.json
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to backend directory**
  
  ```bash
   cd backend
  ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   * Create `.env.local` for local development:

     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/taskmaster
     JWT_SECRET=your-secret-key
     NODE_ENV=development
     ```

   * For production, create `.env.production`:

     ```env
     PORT=5000
     MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/taskmaster
     JWT_SECRET=your-production-secret
     NODE_ENV=production
     ```

4. **Start the server**

   ```bash
   # Development mode (auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

---

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint           | Description       | Access |
| ------ | ------------------ | ----------------- | ------ |
| POST   | `/api/auth/signup` | Register new user | Public |
| POST   | `/api/auth/login`  | User login        | Public |

### Task Routes (Protected by JWT)

| Method | Endpoint                | Description       | Access  |
| ------ | ----------------------- | ----------------- | ------- |
| GET    | `/api/tasks`            | Get all tasks     | Private |
| POST   | `/api/tasks`            | Create task       | Private |
| PUT    | `/api/tasks/:id`        | Update task       | Private |
| DELETE | `/api/tasks/:id`        | Delete task       | Private |
| PATCH  | `/api/tasks/:id/toggle` | Toggle completion | Private |

#### Query Parameters (GET /api/tasks)

* `completed`: `true` or `false`
* `tag`: filter by tag
* `priority`: `low`, `medium`, `high`
* `dueDate`: specific date in `YYYY-MM-DD` format

---

## 🔐 Authentication

All task routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your-token>
```

---

## 📊 Data Models

### User

```js
{
  email: String,        // required, unique
  password: String,     // hashed, min 6 chars
  name: String,         // required
  createdAt: Date,
  updatedAt: Date
}
```

### Task

```js
{
  title: String,        // required, max 100
  description: String,  // optional, max 500
  dueDate: Date,
  isCompleted: Boolean, // default: false
  tags: [String],       // max length per tag: 20
  priority: String,     // low | medium | high
  userId: ObjectId,     // reference to User
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

You can test endpoints using Postman, Insomnia, or curl:

```bash
# Health check (if implemented)
curl http://localhost:5000/

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"123456"}'
```

---

## 🐳 Docker (Optional)

### Dockerfile (included)

Build and run the container:

```bash
# Build the image
docker build -t taskmaster-backend .

# Run the container
docker run -p 5000:5000 --env-file .env.production taskmaster-backend
```

---

## 🔧 Development Tools

### Scripts

* `npm run dev` — Start with nodemon
* `npm start` — Start in production
* `npm test` — Placeholder for tests

### Code Guidelines

* Use async/await
* Avoid callback hell
* Follow REST principles
* Handle all errors with middleware

---

## 🌐 Deployment

### Environment Variables for Production

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/taskmaster
JWT_SECRET=your-production-secret
NODE_ENV=production
```

### Hosting Recommendations

* **Backend**: Render, Railway, Heroku, DigitalOcean
* **Database**: MongoDB Atlas
