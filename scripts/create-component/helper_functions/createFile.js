#!/usr/bin/env node
"use strict";

const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
const { getFilePath } = require("./getFilePath");
const { overwriteHelper } = require("./overwriteQuestion");

/**
 *
 * @param newFile
 * @param newFilename
 * @param filePath
 * @param overwrite
 * @returns {boolean}
 */
function createFileHelper(newFile, newFilename, filePath, overwrite) {
  // create file while checking for overwrite
  if (overwriteHelper(overwrite, filePath)) {
    fs.writeFileSync(filePath, newFile);
    log(chalk.green(`${filePath} created.\n`));
    return true;
  }

  log(chalk.green(`Skipping ${newFilename}.\n`));
  return false;
}

/**
 *
 * @param template_filename
 * @param section_dir
 * @param parent_dir
 * @param component_name
 * @param overwrite
 * @param args
 */
function createFileFromBoilerplate(
  template_filename,
  section_dir,
  parent_dir,
  component_name,
  overwrite,
  ...args
) {
  // generate file to be created
  const templateFile = require(`../file_types/${template_filename}`);
  const newFile = templateFile.makeFile(parent_dir, component_name, ...args);
  const newFilename = templateFile.makeFilename(component_name);
  const filePath = `src/${section_dir}/${parent_dir}/${component_name}/${newFilename}`;

  // create file while checking for overwrite
  createFileHelper(newFile, newFilename, filePath, overwrite);
}

/**
 *
 * @param section_dir
 * @param parent_dir
 * @param component_name
 * @param filename
 * @param content
 */
function createFile(
  section_dir,
  parent_dir,
  component_name,
  filename,
  content = ""
) {
  // generate file to be created
  const filePath = getFilePath(
    section_dir,
    parent_dir,
    component_name,
    filename
  );

  // create file; cannot overwrite existing
  createFileHelper(content, filename, filePath, false);
}

module.exports = { createFileFromBoilerplate, createFile };
