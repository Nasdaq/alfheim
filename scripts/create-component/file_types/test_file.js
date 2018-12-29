const faker = require("faker");

function camelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
}

function makeFile(parent_dir, component_name, shallow, render, mount) {
  // get data
  const options = { shallow, render, mount };
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
    data[key].let = data[key].defined ? `let ${key}${component_name};` : null;
  });

  // functions
  Object.keys(data).forEach(key => {
    data[key].func = data[key].defined
      ? `const ${key}TestComponent = () => {
    if (!${key}${component_name}) {
      ${key}${component_name} = ${key}(<${component_name} {...props} />)${
          key === "shallow" ? ".dive()" : ""
        };
    }
    return ${key}${component_name};
  };`
      : null;
  });

  // beforeEach inclusions
  Object.keys(data).forEach(key => {
    data[key].beforeEach = data[key].defined
      ? `${key}${component_name} = undefined;`
      : null;
  });

  return `import React from "react";
  
import { ${imports} } from "enzyme";

import ${component_name} from "./";

describe("${component_name}", () => {
  let props; 
  ${Object.values(data)
    .filter(value => value.defined)
    .map(value => value.let)
    .join("\n  ")}
  
  ${Object.values(data)
    .filter(value => value.defined)
    .map(value => value.func)
    .join("\n\n  ")}

  beforeEach(() => {
    props = {
      children: <div>${faker.lorem.paragraph()}</div>,
      className: "${faker.random.word()}",
      id: "${faker.random.word()}",
      name: "${faker.random.word()}",
      style: { color: "${faker.internet.color()}" }
      
    };
    ${Object.values(data)
      .filter(value => value.defined)
      .map(value => value.beforeEach)
      .join("\n    ")}
  });

  // Shallow / unit tests begin here
  it(\`should always render a 'div[data-ut="${camelCaseToDash(
    component_name
  )}"]' element\`, () => {
    expect(
      shallowTestComponent().find('div[data-ut="${camelCaseToDash(
        component_name
      )}"]').length
    ).toBe(1);
  });

  it(\`should always pass all its props to the 'div[data-ut="${camelCaseToDash(
    component_name
  )}"]' element\`, () => {
    expect(
      shallowTestComponent()
        .find('div[data-ut="${camelCaseToDash(component_name)}"]')
        .props()
    ).toMatchObject({...props, className: \`Alfheim__${parent_dir}__${component_name} \${props.className}\`});
  });  
 
  // Render / mount / integration tests begin here
});`;
}

function makeFilename(component_name) {
  return `${component_name}.test.tsx`;
}

module.exports = { makeFile, makeFilename };
