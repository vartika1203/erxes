import chokidar from "chokidar";
import erxesConfigDev from "./erxes-config-dev.mjs";
import fs from "fs-extra";
import _ from "lodash";
import chalk from "chalk";

const pluginNames = Object.keys(erxesConfigDev.plugins || {});
const targets = pluginNames.map(
  (pluginName) => `./packages/plugin-${pluginName}-api/.erxes/`
);

const templatePath = "./packages/api-plugin-template.erxes/";

async function copy() {
  await Promise.all(targets.map((target) => fs.remove(target)));
  const copyTasks = targets.map((target) =>
    fs.copy(templatePath, target, {
      overwrite: true,
    })
  );

  await Promise.all(copyTasks);

  for (const target of targets) {
    console.log(chalk.blueBright(`Copied ${templatePath} to ${target}`));
  }
}

const copyDebounced = _.debounce(copy, 300);

export default async function startWatchDotErxes() {
  await copy();
  // One-liner for current directory
  chokidar.watch(templatePath).on("all", copyDebounced);
}
