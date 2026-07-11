import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-8 -right-4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-4 max-w-lg text-center"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <h1 className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-[150px] font-black leading-none text-transparent md:text-[200px]">
            404
          </h1>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <div className="rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            Page Not Found
          </h2>
          <p className="mb-2 text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="mb-8 text-sm text-muted-foreground/70">
            Attempted path:{" "}
            <code className="rounded bg-muted px-2 py-1 font-mono text-xs">
              {location.pathname}
            </code>
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="gap-2 transition-all hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            onClick={handleGoHome}
            className="gap-2 transition-all hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-primary/40"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
