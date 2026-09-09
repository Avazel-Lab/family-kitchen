import type { Recipe } from '../types'
import { beefMixedBeanChilli } from './reviewed/beefMixedBeanChilli'

export const reviewedRecipes: Record<string, Recipe> = {
  [beefMixedBeanChilli.id]: beefMixedBeanChilli
}
