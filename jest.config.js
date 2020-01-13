module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
      "identity-obj-proxy"
  },
  // setupTestFrameworkScriptFile: "<rootDir>/jest.setup.js",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/lib/", "/es/"],
  testRegex: "(/test/.*|\\.(test|spec))\\.(js|jsx)$",
  transform: {
    "^.+\\.js$": "<rootDir>/jest.transform.js",
    "^.+\\.md?$": "markdown-loader-jest"
  },
  verbose: true
};
