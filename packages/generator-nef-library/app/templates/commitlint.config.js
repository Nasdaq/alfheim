module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 280],
    "scope-case": [2, "always", "pascal-case"]
  }
};
