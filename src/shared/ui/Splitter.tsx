type Props = { onMouseDown: (e: React.MouseEvent) => void };

export function Splitter({ onMouseDown }: Props) {
  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        width: 5,
        cursor: "col-resize",
        background: "transparent",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    />
  );
}
