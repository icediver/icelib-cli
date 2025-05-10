import chalk from "chalk";
import { Ora } from "ora";

export function handleError(error: unknown, spinner: Ora): never {
  spinner.stop();

  if (error instanceof Error) {
    console.error(`\nError: ${error.message}`);
    if (process.env.DEBUG) {
      console.error(chalk.gray(error.stack));
    }
  } else {
    console.error("\nAn unknown error occurred");
  }

  process.exit(1);
}
