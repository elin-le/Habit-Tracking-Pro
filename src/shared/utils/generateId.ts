// src/shared/utils/generateId.ts
export function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // fallback cho insecure context (HTTP local network)
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
