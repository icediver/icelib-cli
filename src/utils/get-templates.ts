import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getPath } from "./dirname.helper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Получает список доступных компонентов
 * @param framework - Фреймворк (react/vue/svelte)
 * @returns Promise<string[]> - Массив имен компонентов
 */
export async function getAvailableComponents(): Promise<string[]> {
  try {
    const templatesPath = getPath();
    const files = await fs.readdir(templatesPath);

    return files
      .filter((file) => !file.startsWith("_")) // Игнорируем служебные файлы
      .map((file) => path.basename(file, path.extname(file))) // Убираем расширения
      .sort(); // Сортируем по алфавиту
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`Ошибка чтения шаблонов: ${error.message}`));
    } else console.error(chalk.red(`Ошибка чтения шаблонов: ${error}`));
    return [];
  }
}
