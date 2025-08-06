export interface UserRegistrationRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    first_name: string;
    last_name: string;
    phone: string;
}

export interface UserRegistrationResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        username: string;
        email: string;
        fullName: string;
        phone: string;
        createdAt: string;
    };
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    fullName: string;
    gender: string | null;
    avatar: string | null;
    cover: string | null;
    dob: string | null;
    phone: string;
    address: string | null;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: User;
} 
