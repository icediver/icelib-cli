import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function copyTemplates() {
  const srcPath = path.join(__dirname, "../templates");
  const destPath = path.join(__dirname, "../../dist/templates");

  try {
    await fs.ensureDir(destPath);
    await fs.copy(srcPath, destPath);
    console.log("Шаблоны успешно скопированы");
  } catch (err) {
    console.error("Ошибка копирования шаблонов:", err);
  }
}

copyTemplates();
