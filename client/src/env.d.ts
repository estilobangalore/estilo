/// <reference types="vite/client" />

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 