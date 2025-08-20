# TaskMaster Frontend

A modern, responsive React TypeScript frontend for the TaskMaster MERN stack application, built with Vite.

## 🚀 Features

- **Modern UI/UX**: Sleek, minimal design powered by Tailwind CSS
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Type Safety**: Full TypeScript support
- **Token-based Auth**: JWT handled without localStorage user data
- **Live Task Syncing**: Immediate UI updates on task changes
- **Filter System**: Dropdown filters by status, priority, due date
- **Date/Time Picker**: Separated and formatted inputs
- **Task Grouping**: Tasks grouped by date (Today, Tomorrow, Overdue)
- **Context API**: Auth and Task global state management
- **Accessibility**: ARIA attributes and keyboard support

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Icons**: Heroicons (SVG)

---

## 📁 Project Structure

```

frontend/src/
├── components/
│   ├── FilterSidebar.tsx       # Filters (dropdowns, stats)
│   ├── LoadingSpinner.tsx
│   ├── NavigationBar.tsx
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx            # With date & time picker
│   └── TaskList.tsx
├── contexts/
│   ├── AuthContext.tsx         # Token-based login state
│   └── TaskContext.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
├── services/
│   └── api.ts                  # Axios instance with auth header
├── types/
│   └── index.ts                # TypeScript types/interfaces
├── App.tsx
└── main.tsx

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Backend API (see TaskMaster backend)

### Installation

```bash
cd frontend
npm install
````

### .env Setup

```env
VITE_APP_API_URL=http://localhost:5000/api
```

### Start Dev Server

```bash
npm run dev
```

Access: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication Flow

* **Login/Signup**: Uses email and password
* **JWT Handling**: Token stored only in memory (`AuthContext`)
* **Authorization**: Sent in `Authorization: Bearer <token>` headers
* **Session Persistence**: Token restored on refresh (if available)
* **No localStorage user data**

---

## 🎯 Task Management

### Create Task

* Title (required)
* Description (optional)
* Due Date (DD-MM-YYYY) & Time (HH\:MM)
* Priority (low, medium, high)
* Tags (add/remove dynamically)

### Actions

* Add / Edit / Delete tasks
* Mark as complete/incomplete
* View grouped by date (Today, Tomorrow, Overdue)
* Real-time UI updates
* Tag management with autocomplete

---

## 🧭 Filtering & Sidebar

* **Dropdowns**:

  * Status: All, Completed, Pending
  * Priority: All, High, Medium, Low
  * Due Date: All, Today, Tomorrow
* **Task Statistics**:

  * Total, Pending, Completed, Overdue
* **Clear Filters** button

---

## 🎨 UI/UX

### Design System

* **Color Coding**:

  * Blue: Neutral/primary
  * Green: Completed
  * Yellow: Pending
  * Red: Overdue/Error
* **Typography**: Inter font (300–700)
* **Spacing**: Tailwind’s 4px grid system
* **Accessibility**: ARIA support + keyboard friendly

---

## ⚙️ Development Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production
npm run lint      # Run ESLint
```

---

## 🔧 Developer Notes

* Functional components & hooks only
* Strict TypeScript enforcement
* React Context manages:

  * Auth token & session
  * Task data + filters
* Axios auto-includes token in headers
* Task list updates on create/complete/delete automatically

---

## 🧪 Testing (Setup Required)

> (Add Jest or Vitest as needed)

```bash
npm test
```

Test Types (Planned):

* Unit tests (components)
* Integration tests (API + UI)
* E2E (Cypress or Playwright)

---

## 🌐 Deployment

```bash
npm run build
```

Deploy to:

* **Vercel**
* **Netlify**
* **AWS S3 + CloudFront**
* **Static servers (e.g., Nginx)**

### Production Env Example

```env
VITE_APP_API_URL=https://api.taskmaster.com/api
```

---

## 🚧 Planned Improvements

* PWA support: Offline tasks, push reminders
* Task reminders/notifications
* Search & filter by tag
* Light/Dark mode toggle

