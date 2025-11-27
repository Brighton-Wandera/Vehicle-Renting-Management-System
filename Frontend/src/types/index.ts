export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    contactPhone: string;
    address?: string;
    photo?: string;
    role: 'user' | 'admin' | 'superAdmin';
    status: 'active' | 'inactive' | 'banned';
    verified: boolean;
    twoFactorEnabled: boolean;
    referralCode?: string;
    totalLoyaltyPoints: number;
    loyaltyTierName?: string;
    createdAt: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
    requiresTwoFactor: boolean;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    contactPhone: string;
    nationalId: number;
    address?: string;
    referralCode?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
}

export interface Vehicle {
    vehicle_id: number;
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    engine_capacity: string;
    transmission: string;
    seating_capacity: number;
    color: string;
    features: string;
    rental_rate: number;
    availability: boolean;
    created_at?: string;
}

export interface Booking {
    booking_id: number;
    user_id: number;
    vehicle_id: number;
    vehicle?: Vehicle;
    booking_date: string;
    return_date: string;
    total_amount: number;
    booking_status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    created_at?: string;
}

export interface CreateBookingData {
    user_id: number;
    vehicle_id: number;
    booking_date: string;
    return_date: string;
    total_amount: number;
}

export interface LoyaltyTier {
    tierId: number;
    tierName: string;
    minPoints: number;
    maxPoints?: number;
    discountPercentage: number;
    freeInsurance: boolean;
    prioritySupport: boolean;
    freeUpgrades: boolean;
    tierColor?: string;
    tierIcon?: string;
}

export interface LoyaltyTransaction {
    transactionId: number;
    transactionType: 'Earned' | 'Redeemed' | 'Bonus' | 'Expired' | 'Referral' | 'Birthday' | 'Milestone';
    points: number;
    description?: string;
    balanceAfter: number;
    createdAt: string;
    expiresAt?: string;
}

export interface Referral {
    referralId: number;
    referredUserName: string;
    referredUserEmail: string;
    signupDate: string;
    firstBookingDate?: string;
    status: 'Pending' | 'Completed' | 'Expired';
    bonusAwarded: boolean;
    bonusPoints: number;
}

export interface Payment {
    paymentId: number;
    bookingId: number;
    amount: number;
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    paymentDate: string;
    paymentMethod?: string;
    transactionId?: string;
}
