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
      {error && <div style={{ padding: 8, color: "#b00" }}>{error}</div>}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, overflow: "auto", flex: 1 }}>
        {entries.map((e) => (
          <li
            key={e.path}
            onDoubleClick={() => e.is_dir && onOpen(e.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            style={{ padding: "6px 10px", cursor: e.is_dir ? "pointer" : "default" }}
          >
            {e.is_dir ? "📁 " : "📄 "}
            {e.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
