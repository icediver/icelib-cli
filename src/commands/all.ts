import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { getAvailableComponents } from "../utils/get-templates.js";
import { handleError } from "../utils/error.helper.js";
import { initializeProgressBar } from "../utils/statusbar.js";
import { createComponentFile } from "../utils/file.helper.js";

export async function allCommand() {
  const spinner = ora().start(`Preparing  components...`);

  try {
    const configPath = path.join(process.cwd(), "icelib.json");
    if (!fs.existsSync(configPath)) {
      spinner.fail("Project not initialized. Run `icelib init` first.\n");
      process.exit(1);
    }

    const config = await fs.readJSON(configPath);
    const components = await getAvailableComponents();

    spinner.stop();

    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "component",
        message: "Select components: ",
        choices: components,
      },
      {
        type: "confirm",
        name: "withStyles",
        message: "Include CSS styles?",
        default: true,
      },
    ]);

    if (answers.component.length === 0) {
      console.log(chalk.yellow("No components selected"));
      return;
    }

    const progress = await initializeProgressBar(components.length);

    const outputDir = path.join(
      process.cwd(),
      config.componentsDir || "components",
    );
    await fs.ensureDir(outputDir);

    try {
      for (const [index, componentName] of answers.component.entries()) {
        progress.update(index, {
          componentName: `Processing ${componentName}`,
        });
        spinner.start(`Processing ${componentName}...`);

        await createComponentFile(componentName, outputDir, spinner, progress);

        progress.increment();
      }
    } finally {
      progress.stop();
    }
    // progressBar.stop();
  } catch (error) {
    handleError(error, spinner);
  } // process.exit(0);
}
