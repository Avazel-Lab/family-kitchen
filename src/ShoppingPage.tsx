import { useEffect, useMemo, useState } from 'react'
import { recipes } from './data/recipes'
import {
  buildShoppingList,
  formatShoppingAmount,
  formatShoppingLine,
  shoppingCategoryOrder,
  shoppingDisplayName,
  type PlannedIngredientChoices,
  type PlannedRecipeOptions
} from './shoppingList'
import type { MealPlanItem, RecipeVariation } from './types'
import './shopping.css'

const CHECKED_STORAGE_KEY = 'family-kitchen:shopping-checked:v1'
const OPTIONS_STORAGE_KEY = 'family-kitchen:plan-options:v1'
const INGREDIENT_CHOICES_STORAGE_KEY = 'family-kitchen:ingredient-choices:v1'

export default function ShoppingPage({ plan }: { plan: MealPlanItem[] }) {
  const optionRecipes = useMemo(() => plan.flatMap((planned) => {
    const recipe = recipes.find((candidate) => candidate.id === planned.recipeId)
    if (!recipe) return []

    const options = recipe.variations.filter(isPlanningOption)
    return options.length > 0 ? [{ recipe, options }] : []
  }), [plan])

  const riceChoiceRecipes = useMemo(() => plan.flatMap((planned) => {
    const recipe = recipes.find((candidate) => candidate.id === planned.recipeId)
    if (!recipe) return []

    const choices = recipe.ingredients.filter((ingredient) => ingredient.shoppingChoice && ingredient.alternatives?.length)
    return choices.length > 0 ? [{ recipe, choices }] : []
  }), [plan])

  const [selectedOptions, setSelectedOptions] = useState<PlannedRecipeOptions>(loadSelectedOptions)
  const [ingredientChoices, setIngredientChoices] = useState<PlannedIngredientChoices>(loadIngredientChoices)
  const items = useMemo(
    () => buildShoppingList(plan, recipes, selectedOptions, ingredientChoices),
    [plan, selectedOptions, ingredientChoices]
  )
  const [checked, setChecked] = useState<Set<string>>(loadCheckedItems)
  const [copyStatus, setCopyStatus] = useState('Copy list')

  useEffect(() => {
    const validOptions = new Map(optionRecipes.map(({ recipe, options }) => [
      recipe.id,
      new Set(options.map((option) => option.id as string))
    ]))

    setSelectedOptions((current) => {
      const next: PlannedRecipeOptions = {}
      for (const [recipeId, optionId] of Object.entries(current)) {
        if (optionId && validOptions.get(recipeId)?.has(optionId)) next[recipeId] = optionId
      }
      return sameOptions(current, next) ? current : next
    })
  }, [optionRecipes])

  useEffect(() => {
    try {
      window.localStorage.setItem(OPTIONS_STORAGE_KEY, JSON.stringify(selectedOptions))
    } catch {
      // Options still work for this session if browser storage is unavailable.
    }
  }, [selectedOptions])

  useEffect(() => {
    try {
      window.localStorage.setItem(INGREDIENT_CHOICES_STORAGE_KEY, JSON.stringify(ingredientChoices))
    } catch {
      // Rice choices still work for this session if browser storage is unavailable.
    }
  }, [ingredientChoices])

  useEffect(() => {
    const validKeys = new Set(items.map((item) => item.stateKey))
    setChecked((current) => {
      const next = new Set(Array.from(current).filter((key) => validKeys.has(key)))
      if (sameSet(current, next)) return current
      return next
    })
  }, [items])

  useEffect(() => {
    try {
      window.localStorage.setItem(CHECKED_STORAGE_KEY, JSON.stringify(Array.from(checked)))
    } catch {
      // The checklist still works for this session if browser storage is unavailable.
    }
  }, [checked])

  const checkedCount = items.filter((item) => checked.has(item.stateKey)).length
  const groupedItems = shoppingCategoryOrder
    .map((category) => ({ category, items: items.filter((item) => item.category === category) }))
    .filter((group) => group.items.length > 0)

  function toggleItem(key: string) {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function clearTicks() {
    setChecked(new Set())
  }

  function selectOption(recipeId: string, optionId: string) {
    setSelectedOptions((current) => {
      const next = { ...current }
      if (optionId) next[recipeId] = optionId
      else delete next[recipeId]
      return next
    })
  }

  function selectIngredientChoice(recipeId: string, ingredientId: string, alternativeId: string) {
    setIngredientChoices((current) => {
      const next = { ...current }
      const recipeChoices = { ...(next[recipeId] ?? {}) }

      if (alternativeId) recipeChoices[ingredientId] = alternativeId
      else delete recipeChoices[ingredientId]

      if (Object.keys(recipeChoices).length > 0) next[recipeId] = recipeChoices
      else delete next[recipeId]

      return next
    })
  }

  async function copyList() {
    const text = items.map(formatShoppingLine).join('\n')
    if (!text) return

    try {
      await writeClipboardText(text)
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Copy failed')
    }

    window.setTimeout(() => setCopyStatus('Copy list'), 1800)
  }

  if (plan.length === 0) {
    return (
      <div className="shopping-page">
        <section className="shopping-hero">
          <p className="eyebrow">Shopping</p>
          <h1>Shopping list</h1>
          <p>The shopping list is generated from the recipes and portions in your cooking plan.</p>
        </section>
        <section className="shopping-empty">
          <h2>No cooking plan yet</h2>
          <p>Add recipes to the plan first, then their ingredients will be consolidated here.</p>
          <a href="#/plan">Go to cooking plan</a>
        </section>
      </div>
    )
  }

  return (
    <div className="shopping-page">
      <section className="shopping-hero">
        <p className="eyebrow">Shopping</p>
        <h1>Shopping list</h1>
        <p>
          Consolidated from {plan.length} {plan.length === 1 ? 'planned recipe' : 'planned recipes'}. Normal ingredients show the quantity required; fixed tins, jars and microwave-rice pouches are rounded up only where the recipe data says they are fixed units.
        </p>
      </section>

      <div className="shopping-toolbar">
        <div>
          <strong>{items.length} {items.length === 1 ? 'item' : 'items'}</strong>
          <span>{checkedCount} checked</span>
        </div>
        <div className="shopping-toolbar-actions">
          <button className="shopping-copy-button" type="button" onClick={copyList}>{copyStatus}</button>
          <a href="#/plan">Edit plan</a>
          {checkedCount > 0 && <button type="button" onClick={clearTicks}>Clear ticks</button>}
        </div>
      </div>

      {riceChoiceRecipes.length > 0 && (
        <section className="shopping-options" aria-label="Rice choices">
          <div className="shopping-options-heading">
            <strong>Rice choice</strong>
            <p>Dry rice is the default. Choose microwave rice for any planned meal and the shopping list will use 250 g cooked-rice pouches instead.</p>
          </div>
          <div className="shopping-option-list">
            {riceChoiceRecipes.flatMap(({ recipe, choices }) => choices.map((ingredient) => (
              <label className="shopping-option" key={`${recipe.id}-${ingredient.id}`}>
                <span>{recipe.title}</span>
                <select
                  value={ingredientChoices[recipe.id]?.[ingredient.id] ?? ''}
                  onChange={(event) => selectIngredientChoice(recipe.id, ingredient.id, event.target.value)}
                >
                  <option value="">{ingredient.name}</option>
                  {ingredient.alternatives?.map((alternative) => (
                    <option value={alternative.id} key={alternative.id}>{alternative.name}</option>
                  ))}
                </select>
              </label>
            )))}
          </div>
        </section>
      )}

      {optionRecipes.length > 0 && (
        <section className="shopping-options" aria-label="Planned recipe variations">
          <div className="shopping-options-heading">
            <strong>Meal options</strong>
            <p>Choose any ingredient-changing variation you plan to cook. These choices are saved locally and the shopping list updates immediately.</p>
          </div>
          <div className="shopping-option-list">
            {optionRecipes.map(({ recipe, options }) => (
              <label className="shopping-option" key={recipe.id}>
                <span>{recipe.title}</span>
                <select
                  value={selectedOptions[recipe.id] ?? ''}
                  onChange={(event) => selectOption(recipe.id, event.target.value)}
                >
                  <option value="">Standard recipe</option>
                  {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.title}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </section>
      )}

      <div className="shopping-guidance">
        <strong>How quantities work</strong>
        <p>
          For example, mince may simply show 1.3 kg. A fixed 400 g tin may show “1 × 400 g tin (300 g required)”, while microwave rice may show “2 × 250 g pouches (375 g required)”. “Copy list” copies one shopping item per line with no category headings for easy pasting into Google Keep.
        </p>
      </div>

      <div className="shopping-groups">
        {groupedItems.map((group) => (
          <section className="shopping-group" key={group.category}>
            <h2>{group.category}</h2>
            <div className="shopping-items">
              {group.items.map((item) => {
                const isChecked = checked.has(item.stateKey)
                return (
                  <label className={isChecked ? 'shopping-item checked' : 'shopping-item'} key={item.stateKey}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(item.stateKey)}
                    />
                    <span className="shopping-item-copy">
                      <strong>{shoppingDisplayName(item)}</strong>
                      <span>{formatShoppingAmount(item)}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="shopping-footer-note">
        This list follows the current cooking plan, rice choices and selected meal options. Changing a recipe, its portions or an option recalculates the quantities automatically; changed quantities return unchecked so they are not accidentally treated as already bought.
      </p>
    </div>
  )
}

function isPlanningOption(variation: RecipeVariation) {
  return Boolean(variation.planningOption && variation.id)
}

function loadSelectedOptions(): PlannedRecipeOptions {
  try {
    const raw = window.localStorage.getItem(OPTIONS_STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

    const result: PlannedRecipeOptions = {}
    for (const [recipeId, optionId] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof optionId === 'string' && optionId) result[recipeId] = optionId
    }
    return result
  } catch {
    return {}
  }
}

function loadIngredientChoices(): PlannedIngredientChoices {
  try {
    const raw = window.localStorage.getItem(INGREDIENT_CHOICES_STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

    const result: PlannedIngredientChoices = {}
    for (const [recipeId, rawChoices] of Object.entries(parsed as Record<string, unknown>)) {
      if (!rawChoices || typeof rawChoices !== 'object' || Array.isArray(rawChoices)) continue

      const recipeChoices: Record<string, string> = {}
      for (const [ingredientId, alternativeId] of Object.entries(rawChoices as Record<string, unknown>)) {
        if (typeof alternativeId === 'string' && alternativeId) recipeChoices[ingredientId] = alternativeId
      }
      if (Object.keys(recipeChoices).length > 0) result[recipeId] = recipeChoices
    }
    return result
  } catch {
    return {}
  }
}

function loadCheckedItems() {
  try {
    const raw = window.localStorage.getItem(CHECKED_STORAGE_KEY)
    if (!raw) return new Set<string>()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set<string>()
    return new Set(parsed.filter((value): value is string => typeof value === 'string'))
  } catch {
    return new Set<string>()
  }
}

async function writeClipboardText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('Clipboard copy failed')
}

function sameSet(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false
  for (const value of a) if (!b.has(value)) return false
  return true
}

function sameOptions(a: PlannedRecipeOptions, b: PlannedRecipeOptions) {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false
  return aKeys.every((key) => a[key] === b[key])
}
