import type { MealPlanItem } from './types'

const STORAGE_KEY = 'family-kitchen:meal-plan:v1'
const PORTION_STEP = 0.5

export function normalisePlanPortions(value: number) {
  if (!Number.isFinite(value)) return PORTION_STEP
  return Math.max(PORTION_STEP, Math.round(value / PORTION_STEP) * PORTION_STEP)
}

export function loadMealPlan(): MealPlanItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const deduplicated: MealPlanItem[] = []

    for (const value of parsed) {
      if (!isMealPlanItem(value)) continue

      const item: MealPlanItem = {
        recipeId: value.recipeId,
        portions: normalisePlanPortions(value.portions)
      }
      const existingIndex = deduplicated.findIndex((current) => current.recipeId === item.recipeId)

      if (existingIndex >= 0) {
        deduplicated[existingIndex] = item
      } else {
        deduplicated.push(item)
      }
    }

    return deduplicated
  } catch {
    return []
  }
}

export function saveMealPlan(plan: MealPlanItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
  } catch {
    // The plan remains usable for this session if browser storage is unavailable.
  }
}

export function recipePlanHref(recipeId: string, portions: number) {
  return `#/recipe/${encodeURIComponent(recipeId)}?portions=${encodeURIComponent(String(normalisePlanPortions(portions)))}`
}

function isMealPlanItem(value: unknown): value is MealPlanItem {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.recipeId === 'string' &&
    candidate.recipeId.length > 0 &&
    typeof candidate.portions === 'number' &&
    Number.isFinite(candidate.portions) &&
    candidate.portions > 0
  )
}
