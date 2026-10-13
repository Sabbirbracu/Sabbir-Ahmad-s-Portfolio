import ResetPasswordPage from "@/components/pages/ResetPasswordPage";
import { Suspense } from "react";

export default function Page() {
  // useSearchParams (the emailed ?token=) requires a Suspense boundary in the App Router.
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
