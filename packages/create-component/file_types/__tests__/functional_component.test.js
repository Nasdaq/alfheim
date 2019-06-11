"use strict";

import functionalTemplate from "../functional_component";

import { FileType } from "../../../../utils";

import faker from "faker";

describe(`Functional component template`, () => {
  it(`should be an instance of 'FileType'`, () => {
    expect(functionalTemplate instanceof FileType).toBe(true);
  });

  describe(`when 'componentName' is specified 
            and the 'makeFile' method is called`, () => {
    let result;
    const componentName = faker.random.word();

    beforeEach(() => {
      functionalTemplate.setProps({ componentName });
      result = functionalTemplate.makeFile();
    });

    it(`should return a result that contains the string:
        'import React from "react"'`, () => {
      expect(result).toContain('import React from "react"');
    });

    it(`should return a result that contains the string:
        'const Wrapped{componentName}: React.SFC<{componentName}Props> ='`, () => {
      expect(result).toContain(
        `const Wrapped${componentName}: React.SFC<${componentName}Props> =`
      );
    });

    it(`should return a result that contains the string:
        'export default {componentName};'`, () => {
      expect(result).toContain(`export default ${componentName};`);
    });
  });
});
