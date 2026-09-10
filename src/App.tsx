import { useEffect, useMemo, useState } from 'react'
import { recipes } from './data/recipes'
import { loadMealPlan, normalisePlanPortions, recipePlanHref, saveMealPlan } from './mealPlan'
import { formatIngredient, formatPortionCount, ingredientSearchTerms } from './recipeScaling'
import ShoppingPage from './ShoppingPage'
import type { MealPlanItem, Recipe } from './types'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type Route = {
  section: 'home' | 'recipe' | 'plan' | 'shopping'
  id?: string
  portions?: number
}

function routeFromHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const [path, query = ''] = hash.split('?')

  if (path === 'plan') return { section: 'plan' }
  if (path === 'shopping') return { section: 'shopping' }

  const [section, rawId] = path.split('/')
  if (section === 'recipe' && rawId) {
    const portionParam = new URLSearchParams(query).get('portions')
    const parsedPortions = portionParam === null ? undefined : Number(portionParam)
    return {
      section: 'recipe',
      id: decodeURIComponent(rawId),
      portions: parsedPortions && parsedPortions > 0 ? normalisePlanPortions(parsedPortions) : undefined
    }
  }

  return { section: 'home' }
}

function App() {
  const [route, setRoute] = useState(routeFromHash)
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>(loadMealPlan)

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    saveMealPlan(mealPlan)
  }, [mealPlan])

  const selected = route.section === 'recipe' && route.id
    ? recipes.find((recipe) => recipe.id === route.id)
    : undefined
  const selectedPlanItem = selected
    ? mealPlan.find((item) => item.recipeId === selected.id)
    : undefined

  function saveRecipeToPlan(recipeId: string, portions: number) {
    const normalisedPortions = normalisePlanPortions(portions)
    setMealPlan((current) => {
      const exists = current.some((item) => item.recipeId === recipeId)
      if (!exists) return [...current, { recipeId, portions: normalisedPortions }]
      return current.map((item) =>
        item.recipeId === recipeId ? { ...item, portions: normalisedPortions } : item
      )
    })
  }

  function updatePlanPortions(recipeId: string, portions: number) {
    const normalisedPortions = normalisePlanPortions(portions)
    setMealPlan((current) => current.map((item) =>
      item.recipeId === recipeId ? { ...item, portions: normalisedPortions } : item
    ))
  }

  function removeFromPlan(recipeId: string) {
    setMealPlan((current) => current.filter((item) => item.recipeId !== recipeId))
  }

  let page
  if (route.section === 'shopping') {
    page = <ShoppingPage plan={mealPlan} />
  } else if (route.section === 'plan') {
    page = (
      <PlanPage
        plan={mealPlan}
        onChangePortions={updatePlanPortions}
        onRemove={removeFromPlan}
        onClear={() => setMealPlan([])}
      />
    )
  } else if (selected) {
    const keyPortions = route.portions === undefined ? 'default' : route.portions
    page = (
      <RecipePage
        recipe={selected}
        key={`${selected.id}-${keyPortions}`}
        initialPortions={route.portions}
        plannedPortions={selectedPlanItem?.portions}
        onSaveToPlan={saveRecipeToPlan}
      />
    )
  } else {
    page = <RecipeList />
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand" href="#/" aria-label="Family Kitchen home">
            <span className="brand-mark">FK</span>
            <span>
              <strong>Family Kitchen</strong>
              <small>Simple food. Less waste.</small>
            </span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <a className={route.section === 'plan' ? 'plan-link active' : 'plan-link'} href="#/plan">
              Plan
              {mealPlan.length > 0 && <span className="plan-count">{mealPlan.length}</span>}
            </a>
            <a className={route.section === 'shopping' ? 'plan-link active' : 'plan-link'} href="#/shopping">
              Shopping
            </a>
          </nav>
        </div>
      </header>
      <main>{page}</main>
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

      const ingredientTerms = [
        ...recipe.ingredients.flatMap(ingredientSearchTerms),
        ...recipe.variations.flatMap((variation) => variation.ingredients?.flatMap(ingredientSearchTerms) ?? [])
      ]

      return [recipe.title, recipe.summary, recipe.category, ...recipe.tags, ...ingredientTerms]
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

      <InstallApp />

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

function PlanPage({
  plan,
  onChangePortions,
  onRemove,
  onClear
}: {
  plan: MealPlanItem[]
  onChangePortions: (recipeId: string, portions: number) => void
  onRemove: (recipeId: string) => void
  onClear: () => void
}) {
  const plannedRecipes = plan.flatMap((item) => {
    const recipe = recipes.find((candidate) => candidate.id === item.recipeId)
    return recipe ? [{ item, recipe }] : []
  })

  function clearPlan() {
    if (window.confirm('Clear all recipes from the cooking plan?')) onClear()
  }

  return (
    <div className="plan-page">
      <section className="plan-hero">
        <p className="eyebrow">Meal planning</p>
        <h1>Cooking plan</h1>
        <p>Save the recipes and portion sizes you intend to cook. This plan is the source for the consolidated shopping list.</p>
      </section>

      {plannedRecipes.length === 0 ? (
        <section className="plan-empty">
          <h2>No meals planned yet</h2>
          <p>Choose a recipe, set the portions you want, then add it to the plan.</p>
          <a href="#/">Browse recipes</a>
        </section>
      ) : (
        <>
          <div className="plan-toolbar">
            <strong>{plannedRecipes.length} {plannedRecipes.length === 1 ? 'recipe' : 'recipes'} planned</strong>
            <div>
              <a href="#/shopping">Shopping list</a>
              <a href="#/">Add recipes</a>
              <button type="button" onClick={clearPlan}>Clear plan</button>
            </div>
          </div>

          <section className="plan-list" aria-label="Planned recipes">
            {plannedRecipes.map(({ item, recipe }) => (
              <article className="plan-item" key={recipe.id}>
                <div className="plan-item-main">
                  <div className="card-topline">
                    <span className="category-pill">{recipe.category}</span>
                    {recipe.season && recipe.season !== 'all-year' && <span className="season-pill">{recipe.season}</span>}
                  </div>
                  <a className="plan-item-title" href={recipePlanHref(recipe.id, item.portions)}>
                    <h2>{recipe.title}</h2>
                  </a>
                  <p>{formatPortionCount(item.portions)} portions</p>
                </div>

                <PlanPortionControls
                  portions={item.portions}
                  onChange={(portions) => onChangePortions(recipe.id, portions)}
                />

                <div className="plan-item-actions">
                  <a href={recipePlanHref(recipe.id, item.portions)}>Open recipe</a>
                  <button type="button" onClick={() => onRemove(recipe.id)}>Remove</button>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  )
}

function InstallApp() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      const promptEvent = event as BeforeInstallPromptEvent
      promptEvent.preventDefault()
      setInstallPrompt(promptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setInstallPrompt(null)
      setShowHelp(false)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) return null

  async function install() {
    if (!installPrompt) {
      setShowHelp((current) => !current)
      return
    }

    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  return (
    <section className="install-panel" aria-label="Install Family Kitchen">
      <div>
        <strong>Add Family Kitchen to your phone</strong>
        <p>Install it as a standalone app/shortcut for quicker access.</p>
      </div>
      <button type="button" onClick={install}>Install app</button>
      {showHelp && (
        <p className="install-help">
          On Android, open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.
        </p>
      )}
    </section>
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

function RecipePage({
  recipe,
  initialPortions,
  plannedPortions,
  onSaveToPlan
}: {
  recipe: Recipe
  initialPortions?: number
  plannedPortions?: number
  onSaveToPlan: (recipeId: string, portions: number) => void
}) {
  const [shareText, setShareText] = useState('Share')
  const [portions, setPortions] = useState(() => normalisePlanPortions(initialPortions ?? recipe.basePortions))
  const atDefaultPortions = Math.abs(portions - recipe.basePortions) < 0.001
  const matchesPlan = plannedPortions !== undefined && Math.abs(portions - plannedPortions) < 0.001

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
          <Stat label="Default" value={recipe.makes} />
          <Stat label="Freezer" value={recipe.freezer.split('.')[0]} />
        </div>
      </header>

      <PortionSelector recipe={recipe} portions={portions} onChange={setPortions} />

      <section className="plan-action-panel" aria-label="Cooking plan">
        <div>
          <p className="eyebrow">Cooking plan</p>
          <strong>
            {plannedPortions === undefined
              ? `Save ${formatPortionCount(portions)} portions`
              : `${formatPortionCount(plannedPortions)} portions currently saved`}
          </strong>
          <p>Save this recipe and portion count to the cooking plan and consolidated shopping list.</p>
        </div>
        <div className="plan-action-buttons">
          <button
            type="button"
            disabled={matchesPlan}
            onClick={() => onSaveToPlan(recipe.id, portions)}
          >
            {matchesPlan ? 'Saved in plan' : plannedPortions === undefined ? 'Add to plan' : 'Update plan'}
          </button>
          <a href="#/plan">View plan</a>
        </div>
      </section>

      <section className="quick-panel">
        <p className="eyebrow">Quick steps</p>
        <ol>
          {recipe.quickSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="recipe-section household-note">
        <h2>Household use</h2>
        <p>{recipe.householdUse}</p>
        {!atDefaultPortions && <p className="default-context-note">This guidance describes the default {formatPortionCount(recipe.basePortions)}-portion recipe.</p>}
      </section>

      <section className="recipe-section">
        <h2>Ingredients</h2>
        <ul className="ingredient-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={`${ingredient.id}-${index}`}>{formatIngredient(ingredient, portions, recipe.basePortions)}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-section">
        <h2>Method</h2>
        <ol className="method-list">
          {recipe.method.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="recipe-section">
        <h2>Default pack-size notes</h2>
        <p className="pack-note-intro">These notes refer to the reviewed default of {formatPortionCount(recipe.basePortions)} portions.</p>
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
                {variation.ingredients && variation.ingredients.length > 0 && (
                  <div className="variation-ingredients">
                    <strong>Variation ingredients</strong>
                    <ul>
                      {variation.ingredients.map((ingredient, index) => (
                        <li key={`${ingredient.id}-${index}`}>{formatIngredient(ingredient, portions, recipe.basePortions)}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {variation.text && <p>{variation.text}</p>}
                {variation.steps && (
                  <ol>
                    {variation.steps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                )}
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

      <RecipeFeedback recipe={recipe} />

      <section className="recipe-section compact-details">
        <h2>Useful details</h2>
        <p><strong>Equipment:</strong> {recipe.equipment.join(', ')}</p>
        <p><strong>Freezer:</strong> {recipe.freezer}</p>
      </section>
    </article>
  )
}

function PortionSelector({
  recipe,
  portions,
  onChange
}: {
  recipe: Recipe
  portions: number
  onChange: (portions: number) => void
}) {
  const step = 0.5
  const atDefault = Math.abs(portions - recipe.basePortions) < 0.001

  function setAmount(value: number) {
    onChange(normalisePlanPortions(value))
  }

  return (
    <section className="portion-panel" aria-label="Scale recipe portions">
      <div className="portion-copy">
        <p className="eyebrow">Scale recipe</p>
        <strong>Portions</strong>
        <p>
          Default: {formatPortionCount(recipe.basePortions)}. The default keeps the reviewed quantities chosen around sensible household and fresh-produce pack sizes.
        </p>
      </div>
      <div className="portion-controls">
        <button type="button" aria-label="Decrease portions" onClick={() => setAmount(portions - step)}>−</button>
        <input
          type="number"
          min={step}
          step={step}
          value={portions}
          aria-label="Portions"
          onChange={(event) => {
            const value = Number(event.target.value)
            if (value > 0) onChange(value)
          }}
          onBlur={() => setAmount(portions)}
        />
        <button type="button" aria-label="Increase portions" onClick={() => setAmount(portions + step)}>+</button>
      </div>
      {!atDefault && (
        <div className="portion-scaled-note">
          <span>Ingredients are scaled to {formatPortionCount(portions)} portions.</span>
          <button type="button" onClick={() => onChange(recipe.basePortions)}>Reset</button>
        </div>
      )}
    </section>
  )
}

function PlanPortionControls({
  portions,
  onChange
}: {
  portions: number
  onChange: (portions: number) => void
}) {
  const step = 0.5

  function setAmount(value: number) {
    onChange(normalisePlanPortions(value))
  }

  return (
    <div className="plan-portion-editor">
      <span>Portions</span>
      <div className="portion-controls compact">
        <button type="button" aria-label="Decrease planned portions" onClick={() => setAmount(portions - step)}>−</button>
        <input
          type="number"
          min={step}
          step={step}
          value={portions}
          aria-label="Planned portions"
          onChange={(event) => {
            const value = Number(event.target.value)
            if (value > 0) onChange(value)
          }}
          onBlur={() => setAmount(portions)}
        />
        <button type="button" aria-label="Increase planned portions" onClick={() => setAmount(portions + step)}>+</button>
      </div>
    </div>
  )
}

function RecipeFeedback({ recipe }: { recipe: Recipe }) {
  const storageKey = `family-kitchen:recipe-note:${recipe.id}`
  const [note, setNote] = useState(() => window.localStorage.getItem(storageKey) ?? '')

  useEffect(() => {
    if (note) {
      window.localStorage.setItem(storageKey, note)
    } else {
      window.localStorage.removeItem(storageKey)
    }
  }, [note, storageKey])

  const issueTitle = `Recipe feedback: ${recipe.title}`
  const issueBody = [
    `## Recipe`,
    recipe.title,
    '',
    `Recipe page: ${window.location.href}`,
    '',
    '## Feedback',
    note.trim()
  ].join('\n')
  const issueUrl = `https://github.com/Avazel-Lab/family-kitchen/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`
  const viewUrl = `https://github.com/Avazel-Lab/family-kitchen/issues?q=${encodeURIComponent(`is:issue "${issueTitle}"`)}`

  function clearNote() {
    if (window.confirm('Clear the local draft note for this recipe?')) setNote('')
  }

  return (
    <section className="recipe-section feedback-panel">
      <h2>Notes & feedback</h2>
      <p className="feedback-intro">
        Jot down changes while cooking. Drafts autosave only on this phone/browser.
      </p>
      <label htmlFor={`feedback-${recipe.id}`} className="feedback-label">Draft note</label>
      <textarea
        id={`feedback-${recipe.id}`}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="e.g. Needed 5 minutes longer reducing; use less sweetcorn next time…"
        rows={6}
      />
      <div className="feedback-status">{note ? 'Saved locally' : 'Nothing saved yet'}</div>
      <div className="feedback-actions">
        <a
          className={note.trim() ? 'feedback-submit' : 'feedback-submit disabled'}
          href={note.trim() ? issueUrl : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!note.trim()}
        >
          Submit feedback
        </a>
        <a className="feedback-link" href={viewUrl} target="_blank" rel="noreferrer">View feedback</a>
        {note && <button className="feedback-clear" type="button" onClick={clearNote}>Clear draft</button>}
      </div>
      <p className="feedback-disclaimer">
        Submitting opens a pre-filled issue in GitHub for review. A GitHub account is required to submit it; the local draft remains on this device until you clear it.
      </p>
    </section>
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
