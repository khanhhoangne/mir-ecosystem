import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useMemo } from "react";
import MainLayout from "@/layouts/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";



// Lazy load tất cả page
const Home = lazy(() => import("@/pages/Home"));
const Trade = lazy(() => import("@/pages/Trade"));
const Transfer = lazy(() => import("@/pages/Transfer"));
const Account = lazy(() => import("@/pages/Account"));
const History = lazy(() => import("@/pages/History"));
const Withdraw = lazy(() => import("@/pages/Withdraw"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));


const routeCache = {};

function KeepAlive({ path, element }) {
  if (!routeCache[path]) {
    routeCache[path] = element; // lưu lần đầu
  }
  return routeCache[path];
}

function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<GlobalLoading />}>
      <Routes location={location}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>

          <Route path="/" element={<KeepAlive path="/" element={<Home />} />} />
          <Route path="/trade" element={<KeepAlive path="/trade" element={<Trade />} />} />
          <Route path="/transfer" element={<KeepAlive path="/transfer" element={<Transfer />} />} />
          <Route path="/account" element={<KeepAlive path="/account" element={<Account />} />} />
          <Route path="/history" element={<KeepAlive path="/history" element={<History />} />} />
          <Route path="/withdraw" element={<KeepAlive path="/withdraw" element={<Withdraw />} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
