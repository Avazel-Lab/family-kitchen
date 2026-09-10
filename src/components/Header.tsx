type Section = 'home' | 'recipe' | 'plan' | 'shopping'

export default function Header({ section, planCount }: { section: Section; planCount: number }) {
  const recipesActive = section === 'home' || section === 'recipe'

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href="#/" aria-label="Family Kitchen home">
          <img className="brand-mark" src="/family-kitchen/icon.svg" alt="" />
          <span className="brand-copy">
            <strong>Family Kitchen</strong>
            <small>Simple food. Less waste.</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a className={recipesActive ? 'nav-link active' : 'nav-link'} href="#/">Recipes</a>
          <a className={section === 'plan' ? 'nav-link active' : 'nav-link'} href="#/plan">
            Plan
            {planCount > 0 && <span className="plan-count">{planCount}</span>}
          </a>
          <a className={section === 'shopping' ? 'nav-link active' : 'nav-link'} href="#/shopping">Shopping</a>
        </nav>
      </div>
    </header>
  )
}
