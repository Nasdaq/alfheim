const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require("rimraf");

describe(`generator-nef-stories-mdx`, () => {
  const componentName = "Test";

  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp"));
  });

  describe(`if 'relative-path' option is defined`, () => {
    const relPath = "some-path/";
    const filePath = path.join(
      __dirname,
      `tmp/${relPath}${componentName}/${componentName}.stories.mdx`
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

    it(`should import necessary '@storybook/addon-docs' modules`, () => {
      assert.fileContent(
        filePath,
        `import { Meta, Story, Preview } from "@storybook/addon-docs/blocks";`
      );
    });

    it(`should import necessary '@storybook/addon-knobs' modules`, () => {
      assert.fileContent(
        filePath,
        `import { withKnobs } from "@storybook/addon-knobs/react";`
      );
    });

    it(`should import the component`, () => {
      assert.fileContent(filePath, `import ${componentName} from ".";`);
    });

    it(`should create stories for component`, () => {
      assert.fileContent(
        filePath,
        `<Meta title="${componentName}" component={${componentName}} decorators={[withKnobs]} />`
      );
    });

    it(`should add the name of the component as an H1`, () => {
      assert.fileContent(filePath, `# ${componentName}`);
    });

    it(`should add a basic story`, () => {
      assert.fileContent(
        filePath,
        `<Preview>\n  <Story name="basic use">\n    <${componentName} />\n  </Story>\n</Preview>`
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
    const filePath = path.join(
      __dirname,
      `tmp/${componentName}/${componentName}.stories.mdx`
    );

    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "tmp"))
        .withArguments([componentName]);
    });

    it(`should generate a file named '<componentName>.stories.mdx'`, () => {
      assert.file(filePath);
    });

    it(`should import necessary '@storybook/addon-docs' modules`, () => {
      assert.fileContent(
        filePath,
        `import { Meta, Story, Preview } from "@storybook/addon-docs/blocks";`
      );
    });

    it(`should import necessary '@storybook/addon-knobs' modules`, () => {
      assert.fileContent(
        filePath,
        `import { withKnobs } from "@storybook/addon-knobs/react";`
      );
    });

    it(`should import the component`, () => {
      assert.fileContent(filePath, `import ${componentName} from ".";`);
    });

    it(`should create stories for component`, () => {
      assert.fileContent(
        filePath,
        `<Meta title="${componentName}" component={${componentName}} decorators={[withKnobs]} />`
      );
    });

    it(`should add the name of the component as an H1`, () => {
      assert.fileContent(filePath, `# ${componentName}`);
    });

    it(`should add a basic story`, () => {
      assert.fileContent(
        filePath,
        `<Preview>\n  <Story name="basic use">\n    <${componentName} />\n  </Story>\n</Preview>`
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
