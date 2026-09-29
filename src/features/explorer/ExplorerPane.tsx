import type { FsEntry } from "./types";

type Props = {
  path: string;
  entries: FsEntry[];
  error: string;
  onOpen: (path: string) => void;
  onUp: () => void;
  onPick: () => void;
};

export function ExplorerPane({ path, entries, error, onOpen, onUp, onPick }: Props) {
  return (
    <section style={{ display: "flex", flexDirection: "column", height: "100%", minWidth: 0 }}>
      <header
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          padding: "6px 8px",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-side)",
        }}
      >
        <button type="button" onClick={onPick}>
          Ordner öffnen
        </button>
        <button type="button" onClick={onUp} disabled={!path}>
          Zurück
        </button>
        <div
          style={{
            flex: 1,
            background: "var(--bg)",
            border: "1px solid var(--line)",
            borderRadius: 4,
            padding: "4px 8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {path || "Dieser PC"}
        </div>
      </header>
      {error && <div style={{ padding: 8, color: "#f88" }}>{error}</div>}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, overflow: "auto", flex: 1 }}>
        {entries.map((entry) => (
          <li
            key={entry.path}
            onDoubleClick={() => entry.is_dir && onOpen(entry.path)}
            onMouseEnter={(ev) => {
              ev.currentTarget.style.background = "var(--bg-hover)";
            }}
            onMouseLeave={(ev) => {
              ev.currentTarget.style.background = "transparent";
            }}
            style={{
              padding: "6px 10px",
              cursor: entry.is_dir ? "pointer" : "default",
            }}
          >
            {entry.is_dir ? "📁 " : "📄 "}
            {entry.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
