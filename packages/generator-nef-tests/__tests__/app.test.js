const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const rimraf = require("rimraf");

const getAssertionFn = shouldContain =>
  shouldContain ? assert.fileContent : assert.noFileContent;
const getNotFn = shouldContain => (shouldContain ? "" : "NOT ");
const getAssignmentVarPrefix = type => {
  switch (type) {
    case "shallow":
      return "shallow";
    case "render":
    case "mount":
    default:
      return type + "ed";
  }
};

describe(`generator-nef-tests`, () => {
  const componentName = "Test";
  const options = {
    "relative-path": undefined,
    "mount-tests": false,
    "render-tests": false,
    "shallow-tests": false
  };

  // helper functions to keep tests DRY
  const genericTestSetup = (filePath, shouldContain, type) => {
    const assertionFn = getAssertionFn(shouldContain);
    const notFn = getNotFn(shouldContain);
    const varPrefix = getAssignmentVarPrefix(type);

    it(`should ${notFn}define a reassignable variable '${varPrefix}<componentName>'`, () => {
      assertionFn(filePath, `let ${varPrefix}${componentName};`);
    });

    it(`should ${notFn}define a function '${type}TestComponent'`, () => {
      assertionFn(filePath, `const ${type}TestComponent = () => {`);
    });

    it(`should ${notFn}reassign '${varPrefix}<componentName>' to be undefined`, () => {
      assertionFn(filePath, `${varPrefix}${componentName} = undefined;`);
    });
  };

  const shallowTests = (filePath, shouldContain) => {
    const assertionFn = getAssertionFn(shouldContain);
    const notFn = getNotFn(shouldContain);

    genericTestSetup(filePath, shouldContain, "shallow");

    it(`should ${notFn}generate a shallow test that checks to ensure that the styled component is rendered`, () => {
      assertionFn(
        filePath,
        `it(\`should always render a 'Styled${componentName}' component\`, () => {`
      );
    });

    it(`should ${notFn}generate a shallow test checks that the styled component receives all the props`, () => {
      assertionFn(
        filePath,
        `it(\`should always pass all its props to the 'Styled${componentName}'\`, () => {`
      );
    });
  };

  const renderTests = (filePath, shouldContain) => {
    genericTestSetup(filePath, shouldContain, "render");
  };

  const mountTests = (filePath, shouldContain) => {
    genericTestSetup(filePath, shouldContain, "mount");
  };

  const integrationString = (filePath, shouldContain) => {
    const assertionFn = getAssertionFn(shouldContain);
    const notFn = getNotFn(shouldContain);

    it(`should ${notFn}add a string to guide user re: integration tests`, () => {
      assertionFn(filePath, "// Render / mount / integration tests begin here");
    });
  };

  const describeShallow = contents => {
    const { filePath, shallow, render, mount, newFileDescription } = contents;

    describe(`if 'shallow-tests' is ${JSON.stringify(shallow)}`, () => {
      // the yeoman-assert library doesn't let you catch errors, 
      // so we'll do it this way
      if (!shallow && !render && !mount) {
        it(`should NOT create the test file and throw an error`, () => {
          assert.noFile(filePath);
        });

        return;
      }

      beforeEach(() => {
        options["shallow-tests"] = shallow;

        return helpers
          .run(path.join(__dirname, "../app"))
          .inDir(path.join(__dirname, "tmp"))
          .withArguments([componentName])
          .withOptions(options);
      });

      it(newFileDescription, () => {
        assert.file(filePath);
      });

      it(`should always import the right enzyme dependencies`, () => {
        const deps = [];

        if (mount) deps.push("mount");
        if (render) deps.push("render");
        if (shallow) deps.push("shallow");

        assert.fileContent(
          filePath,
          `import { ${deps.join(",")} } from "enzyme";`
        );
      });

      it(`should always import React`, () => {
        assert.fileContent(filePath, `import React from "react";`);
      });

      it(`should always import faker`, () => {
        assert.fileContent(filePath, `import faker from "faker";`);
      });

      it(`should always import the component being tested and its styled-component variant`, () => {
        assert.fileContent(filePath, `import ${componentName}, { Styled${componentName} } from ".";`);
      });

      it(`should always define a reassignable 'props' object`, () => {
        assert.fileContent(filePath, `let props;`);
      });

      it(`should always assign an object to props`, () => {
        assert.fileContent(filePath, `props = {`);
      });

      shallowTests(filePath, shallow);
      renderTests(filePath, render);
      mountTests(filePath, mount);
      integrationString(filePath, render || mount);
    });
  };

  const describeRender = contents => {
    const { filePath, render, mount, newFileDescription } = contents;

    describe(`if 'render-tests' is ${JSON.stringify(render)}`, () => {
      beforeEach(() => {
        options["render-tests"] = render;
      });

      describeShallow({
        newFileDescription,
        filePath,
        shallow: true,
        render,
        mount
      });

      describeShallow({
        newFileDescription,
        filePath,
        shallow: false,
        render,
        mount
      });
    });
  };

  const describeMount = contents => {
    const { filePath, mount, newFileDescription } = contents;

    describe(`if 'mount-tests' is ${JSON.stringify(mount)}`, () => {
      beforeEach(() => {
        options["mount-tests"] = mount;
      });

      describeRender({
        newFileDescription,
        filePath,
        render: true,
        mount
      });

      describeRender({
        newFileDescription,
        filePath,
        render: false,
        mount
      });
    });
  };

  const describeAll = contents => {
    const { filePath, newFileDescription } = contents;

    describeMount({
      newFileDescription,
      filePath,
      mount: true
    });

    describeMount({
      newFileDescription,
      filePath,
      mount: false
    });
  };

  // actual tests
  afterEach(() => {
    rimraf.sync(path.join(__dirname, "tmp"));
  });

  describe(`if 'relative-path' option is defined`, () => {
    const relPath = "some-path/";
    const filePath = path.join(
      __dirname,
      `tmp/${relPath}${componentName}/${componentName}.test.tsx`
    );
    const newFileDescription = `should nest the component folder into that path and create a file named '<componentName>.test.tsx'`;

    beforeEach(() => {
      options["relative-path"] = relPath;
    });

    describeAll({
      newFileDescription,
      filePath
    });
  });

  describe(`if 'relative-path' option is NOT defined`, () => {
    const filePath = path.join(
      __dirname,
      `tmp/${componentName}/${componentName}.test.tsx`
    );

    const newFileDescription = `should generate a file named '<componentName>.test.tsx'`;

    beforeEach(() => {
      options["relative-path"] = undefined;
    });

    describeAll({
      newFileDescription,
      filePath
    });
  });
});
