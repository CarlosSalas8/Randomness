"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  token: string | null
  user: string | null
  login: (token: string, username: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    // Cargar token del localStorage al iniciar
    const savedToken = localStorage.getItem("authToken")
    const savedUser = localStorage.getItem("username")
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(savedUser)
    }
  }, [])

  const login = (newToken: string, username: string) => {
    setToken(newToken)
    setUser(username)
    localStorage.setItem("authToken", newToken)
    localStorage.setItem("username", username)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("authToken")
    localStorage.removeItem("username")
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
