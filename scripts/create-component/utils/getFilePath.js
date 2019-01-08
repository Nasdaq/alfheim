#!/usr/bin/env node
"use strict";

/**
 * Generate string corresponding to location of file from cwd
 * @param {string} [sectionDir]: first directory inside /src, typically "components"
 * @param {string} [parentDir]: directory that groups similar components together
 * @param {string} [componentName]: name of the actual component, should correspond
 *                        to directory inside parentDir
 * @param {string} [filename]: filename to be appended to
 * @returns {string}: path to the desired file, starts with /src in cwd
 */
function getFilePath(sectionDir, parentDir, componentName, filename) {
  return `src/${[sectionDir, parentDir, componentName, filename]
    .filter(piece => piece)
    .join("/")}`;
}

module.exports = { getFilePath };
