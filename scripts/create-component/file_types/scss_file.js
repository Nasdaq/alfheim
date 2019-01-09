"use strict";

const { FileType } = require("../../../utils");

const scssTemplate = new FileType({ fileExtension: "scss" });

scssTemplate.setTemplate`/* todo: delete file if not needed */
@import "../../../styles/scss/main";

.Alfheim__${p => p.parentDir}__${p => p.componentName} {
}`;

module.exports = scssTemplate;
