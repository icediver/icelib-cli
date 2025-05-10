// scripts/copy-components.js
import { ensureDir, copy } from "fs-extra";
import { join } from "path";
import chalk from "chalk";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = join(__dirname, "../src/templates");
const destDir = join(__dirname, "../dist/templates");

async function copyComponents() {
  try {
    console.log(chalk.blue("Копирование компонентов..."));
    await ensureDir(destDir);
    await copy(sourceDir, destDir);
    console.log(chalk.green("✅ Компоненты скопированы"));
  } catch (err) {
    console.error(chalk.red("❌ Ошибка копирования:"), err);
    process.exit(1);
  }
}

export default copyComponents;

copyComponents();
