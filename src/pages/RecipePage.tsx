import { useState } from 'react'
import { PortionControls } from '../components/PortionControls'
import RecipeFeedback from '../components/RecipeFeedback'
import { normalisePlanPortions } from '../mealPlan'
import {
  activeIngredientsForPlan,
  plannedChoiceSummary,
  plannedVariation
} from '../planOptions'
import { formatIngredient, formatPortionCount } from '../recipeScaling'
import type { MealPlanItem, Recipe } from '../types'

export default function RecipePage({
  recipe,
  initialPortions,
  plannedItem,
  onSaveToPlan
}: {
  recipe: Recipe
  initialPortions?: number
  plannedItem?: MealPlanItem
  onSaveToPlan: (recipeId: string, portions: number) => void
}) {
  const [shareText, setShareText] = useState('Share')
  const [portions, setPortions] = useState(() => normalisePlanPortions(initialPortions ?? recipe.basePortions))
  const openedFromPlan = initialPortions !== undefined && plannedItem !== undefined
  const activePlanItem = openedFromPlan ? plannedItem : undefined
  const activeIngredients = activeIngredientsForPlan(recipe, activePlanItem)
  const selectedVariation = plannedVariation(recipe, activePlanItem)
  const activeChoiceSummary = plannedChoiceSummary(recipe, activePlanItem)
  const savedChoiceSummary = plannedChoiceSummary(recipe, plannedItem)
  const otherVariations = recipe.variations.filter((variation) => variation !== selectedVariation)
  const atDefaultPortions = Math.abs(portions - recipe.basePortions) < 0.001
  const matchesPlan = plannedItem !== undefined && Math.abs(portions - plannedItem.portions) < 0.001
  const microwaveRicePlanned = Object.values(activePlanItem?.ingredientChoices ?? {}).includes('microwave-rice')

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
        <a className="back-link" href={openedFromPlan ? '#/plan' : '#/'}>← {openedFromPlan ? 'Plan' : 'Recipes'}</a>
        <button className="secondary-button" type="button" onClick={shareRecipe}>{shareText}</button>
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

      {openedFromPlan ? (
        <section className="planned-cook-bar" aria-label="Planned meal configuration">
          <div>
            <p className="eyebrow">Planned cook</p>
            <strong>
              {formatPortionCount(plannedItem.portions)} portions
              {activeChoiceSummary.length > 0 && ` · ${activeChoiceSummary.join(' · ')}`}
            </strong>
          </div>
          <a href="#/plan">Edit plan</a>
        </section>
      ) : (
        <section className="recipe-plan-panel" aria-label="Scale and plan recipe">
          <div className="recipe-plan-copy">
            <p className="eyebrow">Portions & plan</p>
            <strong>{formatPortionCount(portions)} portions</strong>
            <p>
              Default {formatPortionCount(recipe.basePortions)}.
              {plannedItem && ` Saved plan: ${formatPortionCount(plannedItem.portions)} portions${savedChoiceSummary.length ? ` · ${savedChoiceSummary.join(' · ')}` : ''}.`}
            </p>
          </div>
          <PortionControls portions={portions} onChange={setPortions} />
          <div className="recipe-plan-actions">
            <button
              className="primary-button"
              type="button"
              disabled={matchesPlan}
              onClick={() => onSaveToPlan(recipe.id, portions)}
            >
              {matchesPlan ? 'Saved in plan' : plannedItem ? 'Update plan' : 'Add to plan'}
            </button>
            {!atDefaultPortions && <button className="text-button" type="button" onClick={() => setPortions(recipe.basePortions)}>Reset</button>}
            {plannedItem && <a href="#/plan">View plan</a>}
          </div>
        </section>
      )}

      <section className="quick-panel">
        <p className="eyebrow">Quick steps</p>
        {selectedVariation && <p className="quick-choice-note">Planned option: <strong>{selectedVariation.title}</strong>. Follow its override under Method.</p>}
        {microwaveRicePlanned && <p className="quick-choice-note">Microwave rice planned: heat the pouch according to its packet instead of cooking dry rice.</p>}
        <ol>{recipe.quickSteps.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>

      <section className="recipe-section household-note">
        <h2>Household use</h2>
        <p>{recipe.householdUse}</p>
        {!atDefaultPortions && <p className="default-context-note">This guidance describes the default {formatPortionCount(recipe.basePortions)}-portion recipe.</p>}
      </section>

      <section className="recipe-section">
        <h2>{openedFromPlan ? 'Planned ingredients' : 'Ingredients'}</h2>
        <ul className="ingredient-list">
          {activeIngredients.map((ingredient, index) => (
            <li key={`${ingredient.id}-${index}`}>{formatIngredient(ingredient, portions, recipe.basePortions)}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-section">
        <h2>Method</h2>
        <ol className="method-list">{recipe.method.map((step) => <li key={step}>{step}</li>)}</ol>

        {selectedVariation && (
          <div className="selected-variation-method">
            <h3>{selectedVariation.title}</h3>
            <p className="selected-option-label">Planned override</p>
            {selectedVariation.text && <p>{selectedVariation.text}</p>}
            {selectedVariation.steps && <ol>{selectedVariation.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
          </div>
        )}
      </section>

      <details className="recipe-disclosure">
        <summary>Pack-size notes</summary>
        <div className="disclosure-body">
          <p className="pack-note-intro">These refer to the reviewed default of {formatPortionCount(recipe.basePortions)} portions.</p>
          <ul>{recipe.packNotes.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
      </details>

      {otherVariations.length > 0 && (
        <details className="recipe-disclosure">
          <summary>Other variations</summary>
          <div className="disclosure-body variation-grid">
            {otherVariations.map((variation) => (
              <div className="variation-card" key={variation.title}>
                <h3>{variation.title}</h3>
                {variation.ingredients && variation.ingredients.length > 0 && (
                  <div className="variation-ingredients">
                    <strong>Variation ingredients</strong>
                    <ul>{variation.ingredients.map((ingredient, index) => <li key={`${ingredient.id}-${index}`}>{formatIngredient(ingredient, portions, recipe.basePortions)}</li>)}</ul>
                  </div>
                )}
                {variation.text && <p>{variation.text}</p>}
                {variation.steps && <ol>{variation.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
              </div>
            ))}
          </div>
        </details>
      )}

      {recipe.familyNotes && recipe.familyNotes.length > 0 && (
        <details className="recipe-disclosure">
          <summary>Family notes</summary>
          <div className="disclosure-body"><ul>{recipe.familyNotes.map((note) => <li key={note}>{note}</li>)}</ul></div>
        </details>
      )}

      <details className="recipe-disclosure">
        <summary>Notes & feedback</summary>
        <div className="disclosure-body"><RecipeFeedback recipe={recipe} /></div>
      </details>

      <details className="recipe-disclosure">
        <summary>Useful details</summary>
        <div className="disclosure-body compact-details">
          <p><strong>Equipment:</strong> {recipe.equipment.join(', ')}</p>
          <p><strong>Freezer:</strong> {recipe.freezer}</p>
        </div>
      </details>
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
