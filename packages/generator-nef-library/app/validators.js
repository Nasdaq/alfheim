const validateNpmPkgName = require("validate-npm-package-name");

const validateRequired = value => {
  if (typeof value === "undefined" || value.length === 0) {
    return "You must enter a valid value.";
  }

  return true;
};

const validateName = value => {
  const result = validateNpmPkgName(value);

  if (!result.validForNewPackages) {
    const errors = result.errors || [];
    const warnings = result.warnings || [];

    const merged = [...errors, ...warnings];

    return merged.join("\n>> ");
  }

  return true;
};

const validateVersion = value => {
  const re = new RegExp(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/
  );

  if (value.match(re)) {
    return true;
  }

  return "Please ensure that your version follows valid semver without the 'v' character.";
};

module.exports = {
  validateRequired,
  validateName,
  validateVersion
};
