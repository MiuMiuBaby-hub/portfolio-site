/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare const __APP_VERSION__: string;
declare const __GIT_COMMIT__: string;
declare const __BUILD_DATE__: string;
