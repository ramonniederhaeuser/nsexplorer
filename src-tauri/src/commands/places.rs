use serde::Serialize;

#[derive(Serialize)]
pub struct Place {
    pub kind: String,
    pub label: String,
    pub path: String,
}

#[tauri::command]
pub fn list_places() -> Result<Vec<Place>, String> {
    let mut out = Vec::new();

    if let Some(p) = dirs::home_dir() {
        out.push(place("folder", "Benutzer", p));
    }
    if let Some(p) = dirs::desktop_dir() {
        out.push(place("folder", "Desktop", p));
    }
    if let Some(p) = dirs::download_dir() {
        out.push(place("folder", "Downloads", p));
    }
    if let Some(p) = dirs::document_dir() {
        out.push(place("folder", "Dokumente", p));
    }

    out.extend(list_drives());
    Ok(out)
}

fn place(kind: &str, label: &str, path: impl AsRef<std::path::Path>) -> Place {
    Place {
        kind: kind.into(),
        label: label.into(),
        path: path.as_ref().to_string_lossy().into(),
    }
}

#[cfg(windows)]
fn list_drives() -> Vec<Place> {
    use windows_sys::Win32::Storage::FileSystem::{GetLogicalDrives, GetVolumeInformationW};

    let mask = unsafe { GetLogicalDrives() };
    let mut drives = Vec::new();

    for i in 0..26u32 {
        if mask & (1 << i) == 0 {
            continue;
        }
        let letter = (b'A' + i as u8) as char;
        let root = format!("{letter}:\\");
        let label = volume_label(&root)
            .map(|n| format!("{n} ({letter}:)"))
            .unwrap_or_else(|| format!("Lokaler Datenträger ({letter}:)"));
        drives.push(Place {
            kind: "drive".into(),
            label,
            path: root,
        });
    }
    drives
}

#[cfg(windows)]
fn volume_label(root: &str) -> Option<String> {
    use std::os::windows::ffi::OsStrExt;
    use windows_sys::Win32::Storage::FileSystem::GetVolumeInformationW;

    let wide: Vec<u16> = std::ffi::OsStr::new(root)
        .encode_wide()
        .chain(std::iter::once(0))
        .collect();
    let mut name = [0u16; 261];
    let ok = unsafe {
        GetVolumeInformationW(
            wide.as_ptr(),
            name.as_mut_ptr(),
            name.len() as u32,
            std::ptr::null_mut(),
            std::ptr::null_mut(),
            std::ptr::null_mut(),
            std::ptr::null_mut(),
            0,
        )
    };
    if ok == 0 {
        return None;
    }
    let len = name.iter().position(|&c| c == 0).unwrap_or(name.len());
    let s = String::from_utf16_lossy(&name[..len]);
    let s = s.trim().to_string();
    if s.is_empty() {
        None
    } else {
        Some(s)
    }
}

#[cfg(not(windows))]
fn list_drives() -> Vec<Place> {
    Vec::new()
}