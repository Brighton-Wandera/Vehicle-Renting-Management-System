USE vehicle_rental_db;
GO

-- Drop tables if they exist (Order matters due to FK constraints)
IF OBJECT_ID('VehicleImages', 'U') IS NOT NULL DROP TABLE VehicleImages;
IF OBJECT_ID('Reviews', 'U') IS NOT NULL DROP TABLE Reviews;
IF OBJECT_ID('CustomerSupportTickets', 'U') IS NOT NULL DROP TABLE CustomerSupportTickets;
IF OBJECT_ID('Payments', 'U') IS NOT NULL DROP TABLE Payments;
IF OBJECT_ID('Bookings', 'U') IS NOT NULL DROP TABLE Bookings;
IF OBJECT_ID('Vehicles', 'U') IS NOT NULL DROP TABLE Vehicles;
IF OBJECT_ID('VehicleSpecifications', 'U') IS NOT NULL DROP TABLE VehicleSpecifications;
IF OBJECT_ID('Locations', 'U') IS NOT NULL DROP TABLE Locations;
IF OBJECT_ID('RefreshTokens', 'U') IS NOT NULL DROP TABLE RefreshTokens;
IF OBJECT_ID('PasswordResets', 'U') IS NOT NULL DROP TABLE PasswordResets;
IF OBJECT_ID('Users', 'U') IS NOT NULL DROP TABLE Users;
GO

-- 1. Users Table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    address VARCHAR(255),
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    profile_image VARCHAR(500),
    is_verified BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

-- 2. Auth: Refresh Tokens
CREATE TABLE RefreshTokens (
    token_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
GO

-- 3. Auth: Password Resets
CREATE TABLE PasswordResets (
    reset_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    otp VARCHAR(10) NOT NULL,
    expires_at DATETIME NOT NULL,
    is_used BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
GO

-- 4. Locations (Branches)
CREATE TABLE Locations (
    location_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- 5. Vehicle Specifications
CREATE TABLE VehicleSpecifications (
    vehicleSpec_id INT IDENTITY(1,1) PRIMARY KEY,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    fuel_type VARCHAR(20) NOT NULL CHECK (fuel_type IN ('Petrol', 'Diesel', 'Electric', 'Hybrid')),
    engine_capacity VARCHAR(50),
    transmission VARCHAR(20) NOT NULL CHECK (transmission IN ('Manual', 'Automatic')),
    seating_capacity INT NOT NULL,
    color VARCHAR(50),
    features NVARCHAR(MAX),
    image_url VARCHAR(500), -- Main image
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

-- 6. Vehicles
CREATE TABLE Vehicles (
    vehicle_id INT IDENTITY(1,1) PRIMARY KEY,
    vehicleSpec_id INT NOT NULL,
    rental_rate DECIMAL(10, 2) NOT NULL,
    availability BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (vehicleSpec_id) REFERENCES VehicleSpecifications(vehicleSpec_id) ON DELETE CASCADE
);
GO

-- 7. Vehicle Images (Gallery)
CREATE TABLE VehicleImages (
    image_id INT IDENTITY(1,1) PRIMARY KEY,
    vehicleSpec_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (vehicleSpec_id) REFERENCES VehicleSpecifications(vehicleSpec_id) ON DELETE CASCADE
);
GO

-- 8. Bookings
CREATE TABLE Bookings (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    booking_date DATE NOT NULL,
    return_date DATE NOT NULL,
    pickup_location_id INT, -- Added
    dropoff_location_id INT, -- Added
    total_amount DECIMAL(10, 2) NOT NULL,
    booking_status VARCHAR(20) DEFAULT 'Pending' CHECK (booking_status IN ('Pending', 'Confirmed', 'Cancelled', 'Completed')),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE,
    FOREIGN KEY (pickup_location_id) REFERENCES Locations(location_id),
    FOREIGN KEY (dropoff_location_id) REFERENCES Locations(location_id)
);
GO

-- 9. Payments
CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Completed', 'Failed')),
    payment_date DATETIME DEFAULT GETDATE(),
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id) ON DELETE CASCADE
);
GO

-- 10. Customer Support Tickets
CREATE TABLE CustomerSupportTickets (
    ticket_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In_Progress', 'Resolved', 'Closed')),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
GO

-- 11. Reviews
CREATE TABLE Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE CASCADE
);
GO

-- SEED DATA ------------------------------------------------------------------

-- Users
INSERT INTO Users (first_name, last_name, email, password, contact_phone, address, role, is_verified) VALUES
('Admin', 'User', 'admin@example.com', '$2b$10$YourHashedPasswordHere', '1234567890', 'Admin HQ', 'admin', 1),
('John', 'Doe', 'john@example.com', '$2b$10$YourHashedPasswordHere', '0987654321', '123 Main St', 'user', 1),
('Jane', 'Smith', 'jane@example.com', '$2b$10$YourHashedPasswordHere', '1122334455', '456 Elm St', 'user', 1);
GO

-- Locations
INSERT INTO Locations (name, address, city, contact_phone) VALUES
('Downtown Branch', '100 City Center', 'Nairobi', '0700000001'),
('Airport Branch', 'JKIA Terminal 1', 'Nairobi', '0700000002'),
('Westlands Hub', 'Westgate Mall', 'Nairobi', '0700000003');
GO

-- Vehicle Specifications
INSERT INTO VehicleSpecifications (manufacturer, model, year, fuel_type, engine_capacity, transmission, seating_capacity, color, features, image_url) VALUES
('Toyota', 'Corolla', 2022, 'Petrol', '1.8L', 'Automatic', 5, 'White', 'Bluetooth, AC, Reverse Camera', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80'),
('Mercedes-Benz', 'C-Class', 2023, 'Petrol', '2.0L', 'Automatic', 5, 'Black', 'Leather Seats, Sunroof, Navigation', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'),
('Land Rover', 'Defender', 2023, 'Diesel', '3.0L', 'Automatic', 7, 'Green', 'Off-road Pack, 4WD, Heated Seats', 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=800&q=80');
GO

-- Vehicles
INSERT INTO Vehicles (vehicleSpec_id, rental_rate, availability) VALUES
(1, 3500.00, 1), -- Corolla
(1, 3500.00, 1), -- Corolla
(2, 12000.00, 1), -- Mercedes
(3, 18000.00, 1); -- Defender
GO

-- Vehicle Images (Gallery)
INSERT INTO VehicleImages (vehicleSpec_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&w=800&q=80'),
(2, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80'),
(3, 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?auto=format&fit=crop&w=800&q=80');
GO

-- Bookings
INSERT INTO Bookings (user_id, vehicle_id, booking_date, return_date, pickup_location_id, dropoff_location_id, total_amount, booking_status) VALUES
(2, 1, GETDATE(), DATEADD(day, 3, GETDATE()), 1, 2, 10500.00, 'Confirmed'),
(3, 3, DATEADD(day, 5, GETDATE()), DATEADD(day, 7, GETDATE()), 2, 2, 24000.00, 'Pending');
GO

-- Payments
INSERT INTO Payments (booking_id, amount, payment_status, payment_method, transaction_id) VALUES
(1, 10500.00, 'Completed', 'M-Pesa', 'QWE123RTY456');
GO

-- Reviews
INSERT INTO Reviews (user_id, vehicle_id, rating, comment) VALUES
(2, 1, 5, 'Great car, very fuel efficient and clean.');
GO