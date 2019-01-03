#!/usr/bin/env node
"use strict";

const options = require("../options");

function mapFlagsToOptions(flags) {
  return { ...options, ...flags };
}

module.exports = { mapFlagsToOptions };
