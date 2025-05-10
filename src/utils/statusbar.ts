import chalk from "chalk";
import ora from "ora";

export async function initializeProgressBar(totalComponents: number) {
  try {
    const { default: cliProgress } = await import("cli-progress");

    const progressBar = new cliProgress.SingleBar(
      {
        format: "{componentName} |{bar}| {percentage}% | {value}/{total}",
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: false, // Возвращаем курсор
        clearOnComplete: false,
        stopOnComplete: true, // Теперь останавливаем, но не очищаем
        barsize: 30,
        linewrap: false,
      },
      cliProgress.Presets.shades_grey,
    );

    progressBar.start(totalComponents, 0, { componentName: "Starting..." });

    return {
      increment: () => progressBar.increment(),
      update: (index: number, payload: { componentName: string }) => {
        progressBar.update(index, payload);
      },
      stop: () => {
        // Обновляем до 100% и останавливаем
        progressBar.update(totalComponents, {
          componentName: chalk.green("Completed"),
        });
        progressBar.stop();
        console.log(); // Добавляем пустую строку
      },
    };
  } catch (error) {
    console.error(chalk.yellow("Progress bar disabled, using fallback..."));

    let processed = 0;
    const spinner = ora(`Processed 0/${totalComponents}`).start();

    return {
      increment: () => {
        processed++;
        spinner.text = `Processed ${processed}/${totalComponents}`;
      },
      update: (index: number, payload: { componentName: string }) => {
        spinner.text = `${payload.componentName} (${index + 1}/${totalComponents})`;
      },
      stop: () => {
        spinner.succeed(`Completed ${totalComponents} components!`);
      },
    };
  }
}
