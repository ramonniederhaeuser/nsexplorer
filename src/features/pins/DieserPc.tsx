import { useEffect, useState } from "react";
import { listPlaces, type Place } from "../../shared/api/fs";

type Props = { onOpen: (path: string) => void };

export function DieserPc({ onOpen }: Props) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    listPlaces()
      .then(setPlaces)
      .catch((e) => setErr(String(e)));
  }, []);

  const folders = places.filter((p) => p.kind === "folder");
  const drives = places.filter((p) => p.kind === "drive");

  return (
    <div style={{ marginBottom: 16 }}>
      <strong>Dieser PC</strong>
      {err && <div style={{ color: "#f88" }}>{err}</div>}
      <Group title="Ordner" items={folders} onOpen={onOpen} />
      <Group title="Laufwerke" items={drives} onOpen={onOpen} />
    </div>
  );
}

function Group({ title, items, onOpen }: { title: string; items: Place[]; onOpen: (path: string) => void }) {
  if (!items.length) return null;
  return (
    <>
      <div style={{ color: "var(--text-dim)", margin: "8px 0 4px" }}>{title}</div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((p) => (
          <li key={p.path}>
            <button
              type="button"
              onClick={() => onOpen(p.path)}
              title={p.path}
              style={{
                width: "100%",
                textAlign: "left",
                border: "none",
                background: "transparent",
                color: "inherit",
                padding: "6px 4px",
              }}
            >
              {p.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
