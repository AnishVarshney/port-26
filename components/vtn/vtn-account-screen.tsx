"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"

interface VTNAccountScreenProps {
  onBack: () => void
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  hasPremiumAccess: boolean
  onDeleteAccount: () => void
}

// Account option data - DRY pattern using array mapping
const accountOptions = [
  { id: "email", label: "Email", type: "display" as const },
  { id: "subscription", label: "Subscription", type: "display" as const },
  { id: "password", label: "Change Password", type: "navigate" as const },
]

// Reusable Account Row component
function AccountRow({
  label,
  value,
  showArrow = false,
  onTap,
  isLast = false,
}: {
  label: string
  value?: string
  showArrow?: boolean
  onTap?: () => void
  isLast?: boolean
}) {
  return (
    <motion.button
      onClick={onTap}
      disabled={!onTap}
      whileTap={onTap ? { scale: 0.98, opacity: 0.7 } : undefined}
      className={`w-full flex items-center justify-between px-6 py-4 text-left ${
        !isLast ? "border-b border-[#EFEFEF]" : ""
      }`}
    >
      <span className="text-[15px] font-medium text-black">{label}</span>
      <div className="flex items-center gap-1">
        {value && <span className="text-[14px] text-black/50 font-medium">{value}</span>}
        {showArrow && <ChevronRight className="w-4 h-4 text-black/40" strokeWidth={2} />}
      </div>
    </motion.button>
  )
}

// Delete Account Confirmation Modal
function DeleteAccountModal({
  isOpen,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/40 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-5 z-50"
            style={{
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-1">Delete Account?</h3>
              <p className="text-[14px] text-black/60 mb-5 leading-relaxed">
                This action cannot be undone. All your data, notes, and recordings will be permanently deleted.
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onCancel}
                  className="flex-1 py-3 rounded-xl bg-[#F5F5F5] text-black font-semibold text-[15px]"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-[15px]"
                >
                  Yes, Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Profile Section component
function ProfileSection({ name, isAuthenticated }: { name: string; isAuthenticated: boolean }) {
  return (
    <div className="flex flex-col items-center py-6">
      {/* Profile Image Container */}
      <div
        className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center mb-3"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #EFEFEF",
        }}
      >
        {/* Character Illustration */}
        <div className="w-[80px] h-[80px] relative">
          {/* Simple avatar representation */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <div className="relative">
              {/* Face */}
              <div className="w-12 h-12 rounded-full bg-[#FFD9B3] relative">
                {/* Hair */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-6 bg-[#4A3728] rounded-t-full" />
                <div className="absolute top-0 -left-1 w-3 h-8 bg-[#4A3728] rounded-l-full" />
                <div className="absolute top-0 -right-1 w-3 h-8 bg-[#4A3728] rounded-r-full" />
                {/* Eyes */}
                <div className="absolute top-4 left-2.5 w-2 h-2 rounded-full bg-[#2D2D2D]" />
                <div className="absolute top-4 right-2.5 w-2 h-2 rounded-full bg-[#2D2D2D]" />
                {/* Smile */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-[#2D2D2D] rounded-b-full" />
              </div>
              {/* Body/Shirt */}
              <div className="w-14 h-6 bg-[#E8B4B4] rounded-t-xl mx-auto -mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Name */}
      <span className="text-[18px] font-medium text-black">{isAuthenticated ? name : "Guest User"}</span>
    </div>
  )
}

export function VTNAccountScreen({
  onBack,
  isAuthenticated,
  user,
  hasPremiumAccess,
  onDeleteAccount,
}: VTNAccountScreenProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false)
    onDeleteAccount()
    onBack() // Navigate back after deletion
  }

  const getOptionValue = (optionId: string): string => {
    if (!isAuthenticated) {
      return optionId === "email" ? "Sign in to view" : "-"
    }

    switch (optionId) {
      case "email":
        return user?.email || "-"
      case "subscription":
        return hasPremiumAccess ? "Premium" : "Basic"
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#F9F9F9] relative">
      {/* Header */}
      <div className="flex items-center justify-center px-5 pt-2 pb-4 relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="absolute left-4 w-9 h-9 rounded-full bg-black flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
        </motion.button>
        <h1 className="text-[18px] font-bold text-black">Accounts</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Profile Section */}
        <ProfileSection name={user?.name || "Guest"} isAuthenticated={isAuthenticated} />

        {/* Account Card */}
        <div
          className="mx-5 bg-white rounded-[24px] overflow-hidden"
          style={{
            boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
          }}
        >
          {/* Main Options - Using map for DRY code */}
          {accountOptions.map((option, index) => (
            <AccountRow
              key={option.id}
              label={option.label}
              value={getOptionValue(option.id)}
              showArrow={option.type === "navigate"}
              onTap={option.type === "navigate" ? () => console.log(`Navigate to ${option.id}`) : undefined}
              isLast={index === accountOptions.length - 1}
            />
          ))}

          {/* Spacer */}
          <div className="h-8" />

          {/* Delete Account - Separated with larger gap */}
          <motion.button
            onClick={() => setShowDeleteModal(true)}
            whileTap={{ scale: 0.98, opacity: 0.7 }}
            className="w-full flex items-center justify-between px-6 py-4 text-left border-t border-[#EFEFEF]"
          >
            <span className="text-[15px] font-medium text-red-500">Delete Account</span>
          </motion.button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
