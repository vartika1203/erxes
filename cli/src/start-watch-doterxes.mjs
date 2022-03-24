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

async function deleteTargets() {
  await Promise.all(targets.map((target) => {
    console.log(chalk.blueBright`Deleting ${target}`)
    return fs.remove(target);
  }));
}

async function copy(event, path) {
  const copyTasks = targets.map((target) =>
    fs.copy(templatePath, target, {
      overwrite: true
    })
  );

  await Promise.all(copyTasks);

  for (const target of targets) {
    console.log(chalk.blueBright(`Copied ${templatePath} to ${target}`));
  }
}

const copyDebounced = _.debounce(copy, 300);

export default async function startWatchDotErxes() {
  await deleteTargets();
  await copy();
  // One-liner for current directory
  chokidar.watch(templatePath, { ignoreInitial: true }).on("all", copyDebounced);
}
