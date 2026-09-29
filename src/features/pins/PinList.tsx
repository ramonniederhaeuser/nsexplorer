import type { Pin } from "./types";

type Props = {
  pins: Pin[];
  currentPath: string;
  onOpen: (path: string) => void;
  onPinCurrent: () => void;
  onRemove: (path: string) => void;
  canPin: boolean;
};

export function PinList({ pins, currentPath, onOpen, onPinCurrent, onRemove, canPin }: Props) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong>Orte</strong>
        <button type="button" disabled={!canPin} onClick={onPinCurrent}>
          Aktuellen anheften
        </button>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {pins.map((p) => {
          const active = currentPath.toLowerCase() === p.path.toLowerCase();
          return (
            <li
              key={p.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 4px",
                background: active ? "var(--bg-hover)" : "transparent",
              }}
            >
              <button
                type="button"
                onClick={() => onOpen(p.path)}
                style={{ flex: 1, textAlign: "left", border: "none", background: "transparent", color: "inherit" }}
                title={p.path}
              >
                {p.label}
              </button>
              <button type="button" onClick={() => onRemove(p.path)} title="lösen">
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
