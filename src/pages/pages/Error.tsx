import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const Error = () => {
  const error = useRouteError() as { status?: number; statusText?: string; message?: string };
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "An unexpected error has occurred. Please try again later.";

  if (error?.status === 404) {
    title = "Page not found";
    message = "Sorry, the page you are looking for doesn't exist.";
  } else if (error?.status && error.status >= 500) {
    title = "Server error";
    message = "Our servers are having issues right now. Please try again later.";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
        <div className="space-x-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;