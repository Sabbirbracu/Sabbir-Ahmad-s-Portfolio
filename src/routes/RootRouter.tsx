import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";

// Index (the LCP landing page) stays in the main bundle so it renders without a
// Suspense fallback. Every other route is lazy-loaded into its own chunk — this
// keeps heavy, rarely-hit code (admin dashboard + recharts, project/article
// pages) out of the initial download.
const Services = lazy(() => import("@/pages/Services"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <p className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground animate-pulse">
      Loading…
    </p>
  </div>
);

const lazyRoute = (element: JSX.Element) => (
  <Suspense fallback={<PageFallback />}>{element}</Suspense>
);

// Define all application routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/services",
    element: lazyRoute(<Services />),
  },
  {
    path: "/projects",
    element: lazyRoute(<Projects />),
  },
  {
    path: "/projects/:slug",
    element: lazyRoute(<ProjectDetails />),
  },
  {
    path: "/article/:id",
    element: lazyRoute(<ArticlePage />),
  },
  {
    path: "/admin/login",
    element: lazyRoute(<AdminLogin />),
  },
  {
    path: "/admin/forgot-password",
    element: lazyRoute(<ForgotPassword />),
  },
  {
    path: "/admin/dashboard",
    element: lazyRoute(<Dashboard />),
  },
  {
    path: "*",
    element: lazyRoute(<NotFound />),
  },
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
