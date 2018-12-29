#!/usr/bin/env node
"use strict";

const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
const { getFilePath } = require("./getFilePath");

/**
 *
 * @param section_dir
 * @param parent_dir
 * @param component_name
 * @param filename
 * @param content
 * @returns {boolean}
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
