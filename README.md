# 🚀 TaskMaster — MERN Stack Task Management App

A production-ready, full-featured to-do list app built with the **MERN stack** (MongoDB, Express.js, React, Node.js), featuring modern UI/UX, smart task organization, and JWT-based authentication.

---

## ✨ Feature Highlights

- 🔐 **Secure Authentication** (JWT, bcrypt)
- ✅ **Full Task CRUD** with priority, tags, due dates
- 🗂️ **Advanced Filtering** by date, tags, status
- 📅 **Smart Grouping**: Today, Tomorrow, Overdue
- 🎨 **Modern Responsive UI** (Tailwind + React + TypeScript)
- ⚡ **Real-Time Updates**, inline editing, animations
- 📊 **Statistics Dashboard** for task insights
- 🌙 **PWA-Ready** (future) & mobile-first design

---

## 🛠️ Tech Stack

| Frontend            | Backend              | Database | Tooling & Libraries       |
|---------------------|----------------------|----------|----------------------------|
| React + Vite        | Node.js + Express     | MongoDB  | ESLint, Prettier, CORS     |
| TypeScript          | JWT Auth, bcryptjs    | Mongoose | express-validator, dotenv  |
| Tailwind CSS        | REST API              | MongoDB Atlas (prod) | React Router, Axios    |

---

## 📁 Project Structure

```

TaskMaster/
├── backend/                 # Express.js API
│   ├── config/              # Environment config
│   ├── middleware/          # Auth & validation
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   └── Dockerfile           # Backend Docker support
├── frontend/                # React + TypeScript App
│   ├── src/
│   │   ├── components/      # Reusable UI elements
│   │   ├── contexts/        # Auth and Task providers
│   │   ├── pages/           # Login, Signup, Dashboard
│   │   ├── services/        # Axios-based API layer
│   │   └── types/           # Global TS types
│   └── Dockerfile           # Frontend Docker support
└── docker-compose.yml       # Unified dev setup

````

---

## ⚙️ Getting Started (Local Dev)

### Prerequisites

- Node.js `v16+`
- MongoDB (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repo-url>
cd TaskMaster
````

### 2. Backend Setup

```bash
cd backend
cp config.env.example config.env
npm install
npm run dev
```

> Runs at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
echo "VITE_APP_API_URL=http://localhost:5000/api" > .env
npm run dev
```

> Runs at `http://localhost:5173`

---

## 📡 API Overview

### Authentication

| Endpoint           | Method | Description         |
| ------------------ | ------ | ------------------- |
| `/api/auth/signup` | POST   | Register user       |
| `/api/auth/login`  | POST   | Login and get token |

### Tasks (Protected)

| Endpoint                | Method | Description              |
| ----------------------- | ------ | ------------------------ |
| `/api/tasks`            | GET    | Fetch all tasks          |
| `/api/tasks`            | POST   | Create a new task        |
| `/api/tasks/:id`        | PUT    | Update a task            |
| `/api/tasks/:id`        | DELETE | Delete a task            |
| `/api/tasks/:id/toggle` | PATCH  | Toggle completion status |

### Query Parameters

* `completed=true|false`
* `priority=low|medium|high`
* `tag=tagName`
* `dueDate=YYYY-MM-DD`

---

## 🎯 App Features in Detail

### 🔐 Secure Auth System

* Password hashing with **bcrypt**
* JWT token-based login and middleware protection
* Token sent in `Authorization` header: `Bearer <token>`

### 🗂️ Smart Task Management

* Due date parsing with grouping: Today, Tomorrow, Overdue
* Tags and priorities to organize tasks
* Inline editing, completion toggle, and deletion

### 📱 Responsive & Accessible UI

* Built with **Tailwind CSS** and **ARIA** support
* Fully responsive: Desktop, Tablet, and Mobile views
* Keyboard navigation + dark mode planned

---

## 🚀 Deployment

### 🧪 Local with Docker (optional)

```bash
docker-compose up --build
```

> Ensure MongoDB is running or use MongoDB Atlas in your `.env`.

### Environment Variables

#### Backend (`backend/config.env`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmaster
JWT_SECRET=your-secure-secret
NODE_ENV=development
```

#### Frontend (`frontend/.env`):

```env
VITE_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing & QA

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

> API testing recommended via Postman or Insomnia.

---

## 🧱 Production Checklist

✅ Environment files configured
✅ Use production DB (e.g., MongoDB Atlas)
✅ Set secure JWT secret
✅ Configure CORS origin restrictions
✅ Enable HTTPS
✅ Use `.dockerignore` to reduce image size
✅ Lint, build, and test before deploy

---

## 🔮 Roadmap

| Feature            | Status     |
| ------------------ | ---------- |
| Recurring Tasks    | 🔜 Planned |
| Subtasks           | 🔜 Planned |
| Push Notifications | 🔜 Planned |
| PWA / Offline Mode | 🔜 Planned |
| Mobile App         | 🔜 Planned |

---

## 📊 Project Status

| Module     | Status     |
| ---------- | ---------- |
| Backend    | ✅ Complete |
| Frontend   | ✅ Complete |
| Testing    | 🟡 Partial |
| Deployment | 🟢 Ready   |

---

**Built with ❤️ using the MERN stack**
*Organize your life. One task at a time.*
