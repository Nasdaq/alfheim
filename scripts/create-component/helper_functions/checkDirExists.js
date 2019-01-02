#!/usr/bin/env node
"use strict";

const fs = require("fs");
const chalk = require("chalk");
const error = console.error;
const log = console.log;
const { checkCwdRoot } = require("./checkCwdRoot");

/**
 * Check that a directory exists, optionally create if it doesn't
 * @param dirName {string}: relative location of directory to be checked
 * @param create {boolean}: indicate whether the directory should be created
 *                          if it doesn't already exist
 * @returns {{found: boolean, created: boolean}}
 */
function checkDirExists(dirName, create = false) {
  const dir = process.cwd() + "/" + dirName;

  if (!checkCwdRoot()) {
    error(
      chalk.red(`
      Error: No "package.json" found, please ensure that your current working directory
      is the root of your project and/or that your project has been properly initialized.
    `)
    );
    process.exit(1);
  }

  if (fs.existsSync(dir)) {
    log(chalk.green(`Found '${dir}' directory.`));
    return { found: true, created: false };
  } else {
    log(chalk.yellow(`'${dir}' directory was not found.`));
    if (create) {
      log(chalk.yellow(`Creating '${dir}'...`));
      fs.mkdirSync(dir);
      log(chalk.green(`'${dir}' directory created.\n`));
      return { found: false, created: true };
    }
    return { found: false, created: false };
  }
}

// export functions
module.exports = { checkDirExists };
