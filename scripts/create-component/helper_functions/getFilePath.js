#!/usr/bin/env node
"use strict";

/**
 * Generate string corresponding to location of file from cwd
 * @param section_dir: first directory inside /src, typically "components"
 * @param parent_dir: directory that groups similar components together
 * @param component_name: name of the actual component, should correspond
 *                        to directory inside parent_dir
 * @param filename: filename to be appended to
 * @returns {string}: path to the desired file, starts with /src in cwd
 */
function getFilePath(section_dir, parent_dir, component_name, filename) {
  return `src/${[section_dir, parent_dir, component_name, filename]
    .filter(piece => piece)
    .join("/")}`;
}

module.exports = { getFilePath };
