# Human Firewall - Full-Stack Cybersecurity Awareness Platform

A modern, full-stack web application dedicated to educating users about AI-generated threats including deepfakes, voice cloning, and AI-powered phishing attacks.

## 🛡️ Features

- **Interactive Quiz System**: Test your ability to detect AI-generated threats
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Progress Tracking**: Monitor quiz scores, achievements, and learning progress
- **Threat Intelligence**: Real-time security alerts and educational resources
- **Newsletter System**: Weekly threat intelligence updates
- **Admin Panel**: Content management for resources and quiz questions
- **Responsive Design**: Cyber-tech dark mode aesthetic with glassmorphism effects

## 🚀 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express middleware (helmet, cors, rate-limiting)

### Frontend
- React 18 with TypeScript
- Vite build tool
- React Router for navigation
- React Query for data fetching
- Axios for HTTP requests
- Framer Motion for animations

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository
```bash
cd "d:\\Puppi_Bhai\\Vhyuastra 2.0"
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/human-firewall
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

## 🏃 Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### Start Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

### Start Frontend
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Vhyuastra 2.0/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Quiz.js
│   │   │   ├── Resource.js
│   │   │   └── Newsletter.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── quizController.js
│   │   │   ├── resourceController.js
│   │   │   └── newsletterController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── quiz.js
│   │   │   ├── resources.js
│   │   │   ├── newsletter.js
│   │   │   └── user.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ThreatMatrix.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── QuizPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── ResourceDetailPage.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── quizService.ts
│   │   │   ├── resourceService.ts
│   │   │   └── newsletterService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)

### Quiz
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/random` - Get random quizzes
- `GET /api/quiz/:id` - Get single quiz
- `POST /api/quiz/:id/submit` - Submit answer (protected)
- `POST /api/quiz` - Create quiz (admin only)

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get single resource
- `GET /api/resources/search` - Search resources
- `POST /api/resources/:id/like` - Like resource

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe/:token` - Unsubscribe

### User
- `GET /api/user/dashboard` - Get dashboard data (protected)
- `POST /api/user/bookmark/:resourceId` - Bookmark resource (protected)

## 🎨 Design Features

- **Cyber-Tech Theme**: Dark mode with neon blue (#00D9FF) and purple (#7B68EE) accents
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Parallax scrolling, fade-ins, and micro-interactions
- **Responsive**: Mobile-first design that works on all devices
- **Accessibility**: Keyboard navigation and ARIA labels

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies support
- Rate limiting on API endpoints
- Helmet.js security headers
- CORS configuration
- Input validation and sanitization

## 📝 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact the development team.
