import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin123"; // Senha padrão para o protótipo

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("faith-beads-auth") === "true";
  });
  const navigate = useNavigate();

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("faith-beads-auth", "true");
      toast.success("Acesso autorizado!");
      return true;
    }
    toast.error("Senha incorreta. Acesso negado.");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("faith-beads-auth");
    navigate("/login");
    toast.info("Você saiu do painel administrativo.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
