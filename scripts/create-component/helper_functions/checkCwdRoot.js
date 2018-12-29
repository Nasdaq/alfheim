#!/usr/bin/env node
"use strict";

const readPkg = require("read-pkg");

/**
 *
 * @returns {boolean}
 */
function checkCwdRoot() {
  try {
    return !!readPkg.sync();
  } catch (err) {
    return false;
  }
}

// export functions
module.exports = { checkCwdRoot };
