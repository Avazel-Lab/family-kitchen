import { describe, expect, it } from 'vitest'
import { recipes } from './data/recipes'
import { activeMethodForPlan, activeQuickStepsForPlan } from './planOptions'
import { buildShoppingList } from './shoppingList'
import type { MealPlanItem } from './types'

describe('Recipes → Plan → Shopping → Cook workflow', () => {
  it('carries real planned choices through shopping and cooking instructions', () => {
    const plan: MealPlanItem[] = [
      { recipeId: 'beef-mixed-bean-chilli', portions: 3, variationId: 'dried-beans', ingredientChoices: { rice: 'microwave-rice' } },
      { recipeId: 'tuna-wholemeal-pasta-bake', portions: 4, variationId: 'bechamel' }
    ]

    const shopping = buildShoppingList(plan, recipes)
    const ids = shopping.map((item) => item.id)
    expect(ids).toContain('dried-mixed-beans')
    expect(ids).not.toContain('mixed-beans')
    expect(ids).toContain('microwave-rice')
    expect(ids).toContain('milk')
    expect(ids).not.toContain('water')

    const chilli = recipes.find((recipe) => recipe.id === 'beef-mixed-bean-chilli')!
    expect(activeQuickStepsForPlan(chilli, plan[0])[0]).toMatch(/soak/i)
    expect(activeMethodForPlan(chilli, plan[0]).join(' ')).toMatch(/completely tender/i)

    const tuna = recipes.find((recipe) => recipe.id === 'tuna-wholemeal-pasta-bake')!
    expect(activeQuickStepsForPlan(tuna, plan[1]).join(' ')).toMatch(/béchamel/i)
    expect(activeMethodForPlan(tuna, plan[1]).join(' ')).toMatch(/whisk in the milk/i)
  })
})
