# Vehicle Rental Management System - Setup Guide

## 📁 Project Structure (After Reorganization)

```
Vehicle-Renting-Management-System/
├── Backend/                          # C# ASP.NET Core 8.0 API ✅
│   ├── Controllers/                  # API endpoints
│   ├── Services/                     # Business logic
│   ├── Data/                         # EF Core DbContext
│   ├── Database/                     # SQL schema files ✅ MOVED HERE
│   │   ├── 01_EnhancedSchema.sql    # Full schema with loyalty, referrals
│   │   └── 02_SeedData.sql          # Initial data
│   ├── appsettings.json             # Configuration
│   └── Program.cs                    # Startup
│
├── vehicle-rental-frontend/          # React + Vite frontend ✅
│   ├── src/
│   │   ├── pages/                   # Vehicles, Details, Auth, Dashboard
│   │   ├── components/              # Reusable UI components
│   │   ├── api/                     # API clients
│   │   └── types/                   # TypeScript interfaces
│   └── .env                         # VITE_API_URL=http://localhost:5000/api
│
└── Backend-Hono-Archive/             # Old TypeScript backend (archived)
```

---

## 🚀 Quick Start Guide

### Prerequisites

- ✅ **SQL Server** (Express/Developer/Full) with SSMS
- ✅ **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- ✅ **Node.js 18+** and **pnpm** - For frontend
- ✅ **Gmail Account** - For email OTP (or other SMTP)

---

## Step 1: Database Setup (SQL Server)

### 1.1 Create Database

Open **SQL Server Management Studio (SSMS)** and connect to your server.

```sql
-- Create the database
CREATE DATABASE VehicleRentalDB;
GO
```

### 1.2 Execute Schema Scripts

Run these scripts **in order** in SSMS:

1. **Backend/Database/01_EnhancedSchema.sql**
   - Creates all tables (Users, Vehicles, Bookings, Loyalty, Referrals, etc.)
   
2. **Backend/Database/02_SeedData.sql**
   - Adds loyalty tiers (Bronze, Silver, Gold, Platinum)
   - Adds sample notification templates
   - Optionally adds test users/vehicles

> [!TIP]
> Open each file in SSMS, ensure `VehicleRentalDB` is selected, click Execute (F5)

---

## Step 2: Backend Configuration (C# API)

### 2.1 Update Connection String

Edit `Backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=VehicleRentalDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

**Replace:**
- `YOUR_SERVER_NAME` with your SQL Server instance (e.g., `localhost`, `(localdb)\\MSSQLLocalDB`, or `.\\SQLEXPRESS`)

**Example for Local SQL Server:**
```json
"DefaultConnection": "Server=localhost;Database=VehicleRentalDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

### 2.2 Configure Email Settings (Gmail)

Still in `appsettings.json`:

```json
{
  "EmailSettings": {
    "Provider": "SMTP",
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": 587,
    "SmtpUsername": "alfiejay881@gmail.com",
    "SmtpPassword": "YOUR_GMAIL_APP_PASSWORD",
    "FromEmail": "alfiejay881@gmail.com",
    "FromName": "Vehicle Rental System",
    "EnableSsl": true
  }
}
```

**To get Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Search for "App passwords"
4. Create password for "Mail"
5. Copy 16-character password (remove spaces)
6. Paste into `SmtpPassword`

### 2.3 Update JWT Secret (IMPORTANT!)

Change the JWT secret to a strong random value:

```json
{
  "JwtSettings": {
    "SecretKey": "your-super-secret-jwt-key-minimum-32-characters-long-please-change-this",
    "Issuer": "VehicleRentalAPI",
    "Audience": "VehicleRentalClients",
    "AccessTokenExpiryMinutes": 15,
    "RefreshTokenExpiryDays": 7
  }
}
```

### 2.4 Start Backend

```bash
cd Backend
dotnet restore
dotnet run
```

Backend will start on:
- **HTTP**: http://localhost:5000
- **HTTPS**: https://localhost:5001
- **Swagger**: http://localhost:5000 (interactive API docs)

> [!NOTE]
> Browse to http://localhost:5000 to see Swagger UI and test APIs

---

## Step 3: Frontend Setup (React)

### 3.1 Install Dependencies

```bash
cd vehicle-rental-frontend
pnpm install
```

### 3.2 Verify .env Configuration

Check that `.env` points to backend:

```bash
VITE_API_URL=http://localhost:5000/api
```

✅ **Already updated!**

### 3.3 Start Frontend

```bash
pnpm dev
```

Frontend will start on: **http://localhost:5173**

---

## 🧪 Testing the System

### Test 1: Backend API (Swagger)

1. Open http://localhost:5000
2. Try **POST /api/auth/register**:
   ```json
   {
     "firstName": "Test",
     "lastName": "User",
     "email": "test@example.com",
     "password": "Test123!",
     "confirmPassword": "Test123!",
     "contactPhone": "+254712345678",
     "nationalId": 12345678,
     "address": "Nairobi, Kenya"
   }
   ```
3. Check your email for OTP code
4. Verify with **POST /api/auth/verify-email**
5. Login with **POST /api/auth/login**

### Test 2: Frontend Flow

1. Open http://localhost:5173
2. Click "Browse Vehicles"
3. Register a new account
4. Verify email with OTP
5. Login
6. Browse vehicles catalog
7. View vehicle details

---

## 🎯 Features Implemented

### Backend (C# ASP.NET Core)
- ✅ JWT Authentication (access + refresh tokens)
- ✅ Email OTP Verification
- ✅ Password Reset with OTP
- ✅ 4-Tier Loyalty Program (Bronze/Silver/Gold/Platinum)
- ✅ Referral System (earn 500 pts, referee gets 200 pts)
- ✅ Document Upload & Verification
- ✅ Multi-channel Notifications (Email/SMS/In-App)
- ✅ Two-Factor Authentication (2FA)
- ✅ Audit Logging
- ✅ User Preferences
- ✅ Complete CRUD for Vehicles, Bookings, Payments

### Frontend (React + Vite)
- ✅ Premium UI with Glassmorphism
- ✅ Authentication Flow (Login/Register/Verify Email)
- ✅ Vehicle Catalog with Search & Filters
- ✅ Vehicle Details Page
- ✅ Responsive Navbar & Footer
- ✅ Protected Routes
- ✅ API Integration with TypeScript
- ⏳ Booking Form (Next)
- ⏳ User Dashboard (Next)

---

## 📝 API Endpoints

All endpoints are documented in Swagger at http://localhost:5000

**Key Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-email` - Verify OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh JWT
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/{id}` - Get vehicle details
- `POST /api/bookings` - Create booking
- `GET /api/users/me` - Get current user profile
- `GET /api/loyalty/my-points` - Get loyalty points

---

## 🔧 Troubleshooting

### Backend won't start
- Check SQL Server is running
- Verify connection string in appsettings.json
- Check .NET 8.0 SDK is installed: `dotnet --version`

### Database connection fails
- Test connection in SSMS first
- Ensure VehicleRentalDB exists
- Check Windows Authentication is enabled (or use SQL Server auth)

### Email OTP not sending
- Verify Gmail App Password is correct
- Check "Less secure app access" (if needed)
- Check spam folder

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check .env has correct URL
- Check CORS is enabled in Backend/Program.cs

---

## 📚 Next Steps

1. **Test complete auth flow** (register → verify → login)
2. **Add sample vehicles** via Swagger or seed data
3. **Implement booking form** in frontend
4. **Build user dashboard** with bookings history
5. **Add payment integration** (optional)
6. **Deploy to production** (Azure/AWS)

---

## 🆘 Need Help?

- **Swagger Docs**: http://localhost:5000
- **Backend README**: Backend/README.md
- **Check logs**: Console output from `dotnet run`
- **Database**: Query tables in SSMS to verify data

---

**🎉 You're all set! Happy coding!**
