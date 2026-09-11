import { describe, expect, it } from 'vitest'
import { recipes } from './data/recipes'

function duplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index)
}

describe('recipe data integrity', () => {
  it('uses unique recipe ids and valid base portions', () => {
    expect(duplicates(recipes.map((recipe) => recipe.id))).toEqual([])
    for (const recipe of recipes) expect(recipe.basePortions).toBeGreaterThan(0)
  })

  it('keeps ingredient and alternative ids unambiguous within each recipe', () => {
    for (const recipe of recipes) {
      expect(duplicates(recipe.ingredients.map((ingredient) => ingredient.id)), recipe.title).toEqual([])
      for (const ingredient of recipe.ingredients) {
        expect(duplicates((ingredient.alternatives ?? []).map((alternative) => alternative.id)), `${recipe.title}: ${ingredient.id}`).toEqual([])
        if (ingredient.shoppingChoice) expect(ingredient.alternatives?.length ?? 0, `${recipe.title}: ${ingredient.id}`).toBeGreaterThan(0)
        if (ingredient.purchaseUnit) {
          expect(ingredient.purchaseUnit.quantity, `${recipe.title}: ${ingredient.id}`).toBeGreaterThan(0)
          expect(ingredient.purchaseUnit.unit, `${recipe.title}: ${ingredient.id}`).toBe(ingredient.unit)
        }
      }
    }
  })

  it('keeps selectable planning variations self-contained and valid', () => {
    for (const recipe of recipes) {
      const planning = recipe.variations.filter((variation) => variation.planningOption)
      expect(duplicates(planning.flatMap((variation) => variation.id ? [variation.id] : [])), recipe.title).toEqual([])
      for (const variation of planning) {
        expect(variation.id, `${recipe.title}: planning variation needs id`).toBeTruthy()
        expect(variation.quickSteps?.length ?? 0, `${recipe.title}: ${variation.title} quick steps`).toBeGreaterThan(0)
        expect(variation.method?.length ?? 0, `${recipe.title}: ${variation.title} method`).toBeGreaterThan(0)
        for (const replaced of variation.replacesIngredientIds ?? []) {
          expect(recipe.ingredients.some((ingredient) => ingredient.id === replaced), `${recipe.title}: ${variation.title} replaces ${replaced}`).toBe(true)
        }
      }
    }
  })
})
