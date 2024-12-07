import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import SynthToken from "./pages/SynthToken";
import PoolDetails from "./pages/PoolDetails";
import CreateLiquidityPool from "./pages/CreateLiquidityPool";
import Error from "./pages/Error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on 404s or other client errors
        if (error?.response?.status < 500) return false;
        // Retry up to 2 times on server errors
        return failureCount < 2;
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/synth-token" element={<SynthToken />} />
              <Route path="/pools/:poolId" element={<PoolDetails />} />
              <Route path="/create-pool" element={<CreateLiquidityPool />} />
              <Route path="*" element={<Error />} errorElement={<Error />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;