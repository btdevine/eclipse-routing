/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Must be created at mapbox.com. */
  readonly VITE_MAPBOX_GL_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
