const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require("rimraf");
const sinon = require("sinon");

describe(`generator-nef-component`, () => {
  const componentName = "Test";
  let options;
  let dirPath;
  const run = options =>
    helpers
      .run(path.join(__dirname, "../app"))
      .inDir(path.join(__dirname, "tmp"))
      .withArguments([componentName])
      .withOptions(options);

  beforeEach(() => {
    options = {
      parent: undefined,
      "class-component": false,
      "mount-tests": false,
      "render-tests": false,
      "shallow-tests": false
    };
    dirPath = undefined;
  });

  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp"));
  });

  describe(`if 'parent' option is defined`, () => {
    beforeEach(() => {
      options.parent = "some-path";
      dirPath = path.join(
        __dirname,
        `tmp/src/components/${options.parent}/components/${componentName}/`
      );
    });

    describe(`if 'enable-jsx' is true`, () => {
      beforeEach(() => {
        options["enable-jsx"] = true;
      });

      describe(`if at least one type of test is true`, () => {
        beforeEach(() => {
          const index = Math.floor(Math.random() * 3);

          options["mount-tests"] = index === 0 || Math.random() > 0.5;
          options["render-tests"] = index === 1 || Math.random() > 0.5;
          options["shallow-tests"] = index === 2 || Math.random() > 0.5;

          return run(options);
        });

        it(`should always create an 'index.tsx' file`, () => {
          assert.file(dirPath + "index.tsx");
        });

        it(`should always create a 'README.md' file`, () => {
          assert.file(dirPath + "README.md");
        });

        it(`should always create a '<componentName>.stories.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.stories.tsx`);
        });

        it(`should create a '<componentName>.test.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.test.tsx`);
        });
      });

      describe(`if none of the tests are true`, () => {
        beforeEach(() => {
          options["mount-tests"] = false;
          options["render-tests"] = false;
          options["shallow-tests"] = false;
          sinon.stub(process, "exit");

          return run(options);
        });

        afterEach(() => {
          process.exit.restore();
        });

        it(`should process exit with code 1`, () => {
          sinon.assert.called(process.exit);
          sinon.assert.calledWith(process.exit, 1);
        });
      });
    });

    describe(`if 'enable-jsx' is false`, () => {
      beforeEach(() => {
        options["enable-jsx"] = false;
      });

      describe(`if at least one type of test is true`, () => {
        beforeEach(() => {
          const index = Math.floor(Math.random() * 3);

          options["mount-tests"] = index === 0 || Math.random() > 0.5;
          options["render-tests"] = index === 1 || Math.random() > 0.5;
          options["shallow-tests"] = index === 2 || Math.random() > 0.5;

          return run(options);
        });

        it(`should always create an 'index.tsx' file`, () => {
          assert.file(dirPath + "index.tsx");
        });

        it(`should always create a 'README.md' file`, () => {
          assert.file(dirPath + "README.md");
        });

        it(`should always create a '<componentName>.stories.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.stories.tsx`);
        });

        it(`should create a '<componentName>.test.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.test.tsx`);
        });
      });

      describe(`if none of the tests are true`, () => {
        beforeEach(() => {
          options["mount-tests"] = false;
          options["render-tests"] = false;
          options["shallow-tests"] = false;
          sinon.stub(process, "exit");

          return run(options);
        });

        afterEach(() => {
          process.exit.restore();
        });

        it(`should process exit with code 1`, () => {
          sinon.assert.called(process.exit);
          sinon.assert.calledWith(process.exit, 1);
        });
      });
    });
  });

  describe(`if 'parent' option is NOT defined`, () => {
    beforeEach(() => {
      options.parent = undefined;
      dirPath = path.join(__dirname, `tmp/src/components/${componentName}/`);
    });

    describe(`if 'enable-jsx' is true`, () => {
      beforeEach(() => {
        options["enable-jsx"] = true;
      });

      describe(`if at least one type of test is true`, () => {
        beforeEach(() => {
          const index = Math.floor(Math.random() * 3);

          options["mount-tests"] = index === 0 || Math.random() > 0.5;
          options["render-tests"] = index === 1 || Math.random() > 0.5;
          options["shallow-tests"] = index === 2 || Math.random() > 0.5;

          return run(options);
        });

        it(`should always create an 'index.tsx' file`, () => {
          assert.file(dirPath + "index.tsx");
        });

        it(`should always create a 'README.md' file`, () => {
          assert.file(dirPath + "README.md");
        });

        it(`should always create a '<componentName>.stories.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.stories.tsx`);
        });

        it(`should create a '<componentName>.test.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.test.tsx`);
        });
      });

      describe(`if none of the tests are true`, () => {
        beforeEach(() => {
          options["mount-tests"] = false;
          options["render-tests"] = false;
          options["shallow-tests"] = false;
          sinon.stub(process, "exit");

          return run(options);
        });

        afterEach(() => {
          process.exit.restore();
        });

        it(`should process exit with code 1`, () => {
          sinon.assert.called(process.exit);
          sinon.assert.calledWith(process.exit, 1);
        });
      });
    });

    describe(`if 'enable-jsx' is false`, () => {
      beforeEach(() => {
        options["enable-jsx"] = false;
      });

      describe(`if at least one type of test is true`, () => {
        beforeEach(() => {
          const index = Math.floor(Math.random() * 3);

          options["mount-tests"] = index === 0 || Math.random() > 0.5;
          options["render-tests"] = index === 1 || Math.random() > 0.5;
          options["shallow-tests"] = index === 2 || Math.random() > 0.5;

          return run(options);
        });

        it(`should always create an 'index.tsx' file`, () => {
          assert.file(dirPath + "index.tsx");
        });

        it(`should always create a 'README.md' file`, () => {
          assert.file(dirPath + "README.md");
        });

        it(`should always create a '<componentName>.stories.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.stories.tsx`);
        });

        it(`should create a '<componentName>.test.tsx' file`, () => {
          assert.file(dirPath + `${componentName}.test.tsx`);
        });
      });

      describe(`if none of the tests are true`, () => {
        beforeEach(() => {
          options["mount-tests"] = false;
          options["render-tests"] = false;
          options["shallow-tests"] = false;
          sinon.stub(process, "exit");

          return run(options);
        });

        afterEach(() => {
          process.exit.restore();
        });

        it(`should process exit with code 1`, () => {
          sinon.assert.called(process.exit);
          sinon.assert.calledWith(process.exit, 1);
        });
      });
    });
  });
});
