import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { TEMPLATE_DIR } from "../constants/url.conts.js";

export function getDirname(): string {
  return dirname(fileURLToPath(import.meta.url));
}

export function getPath(componentName?: string) {
  const __dirname = getDirname();
  return path.join(
    __dirname,
    TEMPLATE_DIR,
    componentName ? `${componentName}.tsx` : "",
  );
}
