"use strict";

const chalk = require("chalk");

function camelCaseToDash(str) {
  if (typeof str !== "string") {
    console.error(
      chalk.red(`
        Error: Function argument must be of type "string."
      `)
    );
    process.exit(1);
  }

  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
}

module.exports = camelCaseToDash;
