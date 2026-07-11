import Dashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/AdminLogin";
import ArticlePage from "@/pages/ArticlePage";
import ForgotPassword from "@/pages/ForgotPassword";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ProjectDetails from "@/pages/ProjectDetails";
import Projects from "@/pages/Projects";
import Services from "@/pages/Services";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Define all application routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/projects/:slug",
    element: <ProjectDetails />,
  },
  {
    path: "/article/:id",
    element: <ArticlePage />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
