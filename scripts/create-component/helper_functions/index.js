const { appendToFile } = require("./appendToFile");
const { checkDirExists } = require("./checkDirExists");
const { createFile, createFileFromBoilerplate } = require("./createFile");
const { mapFlagsToOptions } = require("./mapFlagsToOptions");
const { overwriteHelper, overwriteQuestion } = require("./overwriteQuestion");

module.exports = {
  appendToFile,
  checkDirExists,
  createFile,
  createFileFromBoilerplate,
  mapFlagsToOptions,
  overwriteHelper,
  overwriteQuestion
};
