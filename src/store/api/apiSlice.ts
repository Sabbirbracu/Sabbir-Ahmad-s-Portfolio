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

// Project types
export interface Project {
  id?: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  tagline?: string;
  status?: string;
  year?: number;
  duration?: string;
  visibility?: string;
  featured?: boolean;
  media?: {
    banner?: string;
    gallery?: string[];
  };
  links?: {
    live?: string;
    github?: string;
  };
  techStack?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    aiMl?: string[];
    devops?: string[];
    tools?: string[];
  };
  summaryMetrics?: {
    users?: string;
    scale?: string;
    performance?: string;
    impact?: string;
  };
  caseStudy?: {
    role?: string;
    problem?: string;
    solution?: string;
    features?: string[];
    challenges?: Array<{ problem: string; solution: string }>;
    outcome?: string;
  };
  meta?: {
    keywords?: string[];
    ogImage?: string;
  };
}

// Article types
export interface Article {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  date?: string;
  readTime?: number;
  category?: string;
  published?: boolean;
}

// Contact types
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: "new" | "read" | "replied";
  createdAt?: string;
}

// Media upload response
export interface MediaUploadResponse {
  data: Array<{
    key: string;
    url: string;
    size: number;
    type: string;
  }>;
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
  tagTypes: ["Portfolio", "Projects", "Contact", "Auth", "Articles"],
  endpoints: (builder) => ({
    // ========== Auth endpoints ==========
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

    // ========== Projects endpoints ==========
    getProjects: builder.query<Project[], { type?: string; featured?: boolean } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.type) queryParams.append("type", params.type);
        if (params?.featured !== undefined) queryParams.append("featured", String(params.featured));
        return `/projects${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      },
      transformResponse: (response: any) => {
        // Transform API response to return just the data array
        return response?.data || response || [];
      },
      providesTags: ["Projects"],
    }),
    getProjectBySlug: builder.query<Project, string>({
      query: (slug) => `/projects/${slug}`,
      transformResponse: (response: any) => {
        // Transform API response to return just the data object
        return response?.data || response || {};
      },
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<{ success: boolean; data: Project }, Partial<Project>>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects", "Portfolio"],
    }),
    updateProject: builder.mutation<{ success: boolean; data: Project }, { id: string; data: Partial<Project> }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Projects", "Portfolio"],
    }),
    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects", "Portfolio"],
    }),

    // ========== Articles endpoints ==========
    getArticles: builder.query<Article[], void>({
      query: () => "/articles",
      providesTags: ["Articles"],
    }),
    getArticleBySlug: builder.query<Article, string>({
      query: (slug) => `/articles/${slug}`,
      providesTags: ["Articles"],
    }),
    createArticle: builder.mutation<{ success: boolean; data: Article }, Partial<Article>>({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Articles", "Portfolio"],
    }),
    updateArticle: builder.mutation<{ success: boolean; data: Article }, { id: string; data: Partial<Article> }>({
      query: ({ id, data }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Articles", "Portfolio"],
    }),
    deleteArticle: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles", "Portfolio"],
    }),

    // ========== Media endpoints ==========
    uploadMedia: builder.mutation<MediaUploadResponse, FormData>({
      query: (formData) => ({
        url: "/media",
        method: "POST",
        body: formData,
      }),
    }),

    // ========== Contact endpoints ==========
    submitContact: builder.mutation<{ success: boolean; message: string }, ContactMessage>({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),
    getContacts: builder.query<ContactMessage[], void>({
      query: () => "/contact",
      providesTags: ["Contact"],
    }),
    updateContactStatus: builder.mutation<{ success: boolean }, { id: string; status: "new" | "read" | "replied" }>({
      query: ({ id, status }) => ({
        url: `/contact/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),

    // ========== Portfolio (aggregated data) ==========
    getPortfolioData: builder.query({
      query: () => "/portfolio",
      providesTags: ["Portfolio"],
    }),

    // ========== Health check ==========
    healthCheck: builder.query<{ status: string }, void>({
      query: () => "/health",
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Auth
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyTokenQuery,
  // Projects
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  // Articles
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  // Media
  useUploadMediaMutation,
  // Contact
  useSubmitContactMutation,
  useGetContactsQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
  // Portfolio
  useGetPortfolioDataQuery,
  // Health
  useHealthCheckQuery,
} = apiSlice;
