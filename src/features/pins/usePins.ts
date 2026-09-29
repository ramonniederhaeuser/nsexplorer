import { useCallback, useEffect, useState } from "react";
import type { Pin } from "./types";

const KEY = "nsexplorer.pins";

const FALLBACK: Pin[] = [
  { label: "Downloads", path: "C:\\Users\\ramon\\Downloads" },
];

function load(): Pin[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return FALLBACK;
    const parsed = JSON.parse(raw) as Pin[];
    return Array.isArray(parsed) ? parsed : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export function usePins() {
  const [pins, setPins] = useState<Pin[]>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(pins));
  }, [pins]);

  const add = useCallback((pin: Pin) => {
    setPins((prev) => {
      if (prev.some((p) => p.path.toLowerCase() === pin.path.toLowerCase())) return prev;
      return [...prev, pin];
    });
  }, []);

  const remove = useCallback((path: string) => {
    setPins((prev) => prev.filter((p) => p.path !== path));
  }, []);

  return { pins, add, remove };
}