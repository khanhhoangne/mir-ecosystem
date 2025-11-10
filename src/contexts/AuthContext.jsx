import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";

const AuthContext = createContext();

const MASTER_ADMINS = ["m3ecom"];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const enhanceUserRole = (supabaseUser) => {
    if (!supabaseUser) return null;

    const username = supabaseUser.email.split("@")[0];
    const isMasterAdmin = MASTER_ADMINS.includes(username);

    return {
      ...supabaseUser,
      role: isMasterAdmin ? "masteradmin" : "user",
    };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      const enhancedUser = enhanceUserRole(data?.session?.user);
      setUser(enhancedUser);
      setLoading(false);
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const enhancedUser = enhanceUserRole(session?.user);
        setUser(enhancedUser);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
