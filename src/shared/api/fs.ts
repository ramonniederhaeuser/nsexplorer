import { invoke } from "@tauri-apps/api/core";
import type { FsEntry } from "../../features/explorer/types";

export function listDir(path: string) {
  return invoke<FsEntry[]>("list_dir", { path });
}

export function parentDir(path: string) {
  return invoke<string | null>("parent_dir", { path });
}

export type Place = {
  kind: string;
  label: string;
  path: string;
};

export function listPlaces() {
  return invoke<Place[]>("list_places");
}