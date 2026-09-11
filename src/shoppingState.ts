export const SHOPPING_CHECKED_STORAGE_KEY = 'family-kitchen:shopping-checked:v1'

export function loadShoppingCheckedItems() {
  try {
    const raw = window.localStorage.getItem(SHOPPING_CHECKED_STORAGE_KEY)
    if (!raw) return new Set<string>()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set<string>()
    return new Set(parsed.filter((value): value is string => typeof value === 'string'))
  } catch {
    return new Set<string>()
  }
}

export function saveShoppingCheckedItems(checked: Set<string>) {
  try {
    window.localStorage.setItem(SHOPPING_CHECKED_STORAGE_KEY, JSON.stringify(Array.from(checked)))
  } catch {
    // Shopping remains usable for this session if browser storage is unavailable.
  }
}

export function clearShoppingCheckedItems() {
  try {
    window.localStorage.removeItem(SHOPPING_CHECKED_STORAGE_KEY)
  } catch {
    // Nothing else to do when browser storage is unavailable.
  }
}
