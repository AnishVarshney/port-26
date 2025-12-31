"use client"

import { useSyncExternalStore } from "react"

export type ToastVariant = "default" | "destructive"

export type ToastInput = {
  title?: string
  description?: string
  variant?: ToastVariant
  durationMs?: number
}

export type ToastItem = ToastInput & {
  id: string
  createdAt: number
}

let toasts: ToastItem[] = []
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return toasts
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

export function toast(input: ToastInput) {
  const id =
    (globalThis.crypto &&
      "randomUUID" in globalThis.crypto &&
      (globalThis.crypto as Crypto).randomUUID?.()) ||
    `${Date.now()}-${Math.random().toString(16).slice(2)}`

  const item: ToastItem = {
    id,
    createdAt: Date.now(),
    variant: input.variant ?? "default",
    title: input.title,
    description: input.description,
    durationMs: input.durationMs ?? 2500,
  }

  toasts = [item, ...toasts].slice(0, 3)
  emit()

  const duration = item.durationMs ?? 2500
  if (duration > 0) setTimeout(() => dismissToast(id), duration)

  return { id, dismiss: () => dismissToast(id) }
}

export function useToast() {
  return { toast, dismiss: dismissToast }
}

export function useToastState() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}



