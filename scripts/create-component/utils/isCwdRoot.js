#!/usr/bin/env node
"use strict";

const readPkg = require("read-pkg");

/**
 * Check if current working directory is the root of a valid JS project
 * @returns {boolean}: true if 'package.json' found in cwd, false if not
 */
function isCwdRoot() {
  try {
    return !!readPkg.sync();
  } catch (err) {
    return false;
  }
}

// export functions
module.exports = { isCwdRoot };
