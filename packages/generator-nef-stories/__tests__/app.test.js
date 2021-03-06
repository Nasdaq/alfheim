const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require("rimraf");

describe(`generator-nef-stories`, () => {
  const componentName = "Test";

  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp"));
  });

  describe(`if 'relative-path' option is defined`, () => {
    const relPath = "some-path/";
    const filePath = path.join(
      __dirname,
      `tmp/${relPath}${componentName}/${componentName}.stories.tsx`
    );

    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "tmp"))
        .withArguments([componentName])
        .withOptions({ "relative-path": relPath });
    });

    it(`should nest the component folder into that path`, () => {
      assert.file(filePath);
    });

    it(`should import react`, () => {
      assert.fileContent(filePath, 'import React from "react";');
    });

    it(`should import the component`, () => {
      assert.fileContent(filePath, `import ${componentName} from ".";`);
    });

    it(`should create stories for component`, () => {
      assert.fileContent(
        filePath,
        `const ${componentName}Stories = {`
      );
    });

    it(`should add a basic story`, () => {
      assert.fileContent(
        filePath,
        `export const BasicUse = () => <${componentName} />;`
      );
    });

    it(`should export the component stories`, () => {
      assert.fileContent(filePath, `export default ${componentName}Stories;`);
    });
  });

  describe(`if 'relative-path' option is NOT defined`, () => {
    const filePath = path.join(
      __dirname,
      `tmp/${componentName}/${componentName}.stories.tsx`
    );

    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "tmp"))
        .withArguments([componentName]);
    });

    it(`should generate a file named '<componentName>.stories.tsx'`, () => {
      assert.file(filePath);
    });

    it(`should import react`, () => {
      assert.fileContent(filePath, 'import React from "react";');
    });

    it(`should import the component`, () => {
      assert.fileContent(filePath, `import ${componentName} from ".";`);
    });

    it(`should create stories for component`, () => {
      assert.fileContent(
        filePath,
        `const ${componentName}Stories = {`
      );
    });

    it(`should add a basic story`, () => {
      assert.fileContent(
        filePath,
        `export const BasicUse = () => <${componentName} />;`
      );
    });

    it(`should export the component stories`, () => {
      assert.fileContent(filePath, `export default ${componentName}Stories;`);
    });
  });
});
