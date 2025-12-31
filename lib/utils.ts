export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean }

export function cn(...inputs: ClassValue[]) {
  const out: string[] = []

  const walk = (x: ClassValue): void => {
    if (!x) return

    if (typeof x === "string" || typeof x === "number") {
      out.push(String(x))
      return
    }

    if (Array.isArray(x)) {
      for (const v of x) walk(v)
      return
    }

    if (typeof x === "object") {
      for (const [k, v] of Object.entries(x)) if (v) out.push(k)
    }
  }

  for (const i of inputs) walk(i)
  return out.join(" ")
}



