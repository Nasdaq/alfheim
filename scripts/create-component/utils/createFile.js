#!/usr/bin/env node
"use strict";

const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
const { getFilePath } = require("./getFilePath");
const { overwriteHelper } = require("./overwriteQuestion");

const fileTypes = require("../file_types");

/**
 * Create a new file at specified location, optionally overwrite if exists
 * @param newFile {string}: the contents of the file to be created
 * @param newFilename {string}: name of the file to be created
 * @param filePath {string}: relative location of the file to be created
 * @param overwrite {boolean}: if true, overwrite file if it already exists
 * @returns {boolean}: true if file is created, false if not
 */
function createFileHelper(newFile, newFilename, filePath, overwrite) {
  // create file while checking for overwrite
  if (overwriteHelper(overwrite, filePath)) {
    fs.writeFileSync(filePath, newFile);
    log(chalk.green(`${filePath} created.`));
    return true;
  }

  log(chalk.yellow(`Skipping ${newFilename}.`));
  return false;
}

/**
 *
 * @param templateFilename
 * @param sectionDir
 * @param parentDir
 * @param componentName
 * @param overwrite
 * @param args
 */
function createFileFromBoilerplate(
  templateFilename,
  sectionDir,
  parentDir,
  componentName,
  overwrite,
  ...args
) {
  // generate file to be created
  const templateFile = fileTypes[templateFilename];

  templateFile.setProps({ parentDir, componentName });
  const newFile = templateFile.makeFile(...args);
  const newFilename = templateFile.makeFilename();

  const filePath = `src/${sectionDir}/${parentDir}/${componentName}/${newFilename}`;

  // create file while checking for overwrite
  return createFileHelper(newFile, newFilename, filePath, overwrite);
}

/**
 *
 * @param sectionDir
 * @param parentDir
 * @param componentName
 * @param filename
 * @param content
 */
function createFile(
  sectionDir,
  parentDir,
  componentName,
  filename,
  content = ""
) {
  // generate file to be created
  const filePath = getFilePath(sectionDir, parentDir, componentName, filename);

  // create file; cannot overwrite existing
  return createFileHelper(content, filename, filePath, false);
}

module.exports = { createFileFromBoilerplate, createFile };
