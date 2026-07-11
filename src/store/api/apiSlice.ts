import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API Base URL - change this to your production URL when deploying
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Define types for auth
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: {
      id: string;
      email: string;
      name: string;
      role?: string;
      lastLogin?: string;
    };
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("adminToken");

// Define the base API slice with RTK Query
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Portfolio", "Projects", "Contact", "Auth", "Articles", "Experiences", "Skills", "Appointments"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<{ success: boolean; message: string }, ForgotPasswordRequest>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ success: boolean; message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyToken: builder.query<{ valid: boolean; admin: AuthResponse["data"]["admin"] }, void>({
      query: () => "/auth/verify",
      providesTags: ["Auth"],
    }),

    // Portfolio endpoints
    getPortfolioData: builder.query({
      query: () => "/portfolio",
      providesTags: ["Portfolio"],
    }),
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    submitContact: builder.mutation({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyTokenQuery,
  useGetPortfolioDataQuery,
  useGetProjectsQuery,
  useSubmitContactMutation,
} = apiSlice;
