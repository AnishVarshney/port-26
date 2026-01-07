"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { useChangePassword } from "@/hooks/use-change-password"

interface VTNChangePasswordScreenProps {
  onBack: () => void
}

// Reusable Password Input Field component - DRY pattern
function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  disabled,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  disabled: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="mb-5">
      {/* Label - Poppins Regular 18pt */}
      <label className="block text-[16px] font-normal text-black mb-2 pl-1">{label}</label>

      {/* Input Container */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3.5 pr-12 rounded-xl bg-white text-[14px] text-black
            border transition-colors duration-200 outline-none
            placeholder:text-black/30 placeholder:font-light
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isFocused ? "border-black" : "border-[#C7C7C7]"}
          `}
        />

        {/* Show/Hide Password Toggle */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black/40 hover:text-black/60 transition-colors disabled:opacity-50"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </motion.button>
      </div>
    </div>
  )
}

// Error Alert Modal - mimics UIAlertController
function ErrorAlert({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-50"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onDismiss} />

      {/* Alert Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative bg-white rounded-2xl w-[85%] max-w-[280px] overflow-hidden"
        style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
      >
        <div className="p-5 text-center">
          <h3 className="text-[17px] font-semibold text-black mb-1">Error</h3>
          <p className="text-[14px] text-black/70 leading-relaxed">{message}</p>
        </div>
        <div className="border-t border-[#E5E5E5]">
          <motion.button
            whileTap={{ scale: 0.98, backgroundColor: "rgba(0,0,0,0.05)" }}
            onClick={onDismiss}
            className="w-full py-3 text-[17px] font-semibold text-[#007AFF]"
          >
            OK
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Success Alert Modal
function SuccessAlert({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-50"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Alert Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative bg-white rounded-2xl w-[85%] max-w-[280px] overflow-hidden"
        style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
      >
        <div className="p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7 text-green-500" />
          </div>
          <h3 className="text-[17px] font-semibold text-black mb-1">Success</h3>
          <p className="text-[14px] text-black/70 leading-relaxed">Your password has been changed successfully.</p>
        </div>
        <div className="border-t border-[#E5E5E5]">
          <motion.button
            whileTap={{ scale: 0.98, backgroundColor: "rgba(0,0,0,0.05)" }}
            onClick={onDismiss}
            className="w-full py-3 text-[17px] font-semibold text-[#007AFF]"
          >
            OK
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function VTNChangePasswordScreen({ onBack }: VTNChangePasswordScreenProps) {
  const {
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
  } = useChangePassword()

  const [showError, setShowError] = useState(false)

  // Handle error display
  const handleErrorDismiss = () => {
    setShowError(false)
  }

  // Handle success - navigate back to accounts
  const handleSuccessDismiss = () => {
    resetState()
    onBack()
  }

  // Trigger error modal when error changes
  if (error && !showError) {
    setShowError(true)
  }

  // Form fields configuration - DRY pattern
  const formFields = [
    {
      id: "current",
      label: "Current Password",
      placeholder: "Enter current password",
      value: currentPassword,
      onChange: setCurrentPassword,
    },
    {
      id: "new",
      label: "New Password",
      placeholder: "Enter new password",
      value: newPassword,
      onChange: setNewPassword,
    },
    {
      id: "confirm",
      label: "Re-confirm Password",
      placeholder: "Re-enter new password",
      value: confirmPassword,
      onChange: setConfirmPassword,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-[#F9F9F9] relative">
      {/* Header */}
      <div className="flex items-center justify-center px-5 pt-2 pb-4 relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          disabled={isLoading}
          className="absolute left-4 w-9 h-9 rounded-full bg-black flex items-center justify-center disabled:opacity-50"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
        </motion.button>
        <h1 className="text-[18px] font-bold text-black">Change Password</h1>
      </div>

      {/* Form Card - min-h-[75vh] as specified */}
      <div className="flex-1 px-5 pt-4">
        <div
          className="bg-white rounded-[24px] p-5 pt-8  flex flex-col"
          style={{
            boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
          }}
        >
          {/* Form Fields - Using map for DRY code */}
          <div className="flex-1">
            {formFields.map((field) => (
              <PasswordField
                key={field.id}
                label={field.label}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Continue Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-black text-white font-semibold text-[16px] disabled:opacity-70 transition-opacity mt-auto mb-4"
          >
            {isLoading ? "Changing..." : "Continue"}
          </motion.button>
        </div>
      </div>

      {/* Error Alert Modal */}
      <AnimatePresence>
        {showError && error && <ErrorAlert message={error} onDismiss={handleErrorDismiss} />}
      </AnimatePresence>

      {/* Success Alert Modal */}
      <AnimatePresence>{isSuccess && <SuccessAlert onDismiss={handleSuccessDismiss} />}</AnimatePresence>
    </div>
  )
}
