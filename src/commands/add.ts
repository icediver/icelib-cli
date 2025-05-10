import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ora from "ora";
import { createComponentFile } from "../utils/file.helper.js";

// Поддержка __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function addCommand(componentName: string) {
  const spinner = ora(`Adding ${componentName}...`).start();

  try {
    // 1. Проверить конфигурацию проекта
    const configPath = path.join(process.cwd(), "icelib.json");
    if (!fs.existsSync(configPath)) {
      spinner.fail("Project not initialized. Run `icelib init` first.");
      process.exit(1);
    }

    const config = await fs.readJSON(configPath);

    // 2. Получить шаблон компонента
    let componentCode: string;
    const localTemplatePath = path.join(
      __dirname,
      "../templates/components",
      `${componentName}.tsx`,
    );

    // Останавливаем спиннер перед вопросами
    spinner.stop();

    // 3. Спросить пользователя о настройках
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Which type of component?",
        choices: ["default", "with-props", "with-hooks"],
        when: () => fs.existsSync(localTemplatePath), // Показывать только если есть локальные шаблоны
      },
      {
        type: "confirm",
        name: "withStyles",
        message: "Include CSS styles?",
        default: true,
      },
    ]);

    // Возобновляем спиннер
    spinner.start(`Preparing ${componentName} component...`);

    // Пытаемся загрузить локальный шаблон

    // 5. Записать файл в проект пользователя
    const outputDir = path.join(
      process.cwd(),
      config.componentsDir || "components",
    );
    await fs.ensureDir(outputDir);

    await createComponentFile(componentName, outputDir, spinner);
  } catch (error) {
    spinner.stop();
    if (error instanceof Error) {
      console.error(chalk.red(`\nError: ${error.message}`));
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}
