"use strict";

import scssTemplate from "../scss_file";

import { FileType } from "@alfheim/utils";

import faker from "faker";

describe(`Scss file template`, () => {
  it(`should be an instance of 'FileType'`, () => {
    expect(scssTemplate instanceof FileType).toBe(true);
  });

  describe(`when 'parentDir' and 'componentName' are specified 
            and the 'makeFile' method is called`, () => {
    let result;
    const parentDir = faker.random.word();
    const componentName = faker.random.word();

    beforeEach(() => {
      scssTemplate.setProps({ parentDir, componentName });
      result = scssTemplate.makeFile();
    });

    it(`should return a result that contains the string:
        '.Alfheim__{parentDir}__{componentName}'`, () => {
      expect(result).toContain(`.Alfheim__${parentDir}__${componentName}`);
    });
  });
});
