import { useCallback, useEffect, useState } from 'react';

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // ignore quota / privacy errors
  }
}

export function useSet(key: string) {
  const [set, setSet] = useState<Set<string>>(() => readSet(key));

  useEffect(() => {
    writeSet(key, set);
  }, [key, set]);

  const add = useCallback((id: string) => {
    setSet((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSet((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSet(new Set()), []);

  const has = useCallback((id: string) => set.has(id), [set]);

  return { set, ids: [...set], add, remove, toggle, clear, has, size: set.size };
}

export function useOrderedSet(key: string, max = 50) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, [key, ids]);

  const add = useCallback(
    (id: string) => {
      setIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, max));
    },
    [max],
  );

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  return { ids, add, remove, clear, size: ids.length };
}
