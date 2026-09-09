export type RecipeVariation = {
  title: string
  text?: string
  steps?: string[]
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
  householdUse: string
  freezer: string
  equipment: string[]
  packNotes: string[]
  ingredients: string[]
  quickSteps: string[]
  method: string[]
  variations: RecipeVariation[]
  familyNotes?: string[]
}
