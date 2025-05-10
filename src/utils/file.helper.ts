import { Ora } from "ora";
import path from "path";
import { getComponentTemplate } from "./get-component.js";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";

export async function createComponentFile(
  componentName: string,
  outputDir: string,
  spinner: Ora,
  progress?: { increment: () => void },
): Promise<void> {
  const outputPath = path.join(outputDir, `${componentName}.tsx`);

  // Проверка и запрос на перезапись
  if (await handleExistingFile(componentName, outputPath, spinner)) {
    return;
  }

  // Получение шаблона компонента
  spinner.start(`Processing ${componentName}...`);
  const componentCode = await getComponentTemplate(componentName, spinner);

  // Запись файла
  await writeFileWithErrorHandling(outputPath, componentCode, componentName);

  // Обновление прогресса
  if (progress) progress.increment();

  spinner.succeed(
    chalk.green(
      `Added ${componentName} to ${path.relative(process.cwd(), outputPath)}`,
    ),
  );
}

// Вспомогательные функции
async function handleExistingFile(
  componentName: string,
  filePath: string,
  spinner: Ora,
): Promise<boolean> {
  if (fs.existsSync(filePath)) {
    spinner.stop();
    const { overwrite } = await inquirer.prompt({
      type: "confirm",
      name: "overwrite",
      message: `Component ${componentName} already exists. Overwrite?`,
      default: false,
    });

    if (!overwrite) {
      spinner.info(chalk.yellow(`Skipping ${componentName}`));
      return true;
    }
    spinner.start();
  }
  return false;
}

async function writeFileWithErrorHandling(
  filePath: string,
  content: string,
  componentName: string,
): Promise<void> {
  try {
    await fs.writeFile(filePath, content);
  } catch (error) {
    throw new Error(
      `Failed to create component ${componentName} at ${filePath}: ${error instanceof Error ? error.message : error}`,
    );
  }
}
