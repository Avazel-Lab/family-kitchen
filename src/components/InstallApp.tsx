import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISSED_KEY = 'family-kitchen:install-dismissed:v1'

export default function InstallApp() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)
  const [dismissed, setDismissed] = useState(() => window.localStorage.getItem(DISMISSED_KEY) === '1')

  useEffect(() => {
    const onBeforeInstall = (event: Event) => { const promptEvent = event as BeforeInstallPromptEvent; promptEvent.preventDefault(); setInstallPrompt(promptEvent) }
    const onInstalled = () => { setInstalled(true); setInstallPrompt(null); setShowHelp(false) }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => { window.removeEventListener('beforeinstallprompt', onBeforeInstall); window.removeEventListener('appinstalled', onInstalled) }
  }, [])

  if (installed || dismissed) return null

  async function install() {
    if (!installPrompt) { setShowHelp((current) => !current); return }
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  function dismiss() {
    try { window.localStorage.setItem(DISMISSED_KEY, '1') } catch { /* ignore */ }
    setDismissed(true)
  }

  return (
    <section className="install-panel" aria-label="Install Family Kitchen">
      <div><strong>Install Family Kitchen</strong><p>Quicker access and offline use, without needing an app-store account.</p></div>
      <div className="install-actions"><button type="button" onClick={install}>Install app</button><button className="install-dismiss" type="button" onClick={dismiss}>Not now</button></div>
      {showHelp && <p className="install-help">Use your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>}
    </section>
  )
}
