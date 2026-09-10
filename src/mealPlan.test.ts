import { beforeEach, describe, expect, it, vi } from 'vitest'
import { loadMealPlan, normalisePlanPortions, saveMealPlan } from './mealPlan'

class MemoryStorage {
  private values = new Map<string, string>()

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }

  removeItem(key: string) {
    this.values.delete(key)
  }

  clear() {
    this.values.clear()
  }
}

const storage = new MemoryStorage()

beforeEach(() => {
  storage.clear()
  vi.stubGlobal('window', { localStorage: storage })
})

describe('meal plan', () => {
  it('normalises portions to half-portion increments', () => {
    expect(normalisePlanPortions(3.26)).toBe(3.5)
    expect(normalisePlanPortions(0)).toBe(0.5)
  })

  it('migrates legacy variation and ingredient choices into plan entries', () => {
    storage.setItem('family-kitchen:meal-plan:v1', JSON.stringify([
      { recipeId: 'keema', portions: 4 }
    ]))
    storage.setItem('family-kitchen:plan-options:v1', JSON.stringify({ keema: 'dried-lentils' }))
    storage.setItem('family-kitchen:ingredient-choices:v1', JSON.stringify({
      keema: { rice: 'microwave-rice' }
    }))

    expect(loadMealPlan()).toEqual([{
      recipeId: 'keema',
      portions: 4,
      variationId: 'dried-lentils',
      ingredientChoices: { rice: 'microwave-rice' }
    }])
  })

  it('persists the complete plan item and removes legacy option stores', () => {
    storage.setItem('family-kitchen:plan-options:v1', '{}')
    storage.setItem('family-kitchen:ingredient-choices:v1', '{}')

    const plan = [{
      recipeId: 'keema',
      portions: 3.5,
      variationId: 'dried-lentils',
      ingredientChoices: { rice: 'microwave-rice' }
    }]
    saveMealPlan(plan)

    expect(JSON.parse(storage.getItem('family-kitchen:meal-plan:v1')!)).toEqual(plan)
    expect(storage.getItem('family-kitchen:plan-options:v1')).toBeNull()
    expect(storage.getItem('family-kitchen:ingredient-choices:v1')).toBeNull()
  })
})
