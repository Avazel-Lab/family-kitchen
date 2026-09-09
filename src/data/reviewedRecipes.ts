import type { Recipe } from '../types'
import { beefMixedBeanChilli } from './reviewed/beefMixedBeanChilli'
import { mildFamilyChickenCurry } from './reviewed/mildFamilyChickenCurry'
import { lentilSpaghettiBolognese } from './reviewed/lentilSpaghettiBolognese'
import { salmonPotatoesBroccoli } from './reviewed/salmonPotatoesBroccoli'
import { chickenBeanBurritos } from './reviewed/chickenBeanBurritos'
import { greekChickenPotatoes } from './reviewed/greekChickenPotatoes'
import { beefLentilKeema } from './reviewed/beefLentilKeema'
import { pestoWholemealPastaBake } from './reviewed/pestoWholemealPastaBake'
import { beefStewDumplings } from './reviewed/beefStewDumplings'
import { tunaWholemealPastaBake } from './reviewed/tunaWholemealPastaBake'

export const reviewedRecipes: Record<string, Recipe> = {
  [beefMixedBeanChilli.id]: beefMixedBeanChilli,
  [mildFamilyChickenCurry.id]: mildFamilyChickenCurry,
  [lentilSpaghettiBolognese.id]: lentilSpaghettiBolognese,
  [salmonPotatoesBroccoli.id]: salmonPotatoesBroccoli,
  [chickenBeanBurritos.id]: chickenBeanBurritos,
  [greekChickenPotatoes.id]: greekChickenPotatoes,
  [beefLentilKeema.id]: beefLentilKeema,
  [pestoWholemealPastaBake.id]: pestoWholemealPastaBake,
  [beefStewDumplings.id]: beefStewDumplings,
  [tunaWholemealPastaBake.id]: tunaWholemealPastaBake
}
