# Vhyuastra 2.0 - Human Firewall Client

A cutting-edge, cyber-tech themed security awareness and training platform designed to empower users against digital threats.

## 🚀 Overview

**Vhyuastra 2.0** (Human Firewall) is a comprehensive React-based frontend application that provides interactive cybersecurity training, threat analysis, and resource management. Built with a modern "Cyber-Tech" aesthetic, it features a glassmorphism UI, dynamic animations, and a responsive design.

## ✨ Key Features

- **Interactive Dashboard**: Real-time overview of security status and training progress.
- **Threat Intelligence**: dedicated "Threat Matrix" and analysis tools for identifying potential risks.
- **Security Training**: Interactive quizzes and modules to test and improve cybersecurity knowledge.
- **Resource Center**: Library of security articles, guides, and best practices.
- **User Profiles**: Personalized tracking of achievements, scores, and activity.
- **Authentication**: Secure Login and Registration flows.
- **Cyber-Tech UI**: Custom-designed dark mode interface with neon accents and smooth animations.

## 🛠 Technology Stack

- **Frontend Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: Custom CSS with CSS Variables (Cyber-Tech Theme)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Vhyuastra 2.0/client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will launch at `http://localhost:5173` (or the port specified by Vite).

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```bash
src/
├── components/   # Reusable UI components (Hero, Navbar, CyberBackground, etc.)
├── pages/        # Application pages (Home, Dashboard, Quiz, Profile, etc.)
├── services/     # API services and data fetching logic
├── store/        # Global state management (Zustand stores)
├── types/        # TypeScript type definitions
├── main.tsx      # Application entry point
├── App.tsx       # Main router and layout structure
└── index.css     # Global styles and theme variables
```

## 🎨 Theme Customization

The application uses a set of CSS variables defined in `src/index.css` for easy theming. Key colors include:

- Primary: `#00D9FF` (Cyan)
- Secondary: `#7B68EE` (Purple)
- Accent: `#FF006E` (Pink)
- Background: `#0A0E27` (Deep Dark Blue)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.