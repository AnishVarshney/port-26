"use client"

import { useState, useCallback } from "react"

// Validation error types
type ValidationError =
  | "empty_current"
  | "empty_new"
  | "empty_confirm"
  | "password_mismatch"
  | "password_too_short"
  | "same_as_current"
  | "incorrect_current"
  | null

// Validation error messages - mimicking UIAlertController
const errorMessages: Record<Exclude<ValidationError, null>, string> = {
  empty_current: "Please enter your current password.",
  empty_new: "Please enter a new password.",
  empty_confirm: "Please re-confirm your new password.",
  password_mismatch: "New password and confirmation do not match.",
  password_too_short: "Password must be at least 6 characters long.",
  same_as_current: "New password cannot be the same as current password.",
  incorrect_current: "Current password is incorrect.",
}

// Mock current password for demonstration
const MOCK_CURRENT_PASSWORD = "password123"

interface UseChangePasswordReturn {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  setCurrentPassword: (value: string) => void
  setNewPassword: (value: string) => void
  setConfirmPassword: (value: string) => void
  isLoading: boolean
  error: string | null
  isSuccess: boolean
  handleSubmit: () => Promise<void>
  resetState: () => void
}

export function useChangePassword(): UseChangePasswordReturn {
  // Form state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  // Validation function - implements the validation sequence
  const validate = useCallback((): ValidationError => {
    // 1. Empty Check
    if (!currentPassword.trim()) return "empty_current"
    if (!newPassword.trim()) return "empty_new"
    if (!confirmPassword.trim()) return "empty_confirm"

    // 2. Match Check
    if (newPassword !== confirmPassword) return "password_mismatch"

    // 3. Length Check
    if (newPassword.length < 6) return "password_too_short"

    // 4. Uniqueness Check
    if (newPassword === currentPassword) return "same_as_current"

    return null
  }, [currentPassword, newPassword, confirmPassword])

  // Mock Firebase Auth Manager - simulates API call
  const mockFirebaseChangePassword = useCallback(
    async (current: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if current password is correct
      if (current !== MOCK_CURRENT_PASSWORD) {
        return { success: false, error: "incorrect_current" }
      }

      // Success
      return { success: true }
    },
    [],
  )

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    // Clear previous errors
    setError(null)

    // Run validation
    const validationError = validate()
    if (validationError) {
      setError(errorMessages[validationError])
      return
    }

    // Start loading
    setIsLoading(true)

    try {
      // Call mock Firebase API
      const result = await mockFirebaseChangePassword(currentPassword, newPassword)

      if (!result.success && result.error) {
        setError(errorMessages[result.error as keyof typeof errorMessages])
      } else {
        // Success
        setIsSuccess(true)
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [validate, currentPassword, newPassword, mockFirebaseChangePassword])

  // Reset all state
  const resetState = useCallback(() => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setIsLoading(false)
    setError(null)
    setIsSuccess(false)
  }, [])

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    isLoading,
    error,
    isSuccess,
    handleSubmit,
    resetState,
  }
}
