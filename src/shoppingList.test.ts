import { describe, expect, it } from 'vitest'
import { buildShoppingList, formatShoppingAmount } from './shoppingList'
import type { MealPlanItem, Recipe } from './types'

const baseRecipe: Omit<Recipe, 'id' | 'title' | 'ingredients' | 'variations'> = {
  summary: '',
  category: 'Test',
  tags: [],
  prepMinutes: 0,
  cookMinutes: 0,
  makes: '4 portions',
  basePortions: 4,
  householdUse: '',
  freezer: '',
  equipment: [],
  packNotes: [],
  quickSteps: [],
  method: []
}

function recipe(overrides: Pick<Recipe, 'id' | 'title' | 'ingredients' | 'variations'>): Recipe {
  return { ...baseRecipe, ...overrides }
}

describe('shopping list', () => {
  it('consolidates the same canonical ingredient across recipes', () => {
    const recipes = [
      recipe({
        id: 'one',
        title: 'One',
        ingredients: [{ id: 'beef-mince', name: 'beef mince', quantity: 500, unit: 'g' }],
        variations: []
      }),
      recipe({
        id: 'two',
        title: 'Two',
        ingredients: [{ id: 'beef-mince', name: 'beef mince', quantity: 300, unit: 'g' }],
        variations: []
      })
    ]
    const plan: MealPlanItem[] = [
      { recipeId: 'one', portions: 4 },
      { recipeId: 'two', portions: 4 }
    ]

    const items = buildShoppingList(plan, recipes)
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(800)
  })

  it('rounds fixed purchase units only after the required quantity is consolidated', () => {
    const recipes = [recipe({
      id: 'tomato',
      title: 'Tomato',
      ingredients: [{
        id: 'chopped-tomatoes',
        name: 'chopped tomatoes',
        quantity: 300,
        unit: 'g',
        purchaseUnit: { label: 'tin', quantity: 400, unit: 'g' }
      }],
      variations: []
    })]

    const [item] = buildShoppingList([{ recipeId: 'tomato', portions: 4 }], recipes)
    expect(formatShoppingAmount(item)).toBe('1 × 400 g tin (300 g required)')
  })

  it('replaces default ingredients when a planned variation is selected', () => {
    const recipes = [recipe({
      id: 'keema',
      title: 'Keema',
      ingredients: [{ id: 'lentils', name: 'tinned lentils', quantity: 400, unit: 'g' }],
      variations: [{
        id: 'dried-lentils',
        title: 'Dried lentils',
        planningOption: true,
        replacesIngredientIds: ['lentils'],
        ingredients: [{ id: 'dried-lentils', name: 'dried lentils', quantity: 100, unit: 'g' }]
      }]
    })]

    const items = buildShoppingList([{ recipeId: 'keema', portions: 4, variationId: 'dried-lentils' }], recipes)
    expect(items.map((item) => item.id)).toEqual(['dried-lentils'])
  })

  it('uses and consolidates a selected microwave-rice alternative', () => {
    const rice = {
      id: 'rice',
      name: 'dry rice',
      quantity: 240,
      unit: 'g',
      shoppingChoice: true,
      alternatives: [{
        id: 'microwave-rice',
        name: 'microwave rice',
        quantity: 500,
        unit: 'g',
        purchaseUnit: { label: 'pouch', quantity: 250, unit: 'g' }
      }]
    }
    const recipes = [
      recipe({ id: 'a', title: 'A', ingredients: [rice], variations: [] }),
      recipe({ id: 'b', title: 'B', ingredients: [rice], variations: [] })
    ]
    const plan: MealPlanItem[] = [
      { recipeId: 'a', portions: 2, ingredientChoices: { rice: 'microwave-rice' } },
      { recipeId: 'b', portions: 2, ingredientChoices: { rice: 'microwave-rice' } }
    ]

    const [item] = buildShoppingList(plan, recipes)
    expect(item.id).toBe('microwave-rice')
    expect(item.quantity).toBe(500)
    expect(formatShoppingAmount(item)).toBe('2 × 250 g pouches')
  })
})
