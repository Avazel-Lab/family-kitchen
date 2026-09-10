import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function InstallApp() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches)

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      const promptEvent = event as BeforeInstallPromptEvent
      promptEvent.preventDefault()
      setInstallPrompt(promptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setInstallPrompt(null)
      setShowHelp(false)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) return null

  async function install() {
    if (!installPrompt) {
      setShowHelp((current) => !current)
      return
    }

    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  return (
    <section className="install-panel" aria-label="Install Family Kitchen">
      <div>
        <strong>Add Family Kitchen to your phone</strong>
        <p>Install it for quicker access and offline use.</p>
      </div>
      <button type="button" onClick={install}>Install app</button>
      {showHelp && (
        <p className="install-help">On Android, open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
      )}
    </section>
  )
}
