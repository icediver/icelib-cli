import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { Ora } from "ora";
import axios from "axios";
import { GITHUB_REPO_URL, TEMPLATE_DIR } from "../constants/url.conts.js";
import { getDirname } from "./dirname.helper.js";

const __dirname = getDirname();

export async function getComponentTemplate(
  componentName: string,
  spinner: Ora,
): Promise<string> {
  const localTemplatePath = path.join(
    __dirname,
    TEMPLATE_DIR,
    `${componentName}.tsx`,
  );

  // Try local template first
  if (fs.existsSync(localTemplatePath)) {
    try {
      return fs.readFile(localTemplatePath, "utf-8");
    } catch (error) {
      throw new Error(
        `Failed to read local template for ${componentName}: ${error instanceof Error ? error.message : error}`,
      );
    }
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
