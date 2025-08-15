# TaskMaster Frontend

A modern, responsive React TypeScript frontend for the MERN stack To-Do List application.

## 🚀 Features

- **Modern UI/UX**: Clean, minimal design with Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Type Safety**: Full TypeScript implementation
- **State Management**: Context API for global state management
- **Real-time Updates**: Live task updates and filtering
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Icons**: Heroicons (via SVG)

## 📁 Project Structure

```
frontend/src/
├── components/           # Reusable UI components
│   ├── LoadingSpinner.tsx
│   ├── NavigationBar.tsx
│   ├── FilterSidebar.tsx
│   ├── TaskList.tsx
│   ├── TaskCard.tsx
│   └── TaskForm.tsx
├── contexts/            # React Context providers
│   ├── AuthContext.tsx
│   └── TaskContext.tsx
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── Dashboard.tsx
├── services/            # API service layer
│   └── api.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main app component
└── index.tsx            # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 🎨 UI Components

### Authentication Pages
- **LoginPage**: User authentication with email/password
- **SignupPage**: User registration with validation

### Dashboard
- **NavigationBar**: Top navigation with user info and logout
- **FilterSidebar**: Task filtering and statistics
- **TaskList**: Organized task display grouped by date
- **TaskCard**: Individual task display with inline editing
- **TaskForm**: Modal for creating/editing tasks

### Common Components
- **LoadingSpinner**: Loading states throughout the app

## 🔐 Authentication Flow

1. **Login/Signup**: Users authenticate via email/password
2. **JWT Storage**: Tokens stored in localStorage
3. **Protected Routes**: Dashboard access requires valid token
4. **Auto-logout**: Expired tokens trigger automatic logout

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for tablet and desktop
- **Touch Friendly**: Optimized touch targets and gestures
- **Collapsible Sidebar**: Mobile-friendly navigation

## 🎯 Task Management Features

### Task Creation
- Title (required)
- Description (optional)
- Due date and time
- Priority levels (low/medium/high)
- Custom tags

### Task Organization
- Grouped by due date (Today, Tomorrow, Overdue, etc.)
- Priority-based color coding
- Tag-based categorization
- Completion status tracking

### Task Actions
- Mark complete/incomplete
- Edit task details
- Delete tasks
- Filter and search

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades for main actions
- **Success**: Green for completed tasks
- **Warning**: Yellow for pending tasks
- **Danger**: Red for overdue tasks and errors

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Clear heading and body text structure

### Spacing
- **Consistent**: 4px base unit system
- **Responsive**: Adaptive spacing for different screen sizes

## 🔧 Development

### Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Functional Components**: Modern React patterns with hooks

### State Management

- **Context API**: Global state for auth and tasks
- **Local State**: Component-level state management
- **Async Operations**: Proper error handling and loading states

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: User workflow testing (to be implemented)

### Running Tests

```bash
npm test
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Platforms

- **Vercel**: Recommended for React apps
- **Netlify**: Alternative deployment option
- **AWS S3**: Static hosting with CloudFront

### Environment Variables

```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Client-side form validation
- **XSS Protection**: React's built-in XSS protection
- **HTTPS Only**: Secure communication in production

## 📱 PWA Features (Future)

- **Service Worker**: Offline functionality
- **App Manifest**: Installable app experience
- **Push Notifications**: Task reminders
- **Background Sync**: Offline task creation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue in the repository
- Review the backend API documentation

## 🔄 Updates and Maintenance

- **Regular Updates**: Keep dependencies up to date
- **Security Patches**: Monitor for security vulnerabilities
- **Performance**: Regular performance audits
- **Accessibility**: Continuous accessibility improvements
