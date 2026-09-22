import type {AuthUser} from "../types/api.ts";
import {createContext, type ReactNode, useContext} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";

type AuthContextValue = {
    token: string | null;
    user: AuthUser | null;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useLocalStorage<string | null>("token", null);
    const [user, setUser] = useLocalStorage<AuthUser | null>("user", null);

    const login = (t: string, u: AuthUser) => {
        setToken(t);
        setUser(u);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}