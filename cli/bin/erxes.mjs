#!/usr/bin/env node
"use strict";

import _ from "lodash";
import { program } from "commander";
import actionDev from "../src/dev.mjs";
import actionDevGenerate from "../src/dev-generate.mjs";
import actionDevStart from "../src/dev-start.mjs";

const cmdDev = program.command("dev");

cmdDev.action(actionDev);

cmdDev.command("generate").action(actionDevGenerate);
cmdDev.command("start").action(actionDevStart);

program.parse();

// const program = require('commander');
// const packageJSON = require('../package.json');

/**
 * Normalize version argument
 *
 * `$ erxes -v`
 * `$ erxes -V`
 * `$ erxes --version`
 * `$ erxes version`
 */

// program.allowUnknownOption(true);

// // Expose version.

// // Make `-v` option case-insensitive.
// process.argv = _.map(process.argv, arg => {
//   return arg === '-V' ? '-v' : arg;
// });

// // `$ erxes version` (--version synonym)
// program
//   .command('version')
//   .description('output your version of Erxes')
//   .action(() => {
//     console.log(packageJSON.version);
//   });

// // `$ start erxes`
// program
//   .command('start')
//   .option('--ignoreDownload', 'Ingore latest updates download')
//   .description('Run erxes')
//   .action(startCmd);

// // `$ update erxes`
// program
//   .command('update')
//   .description('Download the latest changes of erxes')
//   .action(updateCmd);

// program.parse(process.argv);
