import { watch } from "chokidar";
import { exec } from "child_process";
import { join } from "path";
import chalk from "chalk";

import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const paths = {
  components: join(__dirname, "../src/components"),
  src: join(__dirname, "../src"),
  dist: join(__dirname, "../dist"),
};

async function executeCommand(command, message) {
  console.log(chalk.magenta(`▶ ${message}`));
  return new Promise((resolve) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(chalk.red(`✖ ${message} failed:`), stderr);
      } else {
        console.log(chalk.green(`✔ ${message} completed`));
      }
      resolve();
    });
  });
}

// Первоначальная сборка
async function initialBuild() {
  await executeCommand("npm run build:tsc", "Initial TypeScript compilation");
  await executeCommand("npm run build:components", "Initial components copy");
  await executeCommand("npm install -g", "Initial global install");
}

// Настройка вотчеров
const watchers = {
  components: watch(paths.components, {
    ignored: /(^|[/\\])\../,
    ignoreInitial: true,
  }),
  src: watch(paths.src, {
    ignored: [/(^|[/\\])\../, `${paths.components}/**`],
    ignoreInitial: true,
  }),
};

// Обработчики изменений
watchers.components.on(
  "all",
  debounce(async () => {
    await executeCommand("npm run build:components", "Components update");
  }, 500),
);

watchers.src.on(
  "all",
  debounce(async () => {
    await executeCommand("npm run build:tsc", "Source recompilation");
    await executeCommand("npm install -g", "Global packages update");
  }, 1000),
);

// Запуск
console.log(chalk.cyan("🚦 Starting development watcher..."));
initialBuild().then(() => {
  console.log(chalk.cyan("\n👀 Watching for changes..."));
});

// Утилиты
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
