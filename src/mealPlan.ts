import type { MealPlanItem } from './types'

const STORAGE_KEY = 'family-kitchen:meal-plan:v1'
const LEGACY_OPTIONS_STORAGE_KEY = 'family-kitchen:plan-options:v1'
const LEGACY_INGREDIENT_CHOICES_STORAGE_KEY = 'family-kitchen:ingredient-choices:v1'
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

    const legacyOptions = loadStringMap(LEGACY_OPTIONS_STORAGE_KEY)
    const legacyIngredientChoices = loadNestedStringMap(LEGACY_INGREDIENT_CHOICES_STORAGE_KEY)
    const deduplicated: MealPlanItem[] = []

    for (const value of parsed) {
      if (!isMealPlanItem(value)) continue

      const item: MealPlanItem = {
        recipeId: value.recipeId,
        portions: normalisePlanPortions(value.portions)
      }

      const variationId = typeof value.variationId === 'string' && value.variationId
        ? value.variationId
        : legacyOptions[value.recipeId]
      if (variationId) item.variationId = variationId

      const ingredientChoices = normaliseIngredientChoices(value.ingredientChoices)
        ?? legacyIngredientChoices[value.recipeId]
      if (ingredientChoices && Object.keys(ingredientChoices).length > 0) {
        item.ingredientChoices = ingredientChoices
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
    window.localStorage.removeItem(LEGACY_OPTIONS_STORAGE_KEY)
    window.localStorage.removeItem(LEGACY_INGREDIENT_CHOICES_STORAGE_KEY)
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

function loadStringMap(key: string) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return {} as Record<string, string>
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {} as Record<string, string>

    const result: Record<string, string> = {}
    for (const [entryKey, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === 'string' && value) result[entryKey] = value
    }
    return result
  } catch {
    return {} as Record<string, string>
  }
}

function loadNestedStringMap(key: string) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return {} as Record<string, Record<string, string>>
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {} as Record<string, Record<string, string>>
    }

    const result: Record<string, Record<string, string>> = {}
    for (const [entryKey, value] of Object.entries(parsed as Record<string, unknown>)) {
      const choices = normaliseIngredientChoices(value)
      if (choices && Object.keys(choices).length > 0) result[entryKey] = choices
    }
    return result
  } catch {
    return {} as Record<string, Record<string, string>>
  }
}

function normaliseIngredientChoices(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined

  const result: Record<string, string> = {}
  for (const [ingredientId, alternativeId] of Object.entries(value as Record<string, unknown>)) {
    if (typeof alternativeId === 'string' && alternativeId) result[ingredientId] = alternativeId
  }
  return result
}
