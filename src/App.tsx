
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AutomationsProvider } from "@/components/AutomationsProvider";
import { NavigationBar } from "@/components/NavigationBar";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Prospeccao from "./pages/Prospeccao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AutomationsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-branco-puro w-full">
            <NavigationBar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/prospeccao" element={<Prospeccao />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AutomationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
