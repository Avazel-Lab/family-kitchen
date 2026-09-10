import { useEffect, useState } from 'react'
import type { Recipe } from '../types'

export default function RecipeFeedback({ recipe }: { recipe: Recipe }) {
  const storageKey = `family-kitchen:recipe-note:${recipe.id}`
  const [note, setNote] = useState(() => window.localStorage.getItem(storageKey) ?? '')

  useEffect(() => {
    if (note) window.localStorage.setItem(storageKey, note)
    else window.localStorage.removeItem(storageKey)
  }, [note, storageKey])

  const issueTitle = `Recipe feedback: ${recipe.title}`
  const issueBody = [
    '## Recipe',
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
    <div className="feedback-body">
      <p className="feedback-intro">Jot down changes while cooking. Drafts autosave only on this phone/browser.</p>
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
      <p className="feedback-disclaimer">Submitting opens a pre-filled GitHub issue for review. The local draft stays on this device until you clear it.</p>
    </div>
  )
}
