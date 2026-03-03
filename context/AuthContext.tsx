"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  tecH_CODE: string;
  tecH_NAME: string;
  mobilE_NO: string;
  email: string;
  token: string;
  area?: string;
  city?: string;
  iS_ACTIVE?: boolean;
  serialNo?: string;
}

interface AuthContextType {
  user: User | null;
  companyID: string | null;
  login: (userData: User, companyID?: string) => void;
  logout: () => void;
  isLoading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [companyID, setCompanyID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCompanyID = localStorage.getItem("companyID");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCompanyID) {
      setCompanyID(storedCompanyID);
    }
    setIsLoading(false); // Mark as loaded
  }, []);

  const login = (userData: User, companyIDValue?: string) => {
    console.log(
      "Logging in user:",
      userData,
      "with companyID:",
      companyIDValue,
    );
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (companyIDValue) {
      setCompanyID(companyIDValue);
      localStorage.setItem("companyID", companyIDValue);
    }
  };

  const logout = () => {
    setUser(null);
    setCompanyID(null);
    localStorage.removeItem("user");
    localStorage.removeItem("companyID");
  };

  return (
    <AuthContext.Provider value={{ user, companyID, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
