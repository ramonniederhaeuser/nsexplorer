import type { MouseEvent } from "react";

type Props = { onMouseDown: (e: MouseEvent) => void };

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
      onMouseEnter={(ev) => {
        ev.currentTarget.style.background = "var(--accent)";
      }}
      onMouseLeave={(ev) => {
        ev.currentTarget.style.background = "transparent";
      }}
    />
  );
}
