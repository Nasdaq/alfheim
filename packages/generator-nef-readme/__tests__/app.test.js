const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require("rimraf");

describe(`generator-nef-readme`, () => {
  const componentName = "Test";

  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp"));
  });

  describe(`if 'relative-path' option is defined`, () => {
    const relPath = "some-path/";
    const filePath = path.join(
      __dirname,
      `tmp/${relPath}${componentName}/README.md`
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

    it(`should have the name of the component as an H1`, () => {
      assert.fileContent(filePath, `# ${componentName}`);
    });

    it(`should have a basic intro paragraph`, () => {
      assert.fileContent(
        filePath,
        `\`${componentName}\` is an easy-to-use component.`
      );
    });

    it(`should create a basic usage import example`, () => {
      assert.fileContent(
        filePath,
        `import { ${componentName} } from "@nef/core";`
      );
    });
  });

  describe(`if 'relative-path' option is NOT defined`, () => {
    const filePath = path.join(__dirname, `tmp/${componentName}/README.md`);

    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "tmp"))
        .withArguments([componentName]);
    });

    it(`should generate a file named 'README.md'`, () => {
      assert.file(filePath);
    });

    it(`should have the name of the component as an H1`, () => {
      assert.fileContent(filePath, `# ${componentName}`);
    });

    it(`should have a basic intro paragraph`, () => {
      assert.fileContent(
        filePath,
        `\`${componentName}\` is an easy-to-use component.`
      );
    });

    it(`should create a basic usage import example`, () => {
      assert.fileContent(
        filePath,
        `import { ${componentName} } from "@nef/core";`
      );
    });
  });
});
