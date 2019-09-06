const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require("rimraf");
const sinon = require("sinon");

describe(`generator-nef-library`, () => {
  const dirPath = path.join(__dirname, `tmp`);
  const prompts = {
    name: "my-pkg",
    description: "some description",
    version: "0.1.0",
    authorName: "some name",
    authorEmail: "some email",
    pkgMgr: "Yarn",
    host: "https://example.com"
  };
  const run = (prompts, skipGit = true) =>
    helpers
      .run(path.join(__dirname, "../app"))
      .inDir(path.join(__dirname, "tmp"))
      .withPrompts(prompts)
      .withOptions({
        "skip-install": true,
        "skip-git": skipGit
      });

  const shouldGenerateFilesNamed = fileNames => {
    for (let i = 0; i < fileNames.length; i++) {
      it(`should generate a file named '${fileNames[i]}'`, () => {
        assert.file(`${dirPath}/${fileNames[i]}`);
      });
    }
  };

  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp"));
  });

  describe(`if 'typescript' is true`, () => {
    const typescript = true;

    describe(`if 'skip-git' is true`, () => {
      beforeEach(() => {
        return run(
          {
            ...prompts,
            typescript
          },
          true
        );
      });

      it(`should NOT generate a file named ".gitignore"`, () => {
        assert.noFile(`${dirPath}/.gitignore`);
      });
    });

    describe(`if 'skip-git' is false`, () => {
      beforeEach(() => {
        return run(
          {
            ...prompts,
            typescript
          },
          false
        );
      });

      it(`should generate a file named ".gitignore"`, () => {
        assert.file(`${dirPath}/.gitignore`);
      });
    });

    describe(`it should generate files at root`, () => {
      beforeEach(() => {
        return run({
          ...prompts,
          typescript
        });
      });

      shouldGenerateFilesNamed([
        "package.json",
        ".eslintrc",
        ".npmignore",
        ".travis.yml",
        "CHANGELOG.md",
        "commitlint.config.js",
        "conventional-changelog.json",
        "images.d.ts",
        "README.md",
        "rollup.config.js",
        "tsconfig.build.json",
        "tsconfig.json",
        "tsconfig.test.json"
      ]);
    });

    describe(`it should generate files in .storybook`, () => {
      beforeEach(() => {
        return run({
          ...prompts,
          typescript
        });
      });

      shouldGenerateFilesNamed([
        ".storybook/addons.ts",
        ".storybook/config.tsx",
        ".storybook/webpack.config.js",
        ".storybook/webpack.ts-transformers.js",
        ".storybook/welcome.tsx"
      ]);
    });

    describe(`it should generate files in src/`, () => {
      describe(`if should generate @types`, () => {
        beforeEach(() => {
          return run({
            ...prompts,
            typescript
          });
        });

        const typesDir = "src/@types";

        shouldGenerateFilesNamed([
          `${typesDir}/jest/index.d.ts`,
          `${typesDir}/markdown/index.d.ts`
        ]);
      });

      describe(`it should generate 'Flex' component`, () => {
        const flexDir = "src/components/Flex";

        beforeEach(() => {
          return run({
            ...prompts,
            typescript
          });
        });

        shouldGenerateFilesNamed([
          `${flexDir}/index.tsx`,
          `${flexDir}/Flex.styles.tsx`,
          `${flexDir}/Flex.test.tsx`,
          `${flexDir}/Flex.stories.tsx`,
          `${flexDir}/README.md`
        ]);
      });
    });

    describe(`it should generate files in tests/`, () => {
      beforeEach(() => {
        return run({
          ...prompts,
          typescript
        });
      });

      shouldGenerateFilesNamed([
        "tests/.eslintrc",
        "tests/jest.setup.ts",
        "tests/jest.transform.ts"
      ]);
    });
  });

  describe(`if 'typescript' is true`, () => {
    beforeEach(() => {
      sinon.stub(process, "exit");
      sinon.stub(console, "error");
      return run({
        ...prompts,
        typescript: false
      });
    });

    afterEach(() => {
      console.error.restore();
      process.exit.restore();
    });

    it(`should call console.error once`, () => {
      sinon.assert.called(console.error);
    });

    it(`should exit process with code 1`, () => {
      sinon.assert.called(process.exit);
      sinon.assert.calledWith(process.exit, 1);
    });
  });
});
