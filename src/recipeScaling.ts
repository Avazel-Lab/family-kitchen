import type { IngredientAlternative, RecipeIngredient } from './types'

type IngredientAmount = IngredientAlternative | RecipeIngredient

export function scaleIngredientQuantity(
  ingredient: IngredientAmount,
  portions: number,
  recipeBasePortions: number
) {
  if (ingredient.quantity === undefined) return undefined
  if (ingredient.scalable === false) return ingredient.quantity

  const quantityBase = ingredient.quantityForPortions ?? recipeBasePortions
  return ingredient.quantity * (portions / quantityBase)
}

export function formatIngredient(
  ingredient: RecipeIngredient,
  portions: number,
  recipeBasePortions: number
) {
  const quantity = scaleIngredientQuantity(ingredient, portions, recipeBasePortions)
  let text = formatIngredientAmount(ingredient, quantity)

  const purchaseText = quantity === undefined ? undefined : exactPurchaseUnitText(ingredient, quantity)
  if (purchaseText) text += ` (${purchaseText})`
  if (ingredient.note) text += `, ${ingredient.note}`

  if (ingredient.alternatives?.length) {
    const alternatives = ingredient.alternatives.map((alternative) => {
      const alternativeQuantity = scaleIngredientQuantity(alternative, portions, recipeBasePortions)
      let alternativeText = formatIngredientAmount(alternative, alternativeQuantity)
      if (alternative.note) alternativeText += `, ${alternative.note}`
      return alternativeText
    })
    text += ` (or ${alternatives.join(' or ')})`
  }

  return text
}

export function ingredientSearchTerms(ingredient: RecipeIngredient) {
  return [
    ingredient.id,
    ingredient.name,
    ingredient.pluralName ?? '',
    ...(ingredient.alternatives ?? []).flatMap((alternative) => [
      alternative.id,
      alternative.name,
      alternative.pluralName ?? ''
    ])
  ]
}

export function formatPortionCount(value: number) {
  return formatQuarterNumber(value)
}

export function pluralisePurchaseLabel(label: string) {
  if (/(s|x|z|ch|sh)$/i.test(label)) return `${label}es`
  if (/[^aeiou]y$/i.test(label)) return `${label.slice(0, -1)}ies`
  return `${label}s`
}

function formatIngredientAmount(ingredient: IngredientAmount, quantity?: number) {
  if (quantity === undefined) return ingredient.name

  if (ingredient.unit === 'count') {
    const displayName = approximatelyOne(quantity)
      ? ingredient.name
      : (ingredient.pluralName ?? ingredient.name)
    return `${formatQuarterNumber(quantity)} ${displayName}`
  }

  const amount = formatMeasuredQuantity(quantity, ingredient.unit)
  return ingredient.name ? `${amount} ${ingredient.name}` : amount
}

function exactPurchaseUnitText(ingredient: IngredientAmount, quantity: number) {
  const purchaseUnit = ingredient.purchaseUnit
  if (!purchaseUnit || purchaseUnit.unit !== ingredient.unit || purchaseUnit.quantity <= 0) return undefined

  const units = quantity / purchaseUnit.quantity
  const roundedUnits = Math.round(units)
  if (roundedUnits < 1 || Math.abs(units - roundedUnits) > 0.001) return undefined

  const label = roundedUnits === 1 ? purchaseUnit.label : pluralisePurchaseLabel(purchaseUnit.label)
  return `${roundedUnits} × ${formatMeasuredQuantity(purchaseUnit.quantity, purchaseUnit.unit)} ${label}`
}

function formatMeasuredQuantity(value: number, unit?: string) {
  if (!unit) return formatDecimal(value, 2)

  if (unit === 'g' && value >= 1000) return `${formatDecimal(value / 1000, 2)} kg`
  if (unit === 'ml' && value >= 1000) return `${formatDecimal(value / 1000, 2)} l`

  if (unit === 'g' || unit === 'ml') {
    const decimals = value < 10 ? 1 : value < 100 ? 1 : 0
    return `${formatDecimal(value, decimals)} ${unit}`
  }

  if (unit === 'tsp' || unit === 'tbsp') {
    return `${formatQuarterNumber(value)} ${unit}`
  }

  return `${formatDecimal(value, 2)} ${unit}`
}

function formatQuarterNumber(value: number) {
  const rounded = Math.round(value * 4) / 4
  const whole = Math.floor(rounded + 0.0001)
  const fraction = Math.round((rounded - whole) * 4)
  const fractions: Record<number, string> = { 1: '¼', 2: '½', 3: '¾' }

  if (fraction === 0) return String(whole)
  if (whole === 0) return fractions[fraction]
  return `${whole}${fractions[fraction]}`
}

function formatDecimal(value: number, maximumFractionDigits: number) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits }).format(value)
}

function approximatelyOne(value: number) {
  return Math.abs(value - 1) < 0.001
}
