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
      `tmp/${relPath}${componentName}/${componentName}.styles.ts`
    );

    describe(`if 'enable-jsx' is true`, () => {
      beforeEach(() => {
        return helpers
          .run(path.join(__dirname, "../app"))
          .inDir(path.join(__dirname, "tmp"))
          .withArguments([componentName])
          .withOptions({ "relative-path": relPath, "enable-jsx": true });
      });

      it(`should nest the component folder into that path`, () => {
        assert.file(filePath + "x");
      });

      it(`should import react`, () => {
        assert.fileContent(filePath + "x", 'import React from "react";');
      });

      it(`should create a styled component using jsx`, () => {
        assert.fileContent(
          filePath + "x",
          `const Styled${componentName} = styled(({ ...props }) => <div {...props} />)\`\`;`
        );
      });

      it(`should default export the styled component`, () => {
        assert.fileContent(
          filePath + "x",
          `export default Styled${componentName};`
        );
      });
    });

    describe(`if 'enable-jsx' is false`, () => {
      beforeEach(() => {
        return helpers
          .run(path.join(__dirname, "../app"))
          .inDir(path.join(__dirname, "tmp"))
          .withArguments([componentName])
          .withOptions({ "relative-path": relPath, "enable-jsx": false });
      });

      it(`should nest the component folder into that path`, () => {
        assert.file(filePath);
      });

      it(`should create a styled component without jsx`, () => {
        assert.fileContent(
          filePath,
          `const Styled${componentName} = styled.div\`\`;`
        );
      });

      it(`should default export the styled component`, () => {
        assert.fileContent(filePath, `export default Styled${componentName};`);
      });
    });
  });

  describe(`if 'relative-path' option is NOT defined`, () => {
    const filePath = path.join(
      __dirname,
      `tmp/${componentName}/${componentName}.styles.ts`
    );

    describe(`if 'enable-jsx' is true`, () => {
      beforeEach(() => {
        return helpers
          .run(path.join(__dirname, "../app"))
          .inDir(path.join(__dirname, "tmp"))
          .withArguments([componentName])
          .withOptions({ "enable-jsx": true });
      });

      it(`should nest the component folder into that path`, () => {
        assert.file(filePath + "x");
      });

      it(`should import react`, () => {
        assert.fileContent(filePath + "x", 'import React from "react";');
      });

      it(`should create a styled component using jsx`, () => {
        assert.fileContent(
          filePath + "x",
          `const Styled${componentName} = styled(({ ...props }) => <div {...props} />)\`\`;`
        );
      });

      it(`should default export the styled component`, () => {
        assert.fileContent(
          filePath + "x",
          `export default Styled${componentName};`
        );
      });
    });

    describe(`if 'enable-jsx' is false`, () => {
      beforeEach(() => {
        return helpers
          .run(path.join(__dirname, "../app"))
          .inDir(path.join(__dirname, "tmp"))
          .withArguments([componentName])
          .withOptions({ "enable-jsx": false });
      });

      it(`should nest the component folder into that path`, () => {
        assert.file(filePath);
      });

      it(`should create a styled component without jsx`, () => {
        assert.fileContent(
          filePath,
          `const Styled${componentName} = styled.div\`\`;`
        );
      });

      it(`should default export the styled component`, () => {
        assert.fileContent(filePath, `export default Styled${componentName};`);
      });
    });
  });
});
