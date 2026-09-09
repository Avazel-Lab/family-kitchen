import type { Recipe } from '../types'
import { beefMixedBeanChilli } from './reviewed/beefMixedBeanChilli'
import { mildFamilyChickenCurry } from './reviewed/mildFamilyChickenCurry'
import { lentilSpaghettiBolognese } from './reviewed/lentilSpaghettiBolognese'
import { salmonPotatoesBroccoli } from './reviewed/salmonPotatoesBroccoli'

export const reviewedRecipes: Record<string, Recipe> = {
  [beefMixedBeanChilli.id]: beefMixedBeanChilli,
  [mildFamilyChickenCurry.id]: mildFamilyChickenCurry,
  [lentilSpaghettiBolognese.id]: lentilSpaghettiBolognese,
  [salmonPotatoesBroccoli.id]: salmonPotatoesBroccoli
}
