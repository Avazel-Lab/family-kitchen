import { useEffect, useMemo, useState } from 'react'
import { recipes } from './data/recipes'
import {
  buildShoppingList,
  formatShoppingAmount,
  formatShoppingLine,
  shoppingCategoryOrder,
  shoppingDisplayName
} from './shoppingList'
import type { MealPlanItem } from './types'
import './shopping.css'

const CHECKED_STORAGE_KEY = 'family-kitchen:shopping-checked:v1'

export default function ShoppingPage({ plan }: { plan: MealPlanItem[] }) {
  const items = useMemo(() => buildShoppingList(plan, recipes), [plan])
  const [checked, setChecked] = useState<Set<string>>(loadCheckedItems)
  const [copyStatus, setCopyStatus] = useState('Copy list')

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
          <p>The shopping list is generated from the recipes, portions and choices in your cooking plan.</p>
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
          Consolidated from {plan.length} {plan.length === 1 ? 'planned recipe' : 'planned recipes'}, including the meal options and rice choices saved in the cooking plan.
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

      <div className="shopping-guidance">
        <strong>How quantities work</strong>
        <p>
          Normal ingredients show the quantity required. Fixed tins, jars and microwave-rice pouches are rounded up only where the recipe data says they are fixed units. Change meal options and rice choices in the cooking plan; this list updates automatically. “Copy list” copies one shopping item per line for easy pasting into Google Keep.
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
        This list follows the current cooking plan. Changing a recipe, its portions or a planned choice recalculates quantities automatically; changed quantities return unchecked so they are not accidentally treated as already bought.
      </p>
    </div>
  )
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
