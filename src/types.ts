export type PurchaseUnit = {
  label: string
  quantity: number
  unit: string
}

export type IngredientAlternative = {
  id: string
  name: string
  pluralName?: string
  quantity?: number
  unit?: string
  note?: string
  quantityForPortions?: number
  scalable?: boolean
  purchaseUnit?: PurchaseUnit
}

export type RecipeIngredient = IngredientAlternative & {
  alternatives?: IngredientAlternative[]
}

export type RecipeVariation = {
  title: string
  text?: string
  steps?: string[]
  ingredients?: RecipeIngredient[]
}

export type Recipe = {
  id: string
  title: string
  summary: string
  category: string
  season?: 'summer' | 'winter' | 'all-year'
  tags: string[]
  prepMinutes: number
  cookMinutes: number
  makes: string
  basePortions: number
  householdUse: string
  freezer: string
  equipment: string[]
  packNotes: string[]
  ingredients: RecipeIngredient[]
  quickSteps: string[]
  method: string[]
  variations: RecipeVariation[]
  familyNotes?: string[]
}

export type MealPlanItem = {
  recipeId: string
  portions: number
}
