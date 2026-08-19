import { useCallback, useEffect, useRef, useState } from 'react';

export type ToastVariant = 'default' | 'success' | 'warning';
export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, variant: ToastVariant = 'default', duration = 2600) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  // no-op effect to keep the hook signature stable for lint
  useEffect(() => () => setToasts([]), []);

  return { toasts, notify, dismiss };
}
