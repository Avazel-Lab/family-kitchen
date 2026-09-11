import { useEffect, useState } from 'react'
import Header from './components/Header'
import { recipes } from './data/recipes'
import { loadMealPlan, normalisePlanPortions, saveMealPlan } from './mealPlan'
import PlanPage from './pages/PlanPage'
import RecipeListPage from './pages/RecipeListPage'
import RecipePage from './pages/RecipePage'
import ShoppingPage from './ShoppingPage'
import { clearShoppingCheckedItems } from './shoppingState'
import type { MealPlanItem } from './types'

type Route = {
  section: 'home' | 'recipe' | 'plan' | 'shopping'
  id?: string
  portions?: number
  configured?: boolean
  variationId?: string
  ingredientChoices?: Record<string, string>
}

function routeFromHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const [path, query = ''] = hash.split('?')
  if (path === 'plan') return { section: 'plan' }
  if (path === 'shopping') return { section: 'shopping' }

  const [section, rawId] = path.split('/')
  if (section === 'recipe' && rawId) {
    const params = new URLSearchParams(query)
    const parsedPortions = Number(params.get('portions'))
    const ingredientChoices: Record<string, string> = {}
    for (const [key, value] of params.entries()) {
      if (key.startsWith('choice.') && value) ingredientChoices[key.slice(7)] = value
    }
    return {
      section: 'recipe',
      id: decodeURIComponent(rawId),
      portions: Number.isFinite(parsedPortions) && parsedPortions > 0 ? normalisePlanPortions(parsedPortions) : undefined,
      configured: params.get('configured') === '1',
      variationId: params.get('variation') || undefined,
      ingredientChoices: Object.keys(ingredientChoices).length ? ingredientChoices : undefined
    }
  }

  return { section: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash)
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>(loadMealPlan)

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => { saveMealPlan(mealPlan) }, [mealPlan])

  const selected = route.section === 'recipe' && route.id ? recipes.find((recipe) => recipe.id === route.id) : undefined
  const savedPlanItem = selected ? mealPlan.find((item) => item.recipeId === selected.id) : undefined

  const configuredItem: MealPlanItem | undefined = selected && route.portions !== undefined && route.configured
    ? {
        recipeId: selected.id,
        portions: route.portions,
        ...(route.variationId ? { variationId: route.variationId } : {}),
        ...(route.ingredientChoices ? { ingredientChoices: route.ingredientChoices } : {})
      }
    : selected && route.portions !== undefined && savedPlanItem
      ? { ...savedPlanItem, portions: route.portions }
      : undefined

  useEffect(() => {
    if (selected) document.title = `${selected.title} · Family Kitchen`
    else if (route.section === 'plan') document.title = 'Cooking Plan · Family Kitchen'
    else if (route.section === 'shopping') document.title = 'Shopping List · Family Kitchen'
    else document.title = 'Recipes · Family Kitchen'
  }, [route.section, selected])

  function saveRecipeToPlan(item: MealPlanItem, replaceConfiguration = false) {
    const nextItem = { ...item, portions: normalisePlanPortions(item.portions) }
    setMealPlan((current) => {
      const existing = current.find((candidate) => candidate.recipeId === item.recipeId)
      if (!existing) return [...current, nextItem]
      return current.map((candidate) => candidate.recipeId === item.recipeId
        ? replaceConfiguration ? nextItem : { ...candidate, ...nextItem }
        : candidate)
    })
  }

  function updatePlanPortions(recipeId: string, portions: number) {
    const normalisedPortions = normalisePlanPortions(portions)
    setMealPlan((current) => current.map((item) => item.recipeId === recipeId ? { ...item, portions: normalisedPortions } : item))
  }

  function updatePlanVariation(recipeId: string, variationId: string) {
    setMealPlan((current) => current.map((item) => {
      if (item.recipeId !== recipeId) return item
      const next = { ...item }
      if (variationId) next.variationId = variationId
      else delete next.variationId
      return next
    }))
  }

  function updatePlanIngredientChoice(recipeId: string, ingredientId: string, alternativeId: string) {
    setMealPlan((current) => current.map((item) => {
      if (item.recipeId !== recipeId) return item
      const choices = { ...(item.ingredientChoices ?? {}) }
      if (alternativeId) choices[ingredientId] = alternativeId
      else delete choices[ingredientId]
      const next = { ...item }
      if (Object.keys(choices).length > 0) next.ingredientChoices = choices
      else delete next.ingredientChoices
      return next
    }))
  }

  function removeFromPlan(recipeId: string) {
    setMealPlan((current) => current.filter((item) => item.recipeId !== recipeId))
  }

  function clearPlan() {
    clearShoppingCheckedItems()
    setMealPlan([])
  }

  let page
  if (route.section === 'shopping') page = <ShoppingPage plan={mealPlan} />
  else if (route.section === 'plan') {
    page = <PlanPage plan={mealPlan} onChangePortions={updatePlanPortions} onChangeVariation={updatePlanVariation} onChangeIngredientChoice={updatePlanIngredientChoice} onRemove={removeFromPlan} onClear={clearPlan} />
  } else if (selected) {
    page = <RecipePage recipe={selected} key={`${selected.id}-${JSON.stringify(configuredItem ?? {})}`} configuredItem={configuredItem} savedPlanItem={savedPlanItem} onSaveToPlan={saveRecipeToPlan} />
  } else page = <RecipeListPage plan={mealPlan} />

  return (
    <div className="app-shell">
      <Header section={route.section} planCount={mealPlan.length} />
      <main>{page}</main>
    </div>
  )
}
