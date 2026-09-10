import { normalisePlanPortions } from '../mealPlan'

const STEP = 0.5

export function PortionControls({
  portions,
  onChange,
  compact = false,
  label = 'Portions'
}: {
  portions: number
  onChange: (portions: number) => void
  compact?: boolean
  label?: string
}) {
  function setAmount(value: number) {
    onChange(normalisePlanPortions(value))
  }

  return (
    <div className={compact ? 'portion-controls compact' : 'portion-controls'}>
      <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} onClick={() => setAmount(portions - STEP)}>−</button>
      <input
        type="number"
        min={STEP}
        step={STEP}
        value={portions}
        aria-label={label}
        onChange={(event) => {
          const value = Number(event.target.value)
          if (value > 0) onChange(value)
        }}
        onBlur={() => setAmount(portions)}
      />
      <button type="button" aria-label={`Increase ${label.toLowerCase()}`} onClick={() => setAmount(portions + STEP)}>+</button>
    </div>
  )
}

export function PlanPortionControls({
  portions,
  onChange
}: {
  portions: number
  onChange: (portions: number) => void
}) {
  return (
    <div className="plan-portion-editor">
      <span>Portions</span>
      <PortionControls portions={portions} onChange={onChange} compact label="Planned portions" />
    </div>
  )
}
