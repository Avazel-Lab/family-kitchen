import { useEffect, useMemo, useState } from 'react'
import InstallApp from '../components/InstallApp'
import { recipes } from '../data/recipes'
import { formatPortionCount, ingredientSearchTerms } from '../recipeScaling'
import type { MealPlanItem, Recipe } from '../types'

const QUERY_KEY = 'family-kitchen:recipes-query:v1'
const FILTER_KEY = 'family-kitchen:recipes-filter:v1'
const SCROLL_KEY = 'family-kitchen:recipes-scroll:v1'

export default function RecipeListPage({ plan }: { plan: MealPlanItem[] }) {
  const [query, setQuery] = useState(() => window.sessionStorage.getItem(QUERY_KEY) ?? '')
  const [filter, setFilter] = useState(() => window.sessionStorage.getItem(FILTER_KEY) ?? 'All')

  useEffect(() => { window.sessionStorage.setItem(QUERY_KEY, query) }, [query])
  useEffect(() => { window.sessionStorage.setItem(FILTER_KEY, filter) }, [filter])
  useEffect(() => {
    const saved = Number(window.sessionStorage.getItem(SCROLL_KEY) ?? '0')
    if (saved > 0) window.requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: 'instant' }))
  }, [])

  const filters = useMemo(() => ['All', ...Array.from(new Set(recipes.map((recipe) => recipe.category))).sort(), 'Summer', 'Winter'], [])
  const visibleRecipes = useMemo(() => {
    const normalised = query.trim().toLowerCase()
    return recipes.filter((recipe) => {
      const matchesFilter = filter === 'All' || recipe.category === filter || (filter === 'Summer' && recipe.season === 'summer') || (filter === 'Winter' && recipe.season === 'winter')
      if (!matchesFilter) return false
      if (!normalised) return true
      const ingredientTerms = [...recipe.ingredients.flatMap(ingredientSearchTerms), ...recipe.variations.flatMap((variation) => variation.ingredients?.flatMap(ingredientSearchTerms) ?? [])]
      return [recipe.title, recipe.summary, recipe.category, ...recipe.tags, ...ingredientTerms].join(' ').toLowerCase().includes(normalised)
    })
  }, [filter, query])

  return (
    <>
      <section className="hero"><p className="eyebrow">Family recipes</p><h1>What are we eating?</h1><p>Quick prompts when you know what you are doing, full instructions when you do not.</p></section>
      <InstallApp />
      <section className="controls" aria-label="Recipe search and filters">
        <label className="search-box"><span className="sr-only">Search recipes</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search recipes, ingredients or tags" /></label>
        <div className="filter-row">{filters.map((item) => <button className={filter === item ? 'filter-chip active' : 'filter-chip'} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      </section>
      <section className="recipe-grid" aria-live="polite">
        {visibleRecipes.map((recipe) => <RecipeCard recipe={recipe} planned={plan.find((item) => item.recipeId === recipe.id)} key={recipe.id} />)}
        {visibleRecipes.length === 0 && <p className="empty-state">No recipes match that search.</p>}
      </section>
    </>
  )
}

function RecipeCard({ recipe, planned }: { recipe: Recipe; planned?: MealPlanItem }) {
  function rememberPosition() { window.sessionStorage.setItem(SCROLL_KEY, String(window.scrollY)) }
  return (
    <a className="recipe-card" href={`#/recipe/${recipe.id}`} onClick={rememberPosition}>
      <div className="card-topline"><span className="category-pill">{recipe.category}</span>{recipe.season && recipe.season !== 'all-year' && <span className="season-pill">{recipe.season}</span>}{planned && <span className="planned-pill">Planned · {formatPortionCount(planned.portions)}</span>}</div>
      <h2>{recipe.title}</h2><p>{recipe.summary}</p>
      <div className="card-meta"><span>{recipe.elapsedTime ?? `${recipe.prepMinutes + recipe.cookMinutes} min`}</span><span>{recipe.makes}</span></div>
    </a>
  )
}
