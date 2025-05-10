#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { allCommand } from "./commands/all.js";

const program = new Command();

console.log(
  chalk.blue(figlet.textSync("IceLib", { horizontalLayout: "full" })),
);

program
  .version("1.0.0")
  .description("A CLI for managing UI components like shadcn/ui");

program
  .command(chalk.yellow("init"))
  .description(chalk.green("Initialize the configuration"))
  .action(initCommand);

program
  .command(chalk.blue("add <component>"))
  .description(chalk.green("  Add a component to your project"))
  .action(addCommand);

program
  .command(chalk.blue("all"))
  .description(chalk.green("Explore and add components"))
  .action(allCommand);

program.parse(process.argv);
