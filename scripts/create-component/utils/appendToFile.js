#!/usr/bin/env node
"use strict";

const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
const { getFilePath } = require("./getFilePath");

/**
 * Append code to an existing file
 * @param section_dir {string}: first directory inside /src,
 *                              typically "components"
 * @param parent_dir {string}: directory that groups similar components
 *                             together
 * @param component_name {string}: name of the actual component, should
 *                                 correspond to directory inside parent_dir
 * @param filename {string}: filename to be appended to
 * @param content {string}: content to append to file
 * @returns {boolean}: true if appended, false if not
 */
function appendToFile(
  section_dir,
  parent_dir,
  component_name,
  filename,
  content
) {
  const filePath = getFilePath(
    section_dir,
    parent_dir,
    component_name,
    filename
  );

  if (fs.existsSync(filePath)) {
    const stream = fs.createWriteStream(filePath, { flags: "a" });
    stream.write(content);
    log(chalk.green(`Appended content to ${filePath}.`));
    return true;
  }

  log(chalk.red("File not found, cannot append."));
  return false;
}

module.exports = { appendToFile };
