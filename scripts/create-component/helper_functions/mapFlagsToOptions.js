#!/usr/bin/env node
"use strict";

const error = console.error;
const log = console.log;

const options = require("../options");

function mapFlagsToOptions(flags) {
  return { ...options, ...flags };
}

module.exports = { mapFlagsToOptions };
