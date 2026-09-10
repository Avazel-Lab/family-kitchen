import { PlanPortionControls } from '../components/PortionControls'
import { recipes } from '../data/recipes'
import { recipePlanHref } from '../mealPlan'
import {
  plannedChoiceSummary,
  planningVariations,
  shoppingChoiceIngredients
} from '../planOptions'
import { formatPortionCount } from '../recipeScaling'
import type { MealPlanItem } from '../types'

export default function PlanPage({
  plan,
  onChangePortions,
  onChangeVariation,
  onChangeIngredientChoice,
  onRemove,
  onClear
}: {
  plan: MealPlanItem[]
  onChangePortions: (recipeId: string, portions: number) => void
  onChangeVariation: (recipeId: string, variationId: string) => void
  onChangeIngredientChoice: (recipeId: string, ingredientId: string, alternativeId: string) => void
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
      <section className="page-hero compact-hero">
        <p className="eyebrow">Meal planning</p>
        <h1>Cooking plan</h1>
        <p>Set portions and any ingredient-changing choices here. Recipes and the shopping list then use exactly this plan.</p>
      </section>

      {plannedRecipes.length === 0 ? (
        <section className="empty-panel">
          <h2>No meals planned yet</h2>
          <p>Choose a recipe, set the portions you want, then add it to the plan.</p>
          <a className="primary-link" href="#/">Browse recipes</a>
        </section>
      ) : (
        <>
          <div className="page-toolbar">
            <strong>{plannedRecipes.length} {plannedRecipes.length === 1 ? 'recipe' : 'recipes'} planned</strong>
            <div>
              <a href="#/shopping">Shopping list</a>
              <a href="#/">Add recipes</a>
              <button type="button" onClick={clearPlan}>Clear plan</button>
            </div>
          </div>

          <section className="plan-list" aria-label="Planned recipes">
            {plannedRecipes.map(({ item, recipe }) => {
              const variations = planningVariations(recipe)
              const ingredientChoices = shoppingChoiceIngredients(recipe)
              const choiceSummary = plannedChoiceSummary(recipe, item)

              return (
                <article className="plan-item" key={recipe.id}>
                  <div className="plan-item-main">
                    <div className="card-topline">
                      <span className="category-pill">{recipe.category}</span>
                      {recipe.season && recipe.season !== 'all-year' && <span className="season-pill">{recipe.season}</span>}
                    </div>
                    <a className="plan-item-title" href={recipePlanHref(recipe.id, item.portions)}>
                      <h2>{recipe.title}</h2>
                    </a>
                    <p>{formatPortionCount(item.portions)} portions{choiceSummary.length ? ` · ${choiceSummary.join(' · ')}` : ''}</p>
                  </div>

                  <div className="plan-item-config">
                    <PlanPortionControls
                      portions={item.portions}
                      onChange={(portions) => onChangePortions(recipe.id, portions)}
                    />

                    {variations.length > 0 && (
                      <label className="plan-choice-editor">
                        <span>Meal option</span>
                        <select value={item.variationId ?? ''} onChange={(event) => onChangeVariation(recipe.id, event.target.value)}>
                          <option value="">Standard recipe</option>
                          {variations.map((variation) => <option value={variation.id} key={variation.id}>{variation.title}</option>)}
                        </select>
                      </label>
                    )}

                    {ingredientChoices.map((ingredient) => (
                      <label className="plan-choice-editor" key={ingredient.id}>
                        <span>Rice</span>
                        <select
                          value={item.ingredientChoices?.[ingredient.id] ?? ''}
                          onChange={(event) => onChangeIngredientChoice(recipe.id, ingredient.id, event.target.value)}
                        >
                          <option value="">{ingredient.name}</option>
                          {ingredient.alternatives?.map((alternative) => (
                            <option value={alternative.id} key={alternative.id}>{alternative.name}</option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>

                  <div className="plan-item-actions">
                    <a className="primary-link" href={recipePlanHref(recipe.id, item.portions)}>Open planned recipe</a>
                    <button className="text-danger" type="button" onClick={() => onRemove(recipe.id)}>Remove</button>
                  </div>
                </article>
              )
            })}
          </section>
        </>
      )}
    </div>
  )
}
