import { open } from "@tauri-apps/plugin-dialog";
import { ExplorerPane } from "../features/explorer/ExplorerPane";
import { useFolder } from "../features/explorer/useFolder";
import { PinList } from "../features/pins/PinList";
import { usePins } from "../features/pins/usePins";
import { DieserPc } from "../features/pins/DieserPc";
import { useSplit } from "../shared/ui/useSplit";
import { Splitter } from "../shared/ui/Splitter";

export default function App() {
  const folder = useFolder();
  const pins = usePins();

  async function pick() {
    const selected = await open({ directory: true, multiple: false });
    if (typeof selected === "string") await folder.openPath(selected);
  }

  function pinCurrent() {
    if (!folder.path) return;
    const name = folder.path.split(/\\|\//).filter(Boolean).pop() || folder.path;
    pins.add({ label: name, path: folder.path });
  }

  const left = useSplit("nsexplorer.split.left", 240, 160, 480);
  const right = useSplit("nsexplorer.split.right", 280, 160, 560);

  return (
    <div style={{ display: "flex", height: "100%", background: "var(--bg)" }}>
      <aside
        style={{
          width: left.size,
          flexShrink: 0,
          overflow: "auto",
          background: "var(--bg-side)",
          padding: "8px 6px",
        }}
      >
        <DieserPc onOpen={folder.openPath} />
        <PinList
          pins={pins.pins}
          currentPath={folder.path}
          onOpen={folder.openPath}
          onPinCurrent={pinCurrent}
          onRemove={pins.remove}
          canPin={Boolean(folder.path)}
        />
      </aside>
      <Splitter onMouseDown={(e) => left.startDrag(e, "left")} />
      <div style={{ flex: 1, minWidth: 200 }}>
        <ExplorerPane
          path={folder.path}
          entries={folder.entries}
          error={folder.error}
          onOpen={folder.openPath}
          onUp={folder.goUp}
          onPick={pick}
        />
      </div>
      <Splitter onMouseDown={(e) => right.startDrag(e, "right")} />
      <aside
        style={{
          width: right.size,
          flexShrink: 0,
          overflow: "auto",
          background: "var(--bg-side)",
          color: "var(--text-dim)",
          padding: 12,
        }}
      >
        Vorschau später
      </aside>
    </div>
  );
}
