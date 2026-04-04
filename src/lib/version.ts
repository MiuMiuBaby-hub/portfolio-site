export const APP_VERSION = __APP_VERSION__;
export const GIT_COMMIT = __GIT_COMMIT__;
export const BUILD_DATE = __BUILD_DATE__;

// Standard: V2.0.0 · f0a4 · 2026-04-04
export const VERSION_LABEL = `V${APP_VERSION} · ${GIT_COMMIT.slice(0, 4)} · ${BUILD_DATE.slice(0, 10)}`;

// Full: V2.0.0 · f0a40ce · 2026-04-04
export const VERSION_LABEL_FULL = `V${APP_VERSION} · ${GIT_COMMIT} · ${BUILD_DATE.slice(0, 10)}`;

export async function checkForUpdate() {
  try {
    const base = import.meta.env.BASE_URL;
    const res = await fetch(`${base}version.json?t=${Date.now()}`);
    if (!res.ok) return { hasUpdate: false };
    const remote = await res.json();
    const hasUpdate =
      remote.gitCommit !== GIT_COMMIT || remote.version !== APP_VERSION;
    return {
      hasUpdate,
      local: { version: APP_VERSION, gitCommit: GIT_COMMIT },
      remote: { version: remote.version, gitCommit: remote.gitCommit },
    };
  } catch {
    return { hasUpdate: false };
  }
}
