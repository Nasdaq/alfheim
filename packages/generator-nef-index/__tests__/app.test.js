const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require("rimraf");

describe(`generator-nef-index`, () => {
  const componentName = "Test";
  const filePath = path.join(__dirname, `tmp/${componentName}/index.tsx`);

  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp"));
  });

  describe(`if 'class-component' option is 'true'`, () => {
    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "tmp"))
        .withArguments([componentName])
        .withOptions({ "class-component": true });
    });

    it(`should generate a file named 'index.tsx'`, () => {
      assert.file(filePath);
    });

    it(`should import React and the Component base class`, () => {
      assert.fileContent(filePath, 'import React, { Component } from "react"');
    });

    it("should create a basic interface that extends HTMLElement", () => {
      assert.fileContent(
        filePath,
        `export interface ${componentName}Props extends React.HTMLAttributes<HTMLElement>`
      );
    });

    it(`should create class based component`, () => {
      assert.fileContent(
        filePath,
        `class ${componentName} extends Component<${componentName}Props>`
      );
    });

    it(`should default export the component`, () => {
      assert.fileContent(filePath, `export default ${componentName}`);
    });
  });

  describe(`if 'class-component' option is 'false'`, () => {
    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "tmp"))
        .withArguments([componentName])
        .withOptions({ "class-component": false });
    });

    it(`should generate a file named 'index.tsx'`, () => {
      assert.file(filePath);
    });

    it(`should import React`, () => {
      assert.fileContent(filePath, 'import React from "react"');
    });

    it("should create a basic interface that extends HTMLElement", () => {
      assert.fileContent(
        filePath,
        `export interface ${componentName}Props extends React.HTMLAttributes<HTMLElement>`
      );
    });

    it(`should create a functional component`, () => {
      assert.fileContent(
        filePath,
        `const ${componentName}: React.SFC<${componentName}Props> = (props: ${componentName}Props) => (`
      );
    });

    it(`should default export the component`, () => {
      assert.fileContent(filePath, `export default ${componentName}`);
    });
  });

  describe(`if 'relative-path' option is defined`, () => {
    const relPath = "some-path/";
    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "tmp"))
        .withArguments([componentName])
        .withOptions({ "relative-path": relPath });
    });

    it(`should nest the component folder into that path`, () => {
      assert.file(
        path.join(__dirname, `tmp/${relPath}/${componentName}/index.tsx`)
      );
    });
  });
});
