import { useCallback, useState } from "react";
import { listDir, parentDir } from "../../shared/api/fs";
import type { FsEntry } from "./types";

export function useFolder() {
  const [path, setPath] = useState("");
  const [entries, setEntries] = useState<FsEntry[]>([]);
  const [error, setError] = useState("");

  const openPath = useCallback(async (next: string) => {
    setError("");
    try {
      const list = await listDir(next);
      setPath(next);
      setEntries(list);
    } catch (e) {
      setError(String(e));
    }
  }, []);

  const goUp = useCallback(async () => {
    if (!path) return;
    const parent = await parentDir(path);
    if (parent) await openPath(parent);
  }, [path, openPath]);

  return { path, entries, error, openPath, goUp };
}