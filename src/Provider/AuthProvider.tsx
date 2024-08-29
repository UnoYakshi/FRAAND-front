import axios from "axios";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setisAuthenticated_] = useState(
    !!localStorage.getItem("isAuthenticated")
  );

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    setisAuthenticated_(isAuthenticated);
  };

  useEffect(() => {
    // if (isAuthenticated) {
    //   axios.defaults.headers.common["Authorization"] = "Bearer" + token;
    //   localStorage.setItem("isAuthenticated", String(isAuthenticated));
    // } else {
    //   delete axios.defaults.headers.common["Authorization"];
    //   localStorage.setItem("token", String(isAuthenticated));
    // }
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
