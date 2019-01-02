#!/usr/bin/env node
"use strict";

const fs = require("fs");
const readlineSync = require("readline-sync");
const chalk = require("chalk");

/**
 * Ask user y/n question that prevents moving forward unless they answer "y/"n"
 * @param question_text {string}: question to be asked user
 * @returns {boolean}: true if user answered "y", false if "n"
 */
function overwriteQuestion(question_text) {
  const question = readlineSync.question(question_text).toLowerCase();

  if (question === "y") {
    return true;
  } else if (question === "n") {
    return false;
  } else {
    console.error(
      chalk.red(
        '\nInvalid response. Please enter "y" or "n" without the quotes.'
      )
    );
    return overwriteQuestion(question_text);
  }
}

/**
 * Determine whether file should be overwritten, including in bulk or one-by-one
 * @param overwrite {boolean}: overwrite file without prompting if true
 * @param filePath {string}: relative location of the file to be overwritten
 * @returns {boolean}: true if overwriting file, false otherwise
 */
const overwriteHelper = (overwrite, filePath) => {
  let cont = false;
  // if bulk overwrite is on, then skip checking whether file exists
  if (overwrite) {
    cont = true;
  } else {
    // check if file exists
    if (fs.existsSync(filePath)) {
      cont = overwriteQuestion(
        chalk.redBright(`\n'${filePath}' already exists. Overwrite (y/n)? `)
      );
    } else {
      cont = true;
    }
  }
  return cont;
};

// export functions
module.exports = { overwriteQuestion, overwriteHelper };
