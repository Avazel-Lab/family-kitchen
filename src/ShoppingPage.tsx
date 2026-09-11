import { useEffect, useMemo, useState } from 'react'
import { recipes } from './data/recipes'
import { buildShoppingList, formatShoppingAmount, formatShoppingLine, shoppingCategoryOrder, shoppingDisplayName } from './shoppingList'
import { loadShoppingCheckedItems, saveShoppingCheckedItems } from './shoppingState'
import type { MealPlanItem } from './types'
import './shopping.css'

export default function ShoppingPage({ plan }: { plan: MealPlanItem[] }) {
  const items = useMemo(() => buildShoppingList(plan, recipes), [plan])
  const buyItems = items.filter((item) => item.category !== 'Check cupboard')
  const cupboardItems = items.filter((item) => item.category === 'Check cupboard')
  const [checked, setChecked] = useState<Set<string>>(loadShoppingCheckedItems)
  const [hideChecked, setHideChecked] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'buy' | 'all' | 'unchecked' | 'failed'>('idle')

  useEffect(() => {
    const validKeys = new Set(items.map((item) => item.stateKey))
    setChecked((current) => { const next = new Set(Array.from(current).filter((key) => validKeys.has(key))); return sameSet(current, next) ? current : next })
  }, [items])
  useEffect(() => { saveShoppingCheckedItems(checked) }, [checked])

  const checkedCount = items.filter((item) => checked.has(item.stateKey)).length
  const checkedBuyCount = buyItems.filter((item) => checked.has(item.stateKey)).length
  const visibleItems = hideChecked ? items.filter((item) => !checked.has(item.stateKey)) : items
  const groupedItems = shoppingCategoryOrder.map((category) => ({ category, items: visibleItems.filter((item) => item.category === category) })).filter((group) => group.items.length > 0)

  function toggleItem(key: string) { setChecked((current) => { const next = new Set(current); if (next.has(key)) next.delete(key); else next.add(key); return next }) }
  function clearTicks() { setChecked(new Set()) }

  async function copyList(mode: 'buy' | 'all' | 'unchecked') {
    const source = mode === 'all' ? items : mode === 'unchecked' ? buyItems.filter((item) => !checked.has(item.stateKey)) : buyItems
    const text = source.map(formatShoppingLine).join('\n')
    if (!text) return
    try { await writeClipboardText(text); setCopyStatus(mode) } catch { setCopyStatus('failed') }
    window.setTimeout(() => setCopyStatus('idle'), 1800)
  }

  if (plan.length === 0) return <div className="shopping-page"><section className="page-hero compact-hero"><p className="eyebrow">Shopping</p><h1>Shopping list</h1><p>Generated from the recipes, portions and choices in your cooking plan.</p></section><section className="empty-panel"><h2>No cooking plan yet</h2><p>Add recipes to the plan first, then their ingredients will be consolidated here.</p><a className="primary-link" href="#/plan">Go to cooking plan</a></section></div>

  return (
    <div className="shopping-page">
      <section className="page-hero compact-hero"><p className="eyebrow">Shopping</p><h1>Shopping list</h1><p>{buyItems.length} to buy{cupboardItems.length ? ` · ${cupboardItems.length} cupboard checks` : ''} from {plan.length} planned {plan.length === 1 ? 'recipe' : 'recipes'}.</p></section>
      <div className="page-toolbar shopping-toolbar"><div><strong>{buyItems.length} to buy</strong><span>{checkedBuyCount} checked</span></div><div className="shopping-toolbar-actions"><button className="primary-button compact-button" type="button" onClick={() => copyList('buy')}>{copyStatus === 'buy' ? 'Copied' : copyStatus === 'failed' ? 'Copy failed' : 'Copy list'}</button>{checkedBuyCount > 0 && <button type="button" onClick={() => copyList('unchecked')}>{copyStatus === 'unchecked' ? 'Copied' : 'Copy unchecked'}</button>}{cupboardItems.length > 0 && <button type="button" onClick={() => copyList('all')}>{copyStatus === 'all' ? 'Copied all' : 'Copy all'}</button>}{checkedCount > 0 && <button type="button" onClick={() => setHideChecked((current) => !current)}>{hideChecked ? 'Show checked' : 'Hide checked'}</button>}<a href="#/plan">Edit plan</a>{checkedCount > 0 && <button type="button" onClick={clearTicks}>Clear ticks</button>}</div></div>
      <details className="shopping-help"><summary>How this list works</summary><p>“Copy list” contains only things to buy, one item per line for Google Keep. Regular pantry staples are separated under “Check cupboard”; use “Copy all” if you want those included too. Fixed tins, jars and microwave-rice pouches round up only at purchase time.</p></details>
      {visibleItems.length === 0 ? <section className="shopping-complete"><strong>Everything is checked off.</strong><button type="button" onClick={() => setHideChecked(false)}>Show checked items</button></section> : <div className="shopping-groups">{groupedItems.map((group) => <section className={group.category === 'Check cupboard' ? 'shopping-group cupboard-group' : 'shopping-group'} key={group.category}><h2>{group.category}</h2><div className="shopping-items">{group.items.map((item) => { const isChecked = checked.has(item.stateKey); return <label className={isChecked ? 'shopping-item checked' : 'shopping-item'} key={item.stateKey}><input type="checkbox" checked={isChecked} onChange={() => toggleItem(item.stateKey)} /><span className="shopping-item-copy"><strong>{shoppingDisplayName(item)}</strong><span>{formatShoppingAmount(item)}</span></span></label> })}</div></section>)}</div>}
    </div>
  )
}

async function writeClipboardText(text: string) {
  if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return }
  const textarea = document.createElement('textarea'); textarea.value = text; textarea.setAttribute('readonly', ''); textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); const copied = document.execCommand('copy'); textarea.remove(); if (!copied) throw new Error('Clipboard copy failed')
}
function sameSet(a: Set<string>, b: Set<string>) { if (a.size !== b.size) return false; for (const value of a) if (!b.has(value)) return false; return true }
