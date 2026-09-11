import { useState } from 'react'
import { PortionControls } from '../components/PortionControls'
import RecipeFeedback from '../components/RecipeFeedback'
import { recipePlanHref, sameMealConfiguration } from '../mealPlan'
import { activeIngredientsForPlan, activeMethodForPlan, activeQuickStepsForPlan, plannedChoiceSummary, plannedVariation } from '../planOptions'
import { formatIngredient, formatPortionCount } from '../recipeScaling'
import type { MealPlanItem, Recipe } from '../types'

export default function RecipePage({ recipe, configuredItem, savedPlanItem, onSaveToPlan }: {
  recipe: Recipe
  configuredItem?: MealPlanItem
  savedPlanItem?: MealPlanItem
  onSaveToPlan: (item: MealPlanItem, replaceConfiguration?: boolean) => void
}) {
  const [shareText, setShareText] = useState('Share')
  const [portions, setPortions] = useState(configuredItem?.portions ?? recipe.basePortions)
  const activePlanItem = configuredItem
  const activeIngredients = activeIngredientsForPlan(recipe, activePlanItem)
  const activeQuickSteps = activeQuickStepsForPlan(recipe, activePlanItem)
  const activeMethod = activeMethodForPlan(recipe, activePlanItem)
  const selectedVariation = plannedVariation(recipe, activePlanItem)
  const activeChoiceSummary = plannedChoiceSummary(recipe, activePlanItem)
  const savedChoiceSummary = plannedChoiceSummary(recipe, savedPlanItem)
  const otherVariations = recipe.variations.filter((variation) => variation !== selectedVariation)
  const atDefaultPortions = Math.abs(portions - recipe.basePortions) < 0.001
  const matchesSavedPortions = savedPlanItem !== undefined && Math.abs(portions - savedPlanItem.portions) < 0.001
  const configuredIsSaved = sameMealConfiguration(configuredItem, savedPlanItem)
  const microwaveRicePlanned = Object.values(activePlanItem?.ingredientChoices ?? {}).includes('microwave-rice')

  async function shareRecipe() {
    const shareItem: MealPlanItem = activePlanItem ?? { recipeId: recipe.id, portions }
    const url = `${window.location.origin}${window.location.pathname}${recipePlanHref(shareItem)}`
    try {
      if (navigator.share) await navigator.share({ title: recipe.title, text: `Family Kitchen: ${recipe.title}`, url })
      else { await navigator.clipboard.writeText(url); setShareText('Link copied'); window.setTimeout(() => setShareText('Share'), 1800) }
    } catch { /* closing the share sheet is not an error */ }
  }

  const householdContent = <><p>{recipe.householdUse}</p>{!atDefaultPortions && <p className="default-context-note">This guidance describes the default {formatPortionCount(recipe.basePortions)}-portion recipe.</p>}</>

  return (
    <article className="recipe-page">
      <div className="recipe-actions"><a className="back-link" href={configuredIsSaved ? '#/plan' : '#/'}>← {configuredIsSaved ? 'Plan' : 'Recipes'}</a><button className="secondary-button" type="button" onClick={shareRecipe}>{shareText}</button></div>
      <header className="recipe-header"><div className="card-topline"><span className="category-pill">{recipe.category}</span>{recipe.season && recipe.season !== 'all-year' && <span className="season-pill">{recipe.season}</span>}</div><h1>{recipe.title}</h1><p>{recipe.summary}</p><div className="recipe-stats"><Stat label="Prep" value={`${recipe.prepMinutes} min`} /><Stat label="Cook" value={`${recipe.cookMinutes} min`} /><Stat label="Default" value={recipe.makes} /><Stat label="Freezer" value={recipe.freezer.split('.')[0]} /></div></header>

      {configuredItem ? <section className="planned-cook-bar" aria-label="Configured meal"><div><p className="eyebrow">{configuredIsSaved ? 'Planned cook' : 'Recipe setup'}</p><strong>{formatPortionCount(configuredItem.portions)} portions{activeChoiceSummary.length > 0 && ` · ${activeChoiceSummary.join(' · ')}`}</strong></div>{configuredIsSaved ? <a href="#/plan">Edit plan</a> : <button className="primary-button compact-button" type="button" onClick={() => onSaveToPlan(configuredItem, true)}>Save to plan</button>}</section> : <section className="recipe-plan-panel" aria-label="Scale and plan recipe"><div className="recipe-plan-copy"><p className="eyebrow">Portions & plan</p><strong>{formatPortionCount(portions)} portions</strong><p>Default {formatPortionCount(recipe.basePortions)}.{savedPlanItem && ` Saved plan: ${formatPortionCount(savedPlanItem.portions)} portions${savedChoiceSummary.length ? ` · ${savedChoiceSummary.join(' · ')}` : ''}.`}</p></div><PortionControls portions={portions} onChange={setPortions} /><div className="recipe-plan-actions"><button className="primary-button" type="button" disabled={matchesSavedPortions} onClick={() => onSaveToPlan({ recipeId: recipe.id, portions })}>{matchesSavedPortions ? 'Saved in plan' : savedPlanItem ? 'Update plan' : 'Add to plan'}</button>{!atDefaultPortions && <button className="text-button" type="button" onClick={() => setPortions(recipe.basePortions)}>Reset</button>}{savedPlanItem && <a href="#/plan">View plan</a>}</div></section>}

      <section className="quick-panel"><p className="eyebrow">Quick steps</p>{selectedVariation && <p className="quick-choice-note">Planned option: <strong>{selectedVariation.title}</strong></p>}{microwaveRicePlanned && <p className="quick-choice-note">Microwave rice planned: heat the pouch according to its packet instead of cooking dry rice.</p>}<ol>{activeQuickSteps.map((step) => <li key={step}>{step}</li>)}</ol></section>

      {configuredItem ? <details className="recipe-disclosure"><summary>Household use</summary><div className="disclosure-body">{householdContent}</div></details> : <section className="recipe-section household-note"><h2>Household use</h2>{householdContent}</section>}

      <section className="recipe-section"><h2>{configuredItem ? 'Planned ingredients' : 'Ingredients'}</h2><ul className="ingredient-list">{activeIngredients.map((ingredient, index) => <li key={`${ingredient.id}-${index}`}>{formatIngredient(ingredient, configuredItem?.portions ?? portions, recipe.basePortions)}</li>)}</ul></section>
      <section className="recipe-section"><h2>Method</h2><ol className="method-list">{activeMethod.map((step) => <li key={step}>{step}</li>)}</ol></section>

      <details className="recipe-disclosure"><summary>Pack-size notes</summary><div className="disclosure-body"><p className="pack-note-intro">These refer to the reviewed default of {formatPortionCount(recipe.basePortions)} portions.</p><ul>{recipe.packNotes.map((note) => <li key={note}>{note}</li>)}</ul></div></details>
      {otherVariations.length > 0 && <details className="recipe-disclosure"><summary>Other variations</summary><div className="disclosure-body variation-grid">{otherVariations.map((variation) => <div className="variation-card" key={variation.title}><h3>{variation.title}</h3>{variation.ingredients && variation.ingredients.length > 0 && <div className="variation-ingredients"><strong>Variation ingredients</strong><ul>{variation.ingredients.map((ingredient, index) => <li key={`${ingredient.id}-${index}`}>{formatIngredient(ingredient, configuredItem?.portions ?? portions, recipe.basePortions)}</li>)}</ul></div>}{variation.text && <p>{variation.text}</p>}{variation.steps && <ol>{variation.steps.map((step) => <li key={step}>{step}</li>)}</ol>}</div>)}</div></details>}
      {recipe.familyNotes && recipe.familyNotes.length > 0 && <details className="recipe-disclosure"><summary>Family notes</summary><div className="disclosure-body"><ul>{recipe.familyNotes.map((note) => <li key={note}>{note}</li>)}</ul></div></details>}
      <details className="recipe-disclosure"><summary>Notes & feedback</summary><div className="disclosure-body"><RecipeFeedback recipe={recipe} /></div></details>
      <details className="recipe-disclosure"><summary>Useful details</summary><div className="disclosure-body compact-details"><p><strong>Equipment:</strong> {recipe.equipment.join(', ')}</p><p><strong>Freezer:</strong> {recipe.freezer}</p></div></details>
    </article>
  )
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="stat"><span>{label}</span><strong>{value}</strong></div> }
