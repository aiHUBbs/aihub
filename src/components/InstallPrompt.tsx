import { Download, Share, X } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';

export function InstallPrompt() {
  const { shouldShow, isIOS, promptInstall, dismiss } = useInstallPrompt();

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm animate-toast-in sm:bottom-6 sm:right-6">
      <div className="flex items-center gap-3 rounded-2xl border border-ink-700 bg-ink-850/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-violet-500 text-white">
          {isIOS ? <Share size={18} /> : <Download size={18} />}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">
            {isIOS ? 'Add to Home Screen' : 'Install AI Hub'}
          </p>
          <p className="mt-0.5 text-xs text-ink-500">
            {isIOS
              ? 'Tap Share, then "Add to Home Screen"'
              : 'Get the full-screen app experience'}
          </p>
        </div>

        {!isIOS && (
          <button
            type="button"
            onClick={promptInstall}
            className="shrink-0 rounded-lg bg-gradient-to-r from-accent-500 to-violet-500 px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
          >
            Install
          </button>
        )}

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-ink-800 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
