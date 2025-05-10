import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function initCommand() {
  const spinner = ora("Initializing project...").start();

  try {
    // 1. Проверить, не инициализирован ли уже проект
    const configPath = path.join(process.cwd(), "icelib.json");
    if (fs.existsSync(configPath)) {
      spinner.warn("Project already initialized.");
      return;
    }

    spinner.stop();

    // 2. Задать вопросы пользователю для конфигурации
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "componentsDir",
        message: "Where should components be installed?",
        default: "components/ui/lib",
      },
      {
        type: "list",
        name: "framework",
        message: "Which framework are you using?",
        choices: ["React", "Vue", "Svelte", "Solid"],
        default: "React",
      },
      {
        type: "confirm",
        name: "withTypescript",
        message: "Are you using TypeScript?",
        default: true,
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Are you using Tailwind CSS?",
        default: true,
      },
    ]);
    spinner.start("Initializing project...");

    // 3. Создать конфигурационный файл
    const config = {
      $schema: "./node_modules/icelib/schema.json",
      framework: answers.framework,
      withTypescript: answers.withTypescript,
      tailwind: answers.tailwind,
      componentsDir: answers.componentsDir,
      // Другие настройки по мере необходимости
    };

    await fs.writeJSON(configPath, config, { spaces: 2 });

    // 4. Создать базовую структуру каталогов
    await fs.ensureDir(path.join(process.cwd(), answers.componentsDir));

    // 5. Опционально: добавить базовые файлы
    if (answers.tailwind) {
      try {
        const templatePath = path.join(
          __dirname,
          "../templates/tailwind", // Изменил путь с "../../" на "../"
        );

        if (fs.existsSync(templatePath)) {
          await fs.copy(templatePath, process.cwd());
          spinner.info(chalk.blue("Tailwind templates added"));
        } else {
          spinner.warn(
            chalk.yellow("Tailwind templates not found at: " + templatePath),
          );
        }
      } catch (err) {
        if (err instanceof Error)
          spinner.warn(
            chalk.yellow(`Failed to add Tailwind templates: ${err?.message}`),
          );
        else spinner.warn(chalk.yellow("Failed to add Tailwind templates"));
      }
    }
    spinner.succeed(chalk.green("Project initialized successfully!"));
    console.log(chalk.blue("\nNext steps:"));
    console.log(
      `1. Run ${chalk.cyan("icelib add <component>")} to add components`,
    );
    console.log(
      `2. Customize your configuration in ${chalk.cyan("icelib.json")}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(chalk.red(`Initialization failed: ${error.message}`));
    } else {
      spinner.fail(chalk.red("Initialization failed"));
    }
    process.exit(1);
  }
}
