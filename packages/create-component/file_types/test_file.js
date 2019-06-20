"use strict";

const { camelCaseToDash, FileType } = require("@alfheim/utils");

// create a subclass
class TestFileType extends FileType {
  constructor(props) {
    super(props);
  }

  makeFile(shallow, render, mount) {
    // deconstruct props
    const { componentName } = this.props;

    // get data
    const options = { mount, render, shallow };
    const data = {};
    Object.keys(options).forEach(key => {
      data[key] = {
        defined: options[key],
        let: null,
        func: null,
        beforeEach: null
      };
    });

    // get imports
    const imports = Object.keys(data)
      .filter(key => data[key].defined)
      .join(", ");

    // let statements
    Object.keys(data).forEach(key => {
      data[key].let = data[key].defined ? `let ${key}${componentName};` : null;
    });

    // functions
    Object.keys(data).forEach(key => {
      data[key].func = data[key].defined
        ? `const ${key}TestComponent = () => {
    if (!${key}${componentName}) {
      ${key}${componentName} = ${key}(<${componentName} {...props} />)${
            key === "shallow" ? ".dive()" : ""
          };
    }
    return ${key}${componentName};
  };`
        : null;
    });

    // beforeEach inclusions
    Object.keys(data).forEach(key => {
      data[key].beforeEach = data[key].defined
        ? `${key}${componentName} = undefined;`
        : null;
    });

    // now add imports and data into 'props' object
    this.setProps({ imports, data });

    // don't forget to call the original makeFile
    return super.makeFile();
  }
}

// initialize!
const testTemplate = new TestFileType({ fileExtension: "test.tsx" });
testTemplate.setTemplate`import React from "react";
  
import { ${p => p.imports} } from "enzyme";

import ${p => p.componentName} from "./";

import faker from "faker";

describe("${p => p.componentName}", () => {
  let props; 
  ${p =>
    Object.values(p.data)
      .filter(value => value.defined)
      .map(value => value.let)
      .join("\n  ")}
  
  ${p =>
    Object.values(p.data)
      .filter(value => value.defined)
      .map(value => value.func)
      .join("\n\n  ")}

  beforeEach(() => {
    props = {
      children: faker.lorem.paragraph(),
      className: faker.random.word(),
      id: faker.random.word(),
      name: faker.random.word(),
      style: { color: faker.internet.color() }
      
    };
    ${p =>
      Object.values(p.data)
        .filter(value => value.defined)
        .map(value => value.beforeEach)
        .join("\n    ")}
  });

  // Shallow / unit tests begin here
  it(\`should always render a 'div[data-ut="${p =>
    camelCaseToDash(p.componentName)}"]' element\`, () => {
    expect(
      shallowTestComponent().find('div[data-ut="${p =>
        camelCaseToDash(p.componentName)}"]').length
    ).toBe(1);
  });

  it(\`should always pass all its props to the 'div[data-ut="${p =>
    camelCaseToDash(p.componentName)}"]' element\`, () => {
    expect(
      shallowTestComponent()
        .find('div[data-ut="${p => camelCaseToDash(p.componentName)}"]')
        .props()
    ).toMatchObject({...props, className: \`Alfheim__${p => p.parentDir}__${p =>
  p.componentName} \${props.className}\`});
  });  
 
  // Render / mount / integration tests begin here
});`;

module.exports = testTemplate;
