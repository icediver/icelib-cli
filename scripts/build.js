import { execSync } from "child_process";
import { blue, green, red, yellow } from "chalk";

function run(command, description) {
  console.log(blue(`🚀 ${description}`));
  try {
    execSync(command, { stdio: "inherit" });
    console.log(green(`✅ ${description} завершено`));
    return true;
  } catch (error) {
    console.error(red(`❌ Ошибка при ${description}:`), error);
    process.exit(1);
  }
}

// Основной процесс сборки
console.log(yellow("Начало процесса сборки..."));

run("tsc", "Компиляция TypeScript");
run("node scripts/copy-components.js", "Копирование компонентов");
run("npm install -g", "Глобальная установка пакетов");

console.log(green.bold("\n🎉 Сборка успешно завершена!"));
