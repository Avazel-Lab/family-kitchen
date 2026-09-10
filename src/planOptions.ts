import type { MealPlanItem, Recipe, RecipeIngredient, RecipeVariation } from './types'

export function planningVariations(recipe: Recipe) {
  return recipe.variations.filter((variation) => variation.planningOption && variation.id)
}

export function plannedVariation(recipe: Recipe, item?: MealPlanItem) {
  if (!item?.variationId) return undefined
  return planningVariations(recipe).find((variation) => variation.id === item.variationId)
}

export function shoppingChoiceIngredients(recipe: Recipe) {
  return recipe.ingredients.filter((ingredient) => ingredient.shoppingChoice && ingredient.alternatives?.length)
}

export function activeIngredientsForPlan(recipe: Recipe, item?: MealPlanItem): RecipeIngredient[] {
  const variation = plannedVariation(recipe, item)
  const replacedIngredientIds = new Set(variation?.replacesIngredientIds ?? [])
  const ingredients = [
    ...recipe.ingredients.filter((ingredient) => !replacedIngredientIds.has(ingredient.id)),
    ...(variation?.ingredients ?? [])
  ]

  return ingredients.map((ingredient) => selectedIngredientChoice(ingredient, item?.ingredientChoices))
}

export function selectedIngredientChoice(
  ingredient: RecipeIngredient,
  choices?: Record<string, string>
): RecipeIngredient {
  if (!ingredient.shoppingChoice) return ingredient

  const selectedAlternativeId = choices?.[ingredient.id]
  if (!selectedAlternativeId) return ingredient

  const alternative = ingredient.alternatives?.find((candidate) => candidate.id === selectedAlternativeId)
  return alternative ? { ...alternative } : ingredient
}

export function plannedChoiceSummary(recipe: Recipe, item?: MealPlanItem) {
  if (!item) return []

  const labels: string[] = []
  const variation = plannedVariation(recipe, item)
  if (variation) labels.push(variation.title)

  for (const ingredient of shoppingChoiceIngredients(recipe)) {
    const alternativeId = item.ingredientChoices?.[ingredient.id]
    const alternative = ingredient.alternatives?.find((candidate) => candidate.id === alternativeId)
    if (alternative) labels.push(alternative.name)
  }

  return labels
}

export function isPlanningVariation(variation: RecipeVariation) {
  return Boolean(variation.planningOption && variation.id)
}
