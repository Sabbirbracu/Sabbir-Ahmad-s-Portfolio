import AdminDashboardPage from "@/components/pages/AdminDashboardPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AdminDashboardPage />
    </Suspense>
  );
}
