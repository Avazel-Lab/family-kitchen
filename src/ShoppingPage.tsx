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
  const [hideChecked, setHideChecked] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'all' | 'unchecked' | 'failed'>('idle')

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
  const visibleItems = hideChecked ? items.filter((item) => !checked.has(item.stateKey)) : items
  const groupedItems = shoppingCategoryOrder
    .map((category) => ({ category, items: visibleItems.filter((item) => item.category === category) }))
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

  async function copyList(uncheckedOnly = false) {
    const source = uncheckedOnly ? items.filter((item) => !checked.has(item.stateKey)) : items
    const text = source.map(formatShoppingLine).join('\n')
    if (!text) return

    try {
      await writeClipboardText(text)
      setCopyStatus(uncheckedOnly ? 'unchecked' : 'all')
    } catch {
      setCopyStatus('failed')
    }

    window.setTimeout(() => setCopyStatus('idle'), 1800)
  }

  if (plan.length === 0) {
    return (
      <div className="shopping-page">
        <section className="page-hero compact-hero">
          <p className="eyebrow">Shopping</p>
          <h1>Shopping list</h1>
          <p>Generated from the recipes, portions and choices in your cooking plan.</p>
        </section>
        <section className="empty-panel">
          <h2>No cooking plan yet</h2>
          <p>Add recipes to the plan first, then their ingredients will be consolidated here.</p>
          <a className="primary-link" href="#/plan">Go to cooking plan</a>
        </section>
      </div>
    )
  }

  return (
    <div className="shopping-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">Shopping</p>
        <h1>Shopping list</h1>
        <p>{plan.length} {plan.length === 1 ? 'planned recipe' : 'planned recipes'} consolidated into one list.</p>
      </section>

      <div className="page-toolbar shopping-toolbar">
        <div>
          <strong>{items.length} {items.length === 1 ? 'item' : 'items'}</strong>
          <span>{checkedCount} checked</span>
        </div>
        <div className="shopping-toolbar-actions">
          <button className="primary-button compact-button" type="button" onClick={() => copyList(false)}>
            {copyStatus === 'all' ? 'Copied' : copyStatus === 'failed' ? 'Copy failed' : 'Copy list'}
          </button>
          {checkedCount > 0 && (
            <button type="button" onClick={() => copyList(true)}>{copyStatus === 'unchecked' ? 'Copied' : 'Copy unchecked'}</button>
          )}
          {checkedCount > 0 && <button type="button" onClick={() => setHideChecked((current) => !current)}>{hideChecked ? 'Show checked' : 'Hide checked'}</button>}
          <a href="#/plan">Edit plan</a>
          {checkedCount > 0 && <button type="button" onClick={clearTicks}>Clear ticks</button>}
        </div>
      </div>

      <details className="shopping-help">
        <summary>How this list works</summary>
        <p>
          Normal ingredients show the quantity required. Fixed tins, jars and microwave-rice pouches round up only at purchase time. Items without a fixed quantity are kept separately under “Check cupboard”. Copying uses one plain-text item per line for Google Keep.
        </p>
      </details>

      {visibleItems.length === 0 ? (
        <section className="shopping-complete">
          <strong>Everything is checked off.</strong>
          <button type="button" onClick={() => setHideChecked(false)}>Show checked items</button>
        </section>
      ) : (
        <div className="shopping-groups">
          {groupedItems.map((group) => (
            <section className={group.category === 'Check cupboard' ? 'shopping-group cupboard-group' : 'shopping-group'} key={group.category}>
              <h2>{group.category}</h2>
              <div className="shopping-items">
                {group.items.map((item) => {
                  const isChecked = checked.has(item.stateKey)
                  return (
                    <label className={isChecked ? 'shopping-item checked' : 'shopping-item'} key={item.stateKey}>
                      <input type="checkbox" checked={isChecked} onChange={() => toggleItem(item.stateKey)} />
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
      )}
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
