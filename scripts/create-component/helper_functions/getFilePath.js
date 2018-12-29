#!/usr/bin/env node
"use strict";

/**
 *
 * @param section_dir
 * @param parent_dir
 * @param component_name
 * @param filename
 * @returns {string}
 */
function getFilePath(section_dir, parent_dir, component_name, filename) {
  return `src/${[section_dir, parent_dir, component_name, filename]
    .filter(piece => piece)
    .join("/")}`;
}

module.exports = { getFilePath };
