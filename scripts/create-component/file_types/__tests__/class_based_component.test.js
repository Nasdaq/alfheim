"use strict";

import classTemplate from "../class_based_component";

import { FileType } from "../../../../utils";

import faker from "faker";

describe(`Class based component template`, () => {
  it(`should be an instance of 'FileType'`, () => {
    expect(classTemplate instanceof FileType).toBe(true);
  });

  describe(`when 'componentName' is specified 
            and the 'makeFile' method is called`, () => {
    let result;
    const componentName = faker.random.word();

    beforeEach(() => {
      classTemplate.setProps({ componentName });
      result = classTemplate.makeFile();
    });

    it(`should return a result that contains the string:
        'import React, { Component } from "react"'`, () => {
      expect(result).toContain('import React, { Component } from "react"');
    });

    it(`should return a result that contains the string:
        'class Wrapped{componentName} extends Component'`, () => {
      expect(result).toContain(
        `class Wrapped${componentName} extends Component`
      );
    });

    it(`should return a result that contains the string:
        'export default {componentName};'`, () => {
      expect(result).toContain(`export default ${componentName};`);
    });
  });
});
