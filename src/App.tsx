import { useEffect, useMemo, useState } from 'react'
import { recipes } from './data/recipes'
import type { Recipe } from './types'

function routeFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const [section, id] = hash.split('/')
  return section === 'recipe' && id ? { section: 'recipe', id } : { section: 'home', id: '' }
}

function App() {
  const [route, setRoute] = useState(routeFromHash)

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selected = route.section === 'recipe' ? recipes.find((recipe) => recipe.id === route.id) : undefined

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#/" aria-label="Family Kitchen home">
          <span className="brand-mark">FK</span>
          <span>
            <strong>Family Kitchen</strong>
            <small>Simple food. Less waste.</small>
          </span>
        </a>
      </header>
      <main>{selected ? <RecipePage recipe={selected} /> : <RecipeList />}</main>
    </div>
  )
}

function RecipeList() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const filters = useMemo(() => {
    const categories = Array.from(new Set(recipes.map((recipe) => recipe.category))).sort()
    return ['All', ...categories, 'Summer', 'Winter']
  }, [])

  const visibleRecipes = useMemo(() => {
    const normalised = query.trim().toLowerCase()
    return recipes.filter((recipe) => {
      const matchesFilter =
        filter === 'All' ||
        recipe.category === filter ||
        (filter === 'Summer' && recipe.season === 'summer') ||
        (filter === 'Winter' && recipe.season === 'winter')

      if (!matchesFilter) return false
      if (!normalised) return true

      return [recipe.title, recipe.summary, recipe.category, ...recipe.tags]
        .join(' ')
        .toLowerCase()
        .includes(normalised)
    })
  }, [filter, query])

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Family recipes</p>
        <h1>What are we eating?</h1>
        <p>Quick prompts when you know what you are doing, full instructions when you do not.</p>
      </section>

      <section className="controls" aria-label="Recipe search and filters">
        <label className="search-box">
          <span className="sr-only">Search recipes</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recipes, ingredients or tags"
          />
        </label>
        <div className="filter-row">
          {filters.map((item) => (
            <button
              className={filter === item ? 'filter-chip active' : 'filter-chip'}
              type="button"
              key={item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="recipe-grid" aria-live="polite">
        {visibleRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
        {visibleRecipes.length === 0 && <p className="empty-state">No recipes match that search.</p>}
      </section>
    </>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <a className="recipe-card" href={`#/recipe/${recipe.id}`}>
      <div className="card-topline">
        <span className="category-pill">{recipe.category}</span>
        {recipe.season && recipe.season !== 'all-year' && <span className="season-pill">{recipe.season}</span>}
      </div>
      <h2>{recipe.title}</h2>
      <p>{recipe.summary}</p>
      <div className="card-meta">
        <span>{recipe.prepMinutes + recipe.cookMinutes} min</span>
        <span>{recipe.makes}</span>
      </div>
    </a>
  )
}

function RecipePage({ recipe }: { recipe: Recipe }) {
  const [shareText, setShareText] = useState('Share')

  async function shareRecipe() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: recipe.title, text: `Family Kitchen: ${recipe.title}`, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShareText('Link copied')
        window.setTimeout(() => setShareText('Share'), 1800)
      }
    } catch {
      // Closing the native share sheet should not show an error.
    }
  }

  return (
    <article className="recipe-page">
      <div className="recipe-actions">
        <a className="back-link" href="#/">← Recipes</a>
        <button className="share-button" type="button" onClick={shareRecipe}>{shareText}</button>
      </div>

      <header className="recipe-header">
        <div className="card-topline">
          <span className="category-pill">{recipe.category}</span>
          {recipe.season && recipe.season !== 'all-year' && <span className="season-pill">{recipe.season}</span>}
        </div>
        <h1>{recipe.title}</h1>
        <p>{recipe.summary}</p>
        <div className="recipe-stats">
          <Stat label="Prep" value={`${recipe.prepMinutes} min`} />
          <Stat label="Cook" value={`${recipe.cookMinutes} min`} />
          <Stat label="Makes" value={recipe.makes} />
          <Stat label="Freezer" value={recipe.freezer.split('.')[0]} />
        </div>
      </header>

      <section className="quick-panel">
        <p className="eyebrow">Quick steps</p>
        <ol>
          {recipe.quickSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="recipe-section household-note">
        <h2>Household use</h2>
        <p>{recipe.householdUse}</p>
      </section>

      <section className="recipe-section">
        <h2>Ingredients</h2>
        <ul className="ingredient-list">
          {recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
        </ul>
      </section>

      <section className="recipe-section">
        <h2>Method</h2>
        <ol className="method-list">
          {recipe.method.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="recipe-section">
        <h2>Pack-size notes</h2>
        <ul>
          {recipe.packNotes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </section>

      {recipe.variations.length > 0 && (
        <section className="recipe-section">
          <h2>Variations</h2>
          <div className="variation-grid">
            {recipe.variations.map((variation) => (
              <div className="variation-card" key={variation.title}>
                <h3>{variation.title}</h3>
                <p>{variation.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {recipe.familyNotes && recipe.familyNotes.length > 0 && (
        <section className="recipe-section">
          <h2>Family notes</h2>
          <ul>{recipe.familyNotes.map((note) => <li key={note}>{note}</li>)}</ul>
        </section>
      )}

      <section className="recipe-section compact-details">
        <h2>Useful details</h2>
        <p><strong>Equipment:</strong> {recipe.equipment.join(', ')}</p>
        <p><strong>Freezer:</strong> {recipe.freezer}</p>
      </section>
    </article>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default App
