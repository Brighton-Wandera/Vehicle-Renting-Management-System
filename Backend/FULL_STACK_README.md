# Vehicle Rental Management System

A complete full-stack vehicle rental management system with React frontend and C# ASP.NET Core backend.

## 📁 Project Structure

```
Vehicle-Renting-Management-System/
├── Backend/                    # C# ASP.NET Core 8.0 Web API
│   ├── Controllers/           # API endpoints
│   ├── Services/              # Business logic
│   ├── Data/                  # Entity Framework DbContext
│   ├── Database/              # SQL Server schemas & seed data
│   ├── docs/                  # Documentation
│   └── archived-hono-attempt/ # Old TypeScript backend (can delete)
│
└── Frontend/                   # React + Vite + TypeScript
    ├── src/
    │   ├── pages/             # Vehicle catalog, auth, dashboard
    │   ├── components/        # Reusable UI components
    │   ├── api/               # API clients
    │   └── types/             # TypeScript interfaces
    └── .env                   # VITE_API_URL=http://localhost:5000/api
```

## 🚀 Quick Start

### 1. Database Setup
```sql
-- In SQL Server Management Studio:
CREATE DATABASE VehicleRentalDB;
GO

-- Execute these files in order:
-- 1. Backend/Database/01_EnhancedSchema.sql
-- 2. Backend/Database/02_SeedData.sql
```

### 2. Backend Setup
```bash
cd Backend

# Configure appsettings.json with:
# - SQL Server connection string
# - Gmail SMTP credentials
# - JWT secret key

dotnet restore
dotnet run
```

Backend runs on: http://localhost:5000 (Swagger UI available)

### 3. Frontend Setup
```bash
cd Frontend
pnpm install
pnpm dev
```

Frontend runs on: http://localhost:5173

---

## 📚 Documentation

- **Setup Guide**: `Backend/docs/SETUP_GUIDE.md` - Complete setup instructions
- **API Docs**: http://localhost:5000 - Swagger UI when backend is running
- **Backend README**: `Backend/README.md` - Backend features & configuration

---

## ✨ Features

### Backend (C# ASP.NET Core)
- ✅ JWT Authentication with refresh tokens
- ✅ Email OTP verification
- ✅ 4-Tier Loyalty Program (Bronze/Silver/Gold/Platinum)
- ✅ Referral System with bonuses
- ✅ Document Verification (driver's license, ID)
- ✅ Multi-channel Notifications (Email/SMS/In-App)
- ✅ Two-Factor Authentication
- ✅ Audit Logging
- ✅ Complete Vehicle & Booking Management

### Frontend (React + Vite)
- ✅ Premium UI with Glassmorphism design
- ✅ Authentication flow (Login/Register/Verify)
- ✅ Vehicle catalog with search & filters
- ✅ Vehicle details page
- ✅ Responsive design
- ✅ Protected routes
- ⏳ Booking form (coming soon)
- ⏳ User dashboard (coming soon)

---

## 🛠️ Tech Stack

**Backend:**
- C# ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- JWT Authentication
- BCrypt password hashing

**Frontend:**
- React 18
- Vite
- TypeScript
- TailwindCSS
- Framer Motion
- React Query
- Zustand

---

## 📝 Environment Configuration

**Backend** (`Backend/appsettings.json`):
- SQL Server connection string
- SMTP email settings (Gmail)
- JWT secret key
- Loyalty program settings
- File upload settings

**Frontend** (`Frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing

1. Start backend: `cd Backend && dotnet run`
2. Open Swagger UI: http://localhost:5000
3. Register a new user via API
4. Check email for OTP
5. Verify and login
6. Start frontend: `cd Frontend && pnpm dev`
7. Test full flow at http://localhost:5173

---

## 📧 Contact

Admin Email: alfiejay881@gmail.com

---

**Built with ❤️ using ASP.NET Core 8.0 and React**
