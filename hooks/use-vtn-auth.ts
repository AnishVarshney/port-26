"use client"

import { useState, useCallback } from "react"

interface AuthState {
  isAuthenticated: boolean
  user: {
    name: string
    email: string
  } | null
  hasPremiumAccess: boolean
}

interface UseVTNAuthReturn {
  isAuthenticated: boolean
  user: AuthState["user"]
  hasPremiumAccess: boolean
  signIn: () => void
  signOut: () => void
  deleteAccount: () => void
}

// Custom hook for VTN authentication state management
export function useVTNAuth(): UseVTNAuthReturn {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: true, // Demo: starts authenticated
    user: {
      name: "Joey",
      email: "abc@gmail.com",
    },
    hasPremiumAccess: true, // Demo: starts with premium
  })

  const signIn = useCallback(() => {
    setAuthState({
      isAuthenticated: true,
      user: {
        name: "Joey",
        email: "abc@gmail.com",
      },
      hasPremiumAccess: true,
    })
  }, [])

  const signOut = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      hasPremiumAccess: false,
    })
  }, [])

  const deleteAccount = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      hasPremiumAccess: false,
    })
  }, [])

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    hasPremiumAccess: authState.hasPremiumAccess,
    signIn,
    signOut,
    deleteAccount,
  }
}
