import chalk from "chalk";
import fs from "fs-extra";
import path, { dirname } from "path";
import { Ora } from "ora";
import axios from "axios";
import { GITHUB_REPO_URL } from "../constants/url.conts.js";
import { fileURLToPath } from "url";

// Поддержка __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getComponentTemplate(
  componentName: string,
  spinner: Ora,
): Promise<string> {
  const localTemplatePath = path.join(
    __dirname,
    "../templates/components",
    `${componentName}.tsx`,
  );

  // Try local template first
  if (fs.existsSync(localTemplatePath)) {
    return fs.readFile(localTemplatePath, "utf-8");
  }

  // Fallback to remote template
  spinner.text = `Downloading ${chalk.bold(componentName)} template...`;
  try {
    const response = await axios.get(
      `${GITHUB_REPO_URL}/${componentName}.tsx`,
      {
        timeout: 5000,
        responseType: "text",
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Template for ${componentName} not found.\n` +
        `Checked locations:\n` +
        `- Local: ${localTemplatePath}\n` +
        `- Remote: ${GITHUB_REPO_URL}/${componentName}.tsx`,
    );
  }
}
