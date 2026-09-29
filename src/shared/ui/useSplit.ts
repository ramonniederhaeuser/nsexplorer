import { useCallback, useEffect, useState } from "react";

export function useSplit(key: string, initial: number, min: number, max: number) {
  const [size, setSize] = useState(() => {
    const raw = localStorage.getItem(key);
    const n = raw ? Number(raw) : initial;
    return Number.isFinite(n) ? n : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, String(size));
  }, [key, size]);

  const startDrag = useCallback(
    (e: React.MouseEvent, direction: "left" | "right") => {
      e.preventDefault();
      const startX = e.clientX;
      const start = size;

      function move(ev: MouseEvent) {
        const dx = ev.clientX - startX;
        const next = direction === "left" ? start + dx : start - dx;
        setSize(Math.min(max, Math.max(min, next)));
      }
      function up() {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      }
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },
    [size, min, max]
  );

  return { size, startDrag };
}