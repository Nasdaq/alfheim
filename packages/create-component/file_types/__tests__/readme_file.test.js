"use strict";

import readmeTemplate from "../readme_file";

import { FileType } from "../../../../utils";

import faker from "faker";
const readPkg = require("read-pkg");

jest.mock("read-pkg", () => ({ sync: jest.fn(() => ({ name: "alfheim" })) }));

describe(`Readme file template`, () => {
  it(`should be an instance of 'FileType'`, () => {
    expect(readmeTemplate instanceof FileType).toBe(true);
  });

  describe(`when 'componentName' is specified 
            and the 'makeFile' method is called`, () => {
    let result;
    const componentName = faker.random.word();

    beforeEach(() => {
      readmeTemplate.setProps({ componentName });
      result = readmeTemplate.makeFile();
    });

    it(`should return a result that contains the string:
        'import { {componentName} } from '{pkg}';'`, () => {
      expect(result).toContain(`import { ${componentName} } from 'alfheim';`);
    });
  });
});
