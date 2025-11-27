# Vehicle Rental Frontend - Premium React Application

A stunning, modern React + Vite frontend for the Vehicle Rental Management System, featuring glassmorphism design, smooth animations, and professional UX.

## ✨ Features

- 🎨 **Premium Design** - Glassmorphism effects, gradients, and modern aesthetics
- ⚡ **Lightning Fast** - Vite for instant HMR and optimized builds
- 🔐 **Complete Auth** - Login, Register, OTP Verification
- 📱 **Fully Responsive** - Mobile-first design
- 🌓 **Dark Mode Ready** - Built-in dark mode support
- 🎭 **Smooth Animations** - Framer Motion for delightful interactions
- 📦 **Type-Safe** - TypeScript throughout
- 🎯 **State Management** - Zustand for lightweight, fast state
- 🔄 **API Integration** - Axios with auto token refresh
- 🎪 **Beautiful Components** - Custom UI library with variants

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Navigate to frontend directory**:
```bash
cd c:\src\Vehicle-Renting-Management-System\vehicle-rental-frontend
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Configure environment**:
```bash
# .env file is already created - update if needed
VITE_API_URL=http://localhost:5000/api
```

4. **Start development server**:
```bash
pnpm dev
```

5. **Open browser**:
```
http://localhost:3000
```

## 📁 Project Structure

```
src/
├── api/                  # API clients & services
│   ├── axios.ts         # Axios instance with interceptors
│   └── auth.api.ts      # Authentication API calls
├── components/          # Reusable components
│   └── ui/             # Base UI components
│       ├── Button.tsx  # Premium button variants
│       ├── Input.tsx   # Input with icons & validation
│       └── Card.tsx    # Glassmorphism cards
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   └── Auth/           # Authentication pages
│       ├── Login.tsx
│       ├── Register.tsx
│       └── VerifyEmail.tsx
├── store/              # Zustand stores
│   └── authStore.ts    # Authentication state
├── types/              # TypeScript types
│   └── index.ts        # API types & interfaces
├── utils/              # Utility functions
│   └── helpers.ts      # Common helpers
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Colors

```typescript
// Primary (Blue)
primary-500: #0ea5e9
primary-600: #0284c7

// Accent (Purple)
accent-500: #a855f7
accent-600: #9333ea

// Gradients
gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)
gradient-primary: from-primary-600 to-accent-600
```

### Components

#### Button
```tsx
<Button variant="primary" size="lg" isLoading={false}>
  Click Me
</Button>

// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
```

#### Input
```tsx
<Input 
  label="Email"
  leftIcon={<Mail />}
  error="Invalid email"
/>
```

#### Card
```tsx
<Card variant="glass" hover>
  Content here
</Card>

// Variants: default, glass, gradient
```

### Animations

All components use Framer Motion for smooth animations:
- Page transitions: 300-500ms
- Hover effects: 200-300ms
- Micro-interactions: Automatic

## 🔌 API Integration

### Axios Configuration

```typescript
// Automatic token refresh
// Error handling with toasts
// Request/response interceptors

import api from './api/axios';

const response = await api.get('/vehicles');
```

### Authentication Store

```typescript
import { useAuthStore } from './store/authStore';

// In component
const { user, login, logout } = useAuthStore();

// Login
await login(email, password);

// Logout
logout();
```

## 📱 Pages

### Home Page
- Hero section with gradient background
- Animated particle effects
- Feature cards with glassmorphism
- Stats section
- CTA sections

### Login Page
- Glassmorphism design
- Password toggle
- Remember me
- Forgot password link

### Register Page  
- Multi-step form (3 steps)
- Progress indicator
- Form validation
- Referral code input

### OTP Verification
- Large 6-digit input
- Auto-focus & auto-submit
- Countdown timer
- Resend functionality

## 🌐 Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Scripts

```bash
# Development
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
```

## 🎯 Features Implemented

✅ **Authentication**
- Login with JWT
- Register with multi-step form
- Email OTP verification  
- Auto token refresh
- Protected routes

✅ **UI Components**
- Button (5 variants)
- Input (with icons, labels, errors)
- Card (glassmorphism)
- All with dark mode support

✅ **State Management**
- Zustand for global state
- Persist middleware
- Auto-initialization

✅ **Animations**
- Framer Motion
- Page transitions
- Hover effects
- Loading states

## 🔜 Coming Soon

- [ ] Vehicle catalog
- [ ] Vehicle details
- [ ] Booking workflow
- [ ] User dashboard
- [ ] Loyalty & rewards UI
- [ ] Referral system
- [ ] Profile management
- [ ] Admin dashboard

## 💡 Tips

### Custom Colors
Edit `tailwind.config.js` to customize the color palette.

### New Components
Use the existing UI components as templates in `src/components/ui/`.

### API Calls
Add new API services in `src/api/` following the pattern in `auth.api.ts`.

### State Management
Create new stores in `src/store/` following `authStore.ts` pattern.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts
server: {
  port: 3001
}
```

### API Connection Issues
- Check backend is running on http://localhost:5000
- Verify VITE_API_URL in .env
- Check browser console for CORS errors

### Build Errors
```bash
# Clear cache and reinstall
rm-rf node_modules pnpm-lock.yaml
pnpm install
```

## 📄 License

Part of the Vehicle Rental Management System.

---

**Built with React + Vite + TypeScript + TailwindCSS + Framer Motion** ⚡

