"use client"

import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { dismissToast, useToastState } from "@/hooks/use-toast"

export function Toaster() {
  const items = useToastState()

  return (
    <div className="fixed right-4 top-4 z-[100] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-xl border px-4 py-3 shadow-2xl backdrop-blur",
            "bg-[#0A0A0A]/80 border-white/10 text-white",
            t.variant === "destructive" && "border-red-500/40",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {t.title && <div className="text-sm font-semibold">{t.title}</div>}
              {t.description && <div className="mt-0.5 text-sm text-white/70">{t.description}</div>}
            </div>

            <button
              onClick={() => dismissToast(t.id)}
              className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
              aria-label="Dismiss toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}



