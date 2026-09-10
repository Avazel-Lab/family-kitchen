import { activeIngredientsForPlan } from './planOptions'
import { scaleIngredientQuantity } from './recipeScaling'
import type { MealPlanItem, PurchaseUnit, Recipe, RecipeIngredient } from './types'

export type ShoppingCategory =
  | 'Produce'
  | 'Meat & fish'
  | 'Dairy'
  | 'Frozen'
  | 'Tins & jars'
  | 'Dry store & seasonings'
  | 'Other'

export type ShoppingListItem = {
  id: string
  name: string
  pluralName?: string
  quantity?: number
  unit?: string
  purchaseUnit?: PurchaseUnit
  category: ShoppingCategory
  stateKey: string
}

export const shoppingCategoryOrder: ShoppingCategory[] = [
  'Produce',
  'Meat & fish',
  'Dairy',
  'Frozen',
  'Tins & jars',
  'Dry store & seasonings',
  'Other'
]

export function buildShoppingList(plan: MealPlanItem[], recipes: Recipe[]): ShoppingListItem[] {
  const combined = new Map<string, Omit<ShoppingListItem, 'category' | 'stateKey'>>()

  for (const planned of plan) {
    const recipe = recipes.find((candidate) => candidate.id === planned.recipeId)
    if (!recipe) continue

    for (const ingredient of activeIngredientsForPlan(recipe, planned)) {
      if (!shouldIncludeInShoppingList(ingredient)) continue

      const quantity = scaleIngredientQuantity(ingredient, planned.portions, recipe.basePortions)
      const key = `${ingredient.id}::${ingredient.unit ?? 'unquantified'}`
      const existing = combined.get(key)

      if (existing) {
        if (quantity !== undefined) existing.quantity = (existing.quantity ?? 0) + quantity
        continue
      }

      combined.set(key, {
        id: ingredient.id,
        name: ingredient.name,
        pluralName: ingredient.pluralName,
        quantity,
        unit: ingredient.unit,
        purchaseUnit: ingredient.purchaseUnit
      })
    }
  }

  return Array.from(combined.values())
    .map((item) => {
      const category = shoppingCategoryFor(item)
      return {
        ...item,
        category,
        stateKey: shoppingStateKey(item)
      }
    })
    .sort((a, b) => {
      const categoryDifference = shoppingCategoryOrder.indexOf(a.category) - shoppingCategoryOrder.indexOf(b.category)
      return categoryDifference || shoppingDisplayName(a).localeCompare(shoppingDisplayName(b), 'en-GB')
    })
}

export function shoppingDisplayName(item: ShoppingListItem) {
  if (item.unit === 'count' && item.quantity !== undefined) {
    const rounded = roundQuarter(item.quantity)
    if (rounded > 1 && item.pluralName) return item.pluralName
  }
  return item.name
}

export function formatShoppingAmount(item: ShoppingListItem) {
  const quantity = item.quantity
  if (quantity === undefined) return 'as needed'

  const purchaseUnit = item.purchaseUnit
  if (
    purchaseUnit &&
    purchaseUnit.quantity > 0 &&
    purchaseUnit.unit === item.unit
  ) {
    const unitsToBuy = Math.max(1, Math.ceil((quantity - 0.000001) / purchaseUnit.quantity))
    const label = unitsToBuy === 1 ? purchaseUnit.label : `${purchaseUnit.label}s`
    const purchaseText = `${unitsToBuy} × ${formatMeasuredQuantity(purchaseUnit.quantity, purchaseUnit.unit)} ${label}`
    const purchasedQuantity = unitsToBuy * purchaseUnit.quantity

    if (Math.abs(purchasedQuantity - quantity) < 0.001) return purchaseText
    return `${purchaseText} (${formatMeasuredQuantity(quantity, item.unit)} required)`
  }

  if (item.unit === 'count') {
    const required = roundQuarter(quantity)
    const buy = Math.max(1, Math.ceil(required - 0.000001))
    if (Math.abs(required - buy) < 0.001) return String(buy)
    return `${buy} (${formatQuarterNumber(required)} required)`
  }

  return formatMeasuredQuantity(quantity, item.unit)
}

export function formatShoppingLine(item: ShoppingListItem) {
  return `${shoppingDisplayName(item)} — ${formatShoppingAmount(item)}`
}

function shouldIncludeInShoppingList(ingredient: RecipeIngredient) {
  if (ingredient.quantity === undefined) return true

  const id = ingredient.id.toLowerCase()
  const name = ingredient.name.toLowerCase()

  // Plain water and water/stock choices do not require a purchase because water is a valid recipe option.
  if (id === 'water' || name === 'water') return false
  if ((id.includes('stock-or-water') || id.includes('water-or-stock')) && name.includes('water')) return false

  return true
}

function shoppingCategoryFor(item: Omit<ShoppingListItem, 'category' | 'stateKey'>): ShoppingCategory {
  const id = item.id.toLowerCase()
  const name = item.name.toLowerCase()
  const text = `${id} ${name}`

  if (id.startsWith('frozen-') || name.startsWith('frozen ')) return 'Frozen'
  if (item.purchaseUnit && /^(tin|jar)$/i.test(item.purchaseUnit.label)) return 'Tins & jars'

  if (/(beef|chicken|sausage|salmon|white-fish|fish-fillet|fish portion|stewing-beef)/.test(text)) return 'Meat & fish'
  if (/(onion|pepper|carrot|potato|garlic|lemon|lime|mushroom)/.test(text)) return 'Produce'
  if (/(yoghurt|yogurt|sour-cream|sour cream|cheddar|mozzarella|cheese|milk|butter)/.test(text)) return 'Dairy'
  if (/(flour|rice|pasta|spaghetti|wrap|tortilla|suet|stock|tomato-puree|tomato purée|worcestershire|oil|paprika|cumin|coriander|oregano|thyme|rosemary|turmeric|curry|chilli|yeast|salt|pepper|herb|spice|garam|seasoning|lentil|bean)/.test(text)) {
    return 'Dry store & seasonings'
  }

  return 'Other'
}

function shoppingStateKey(item: Omit<ShoppingListItem, 'category' | 'stateKey'>) {
  const quantity = item.quantity === undefined ? 'none' : item.quantity.toFixed(4)
  const purchase = item.purchaseUnit
    ? `${item.purchaseUnit.quantity}:${item.purchaseUnit.unit}:${item.purchaseUnit.label}`
    : 'none'
  return `${item.id}|${item.unit ?? 'none'}|${quantity}|${purchase}`
}

function formatMeasuredQuantity(value: number, unit?: string) {
  if (!unit) return formatDecimal(value, 2)
  if (unit === 'count') return formatQuarterNumber(value)
  if (unit === 'g' && value >= 1000) return `${formatDecimal(value / 1000, 2)} kg`
  if (unit === 'ml' && value >= 1000) return `${formatDecimal(value / 1000, 2)} l`
  if (unit === 'g' || unit === 'ml') return `${formatDecimal(value, value < 100 ? 1 : 0)} ${unit}`
  if (unit === 'tsp' || unit === 'tbsp') return `${formatQuarterNumber(value)} ${unit}`
  return `${formatDecimal(value, 2)} ${unit}`
}

function formatQuarterNumber(value: number) {
  const rounded = roundQuarter(value)
  const whole = Math.floor(rounded + 0.0001)
  const fraction = Math.round((rounded - whole) * 4)
  const fractions: Record<number, string> = { 1: '¼', 2: '½', 3: '¾' }

  if (fraction === 0) return String(whole)
  if (whole === 0) return fractions[fraction]
  return `${whole}${fractions[fraction]}`
}

function roundQuarter(value: number) {
  return Math.round(value * 4) / 4
}

function formatDecimal(value: number, maximumFractionDigits: number) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits }).format(value)
}
