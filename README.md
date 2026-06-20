# Habit Tracking Pro

A comprehensive habit tracking application designed to help users build and maintain positive habits through goal setting, progress monitoring, and analytics. Built as a NAB Wecamp Capstone project.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Known Limitations](#known-limitations)
- [Technology Stack](#technology-stack)
- [Scripts](#scripts)
- [Contributing](#contributing)

## 🎯 Overview

Habit Tracking Pro is a modern, user-friendly application that empowers users to establish and maintain positive habits. The application provides an intuitive interface for creating habits, setting goals, tracking progress, and visualizing achievements through comprehensive analytics. With support for multiple languages and theme customization, it's designed to be accessible and engaging for all users.

## ✨ Features

### Habit Management
- **Create & Manage Habits**: Add new habits with customizable settings and categories
- **Habit Categories**: Organize habits into categories for better organization and filtering
- **Habit Schedules**: Define frequency and scheduling patterns for each habit
- **Real-time Progress Tracking**: Monitor habit completion in real-time

### Goal Setting & Tracking
- **Set Personal Goals**: Create goals and link them to specific habits
- **Progress Visualization**: Track progress with visual indicators and charts
- **Goal Analytics**: Comprehensive analytics for goal achievement and habit consistency

### Check-ins & Tracking
- **Daily Check-ins**: Log daily habit completions
- **Historical Data**: Review check-in history and track trends over time
- **Streak Tracking**: Maintain and monitor habit streaks

### Internationalization
- **Multi-language Support**: Built-in i18n support for multiple languages

### User Experience
- **Dark/Light Theme**: Toggle between dark and light themes with persistent preferences
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile devices
- **Toast Notifications**: Real-time feedback through toast notifications (powered by Sonner)
- **Accessible UI**: Built with Radix UI components for enhanced accessibility

### Analytics & Insights
- **Performance Charts**: Visual representation of habit data using ReCharts
- **Completion Statistics**: Track completion rates and metrics
- **Data Seeding**: Pre-populated data for demonstration purposes
- **Data Export**: Export habit data to JSON format

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/elin-le/Habit-Tracking-Pro.git
   cd Habit-Tracking-Pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

6. **Run linting**
   ```bash
   npm run lint
   ```

## 📁 Project Structure

```
Habit-Tracking-Pro/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, icons, and media files
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context providers
│   │   ├── ThemeContext.tsx          # Theme management (dark/light mode)
│   │   └── ReadOnlyContext.tsx       # Read-only mode context
│   ├── data/               # Data models and types
│   ├── features/           # Feature-specific modules
│   │   ├── habits/         # Habit management feature
│   │   ├── goals/          # Goal setting and tracking
│   │   ├── checkins/       # Check-in functionality
│   │   ├── analytics/      # Analytics and reporting
│   │   ├── auth/           # Authentication service
│   │   ├── dashboard/      # Dashboard feature
│   │   └── notifications/  # Notification management with localStorage persistence
│   ├── i18n/              # Internationalization configuration
│   │   └── locales/       # Language files
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── routes/            # Router configuration
│   │   └── index.ts       # Route definitions
│   ├── shared/            # Shared utilities and helpers
│   │   ├── hooks/         # Custom React hooks (useHabit, useCheckIns, useCategory, etc.)
│   │   ├── utils/         # Utility functions
│   │   │   ├── seedData.ts       # Data seeding for initial setup
│   │   │   ├── exportJson.ts     # Data export functionality
│   │   │   └── constants/        # Application constants and storage keys
│   │   └── types/         # TypeScript type definitions
│   ├── App.tsx            # Root component
│   ├── App.css            # Global app styles
│   ├── global.css         # Global styles
│   ├── index.css          # Index styles with Tailwind directives
│   └── main.tsx           # Application entry point
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
├── components.json        # shadcn/ui components config
└── eslint.config.js       # ESLint configuration
```

## 🗂️ State Management

The application uses a combination of **localStorage for persistence**, **React Context API**, and **custom hooks** for state management:

### Data Persistence with localStorage

All user data is persisted in the browser's localStorage with the following keys:

| Storage Key | Purpose |
|-------------|---------|
| `USER_HABITS` | Stored habits and their configurations |
| `USER_CHECKINS` | Daily check-in records and habit completions |
| `USER_HABIT_SCHEDULES` | Habit scheduling information |
| `CATEGORYS` | Habit categories |
| `USER_GOALS` | User goals linked to habits |
| `USERS` | User account information |
| `CURRENT_USER` | Currently logged-in user |

**Data Persistence**: All data is automatically saved to localStorage and will persist across browser sessions, page refreshes, and application restarts.

### Custom Hooks for Data Management

- **`useHabit(userId)`** - Manage habits (create, read, update, delete)
- **`useCheckIns(userId)`** - Manage daily check-ins
- **`useCategory()`** - Manage habit categories
- **`useHabitSchedule(userId)`** - Manage habit schedules

Each hook handles:
- Reading data from localStorage
- Writing updates back to localStorage
- Error handling and fallbacks
- Type-safe data operations

### Context Providers

1. **ThemeContext**
   - Manages application theme (dark/light mode)
   - Persists user theme preference
   - Provides theme toggle functionality

2. **NotificationContext**
   - Centralized notification management
   - Handles toast notifications and alerts
   - Persists notifications to localStorage
   - Integrates with Sonner for UI notifications

3. **ReadOnlyContext**
   - Manages read-only/demo mode state
   - Prevents data modifications in certain views or modes
   - Useful for demonstration or preview features

### State Hierarchy

```
Root
├── ThemeProvider (theme persistence via next-themes)
│   ├── ThemeState (theme, toggleTheme)
│   └── NotificationProvider
│       ├── NotificationState (notifications, handlers, localStorage sync)
│       └── ReadOnlyProvider
│           ├── ReadOnlyState (isReadOnly, toggleReadOnly)
│           └── RouterProvider
│               └── Application Routes
│                   └── Component Trees (using custom hooks for localStorage access)
```

### Seeding Strategy

On first application load, the following seeding functions initialize the localStorage with demo data:

```typescript
seedData()              // Creates default user accounts
seedHabits()           // Creates sample habits
seedHabitSchedules()   // Creates habit schedules
seedCategories()       // Creates habit categories
seedGoals()            // Creates sample goals
seedCheckins()         // Creates historical check-in data
```

Each seeding function checks if data already exists before creating to avoid overwrites.

## ⚠️ Known Limitations

### Data Management
- **Browser Storage Only**: Application data is stored in browser localStorage (typically 5-10 MB limit per domain). Large amounts of historical data may eventually exceed this limit
- **No Cloud Sync**: No cloud backup or synchronization; data is device-specific and not synced across devices
- **No Multi-device Support**: Different devices maintain separate habit tracking data

### Features
- **No User Authentication System**: Currently uses local user accounts stored in localStorage; no proper authentication or security
- **Limited Analytics**: Analytics are calculated in real-time from local data; complex historical analysis may be slow with large datasets
- **No Reminder System**: Application doesn't send push notifications or reminders outside of the app
- **No Social Features**: Limited community/sharing features between users on the same device

### Performance
- **No Pagination**: Long lists of habits, goals, or check-ins are not paginated; performance may degrade with thousands of records
- **In-memory Calculations**: All statistics and analytics are computed on-the-fly; historical analysis can be slow

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.2.6** - UI library with latest features
- **TypeScript 6.0.2** - Type safety and developer experience
- **React Router 7.17.0** - Client-side routing and navigation

### Build & Development
- **Vite 8.0.12** - Lightning-fast build tool and dev server
- **TailwindCSS 4.3.1** - Utility-first CSS framework
- **PostCSS** - CSS transformation and plugins

### UI Components & Styling
- **shadcn/ui** - High-quality React component library
- **Radix UI** - Accessible primitive components
  - Alert Dialog, Popover, Switch, Slot components
- **Lucide React 1.18.0** - Icon library with 1000+ icons
- **CVA (Class Variance Authority)** - Component variant management
- **tailwind-merge** - Efficient Tailwind CSS class merging

### Charts & Visualization
- **ReCharts 3.8.1** - React charting library for analytics

### Data & Persistence
- **localStorage API** - Browser-based data persistence
- **JSON serialization** - Data format for storage

### Internationalization
- **i18next 26.3.1** - Comprehensive i18n framework
- **react-i18next 17.0.8** - React integration for i18n
- **i18next-browser-languagedetector 8.2.1** - Automatic language detection

### Theming
- **next-themes 0.4.6** - Theme management with system preference detection

### Notifications
- **Sonner 2.0.7** - Beautiful toast notification library

### Code Quality
- **ESLint 10.3.0** - JavaScript/TypeScript linting
- **typescript-eslint 8.59.2** - TypeScript-specific lint rules

## 📜 Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Compile TypeScript and create optimized production bundle
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint to check code quality and style issues
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Ensure TypeScript types are properly defined
2. Follow the existing code structure and naming conventions
3. Run `npm run lint` before committing
4. Add meaningful commit messages
5. Test your changes with `npm run dev`
6. Verify data persistence in localStorage when modifying state

### Testing Your Changes
- Test habit CRUD operations and localStorage persistence
- Verify theme switching and persistence across page reloads
- Check notifications are properly saved and displayed
- Test multi-language support with i18n

## 📝 License

This project is part of the NAB Wecamp Capstone program.

## 👨‍💻 Authors

---

**Last Updated**: June 2026

