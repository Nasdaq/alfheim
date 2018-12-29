function makeFile(parent_dir, component_name) {
  return `/* todo: delete file if not needed */
@import "../../../styles/scss/main";

.Alfheim__${parent_dir}__${component_name} { 
}`;
}

function makeFilename(component_name) {
  return `${component_name}.scss`;
}

module.exports = { makeFile, makeFilename };
