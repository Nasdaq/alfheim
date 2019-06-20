"use strict";

import storiesTemplate from "../stories_file";

import { FileType } from "@alfheim/utils";

import faker from "faker";

describe(`Stories file template`, () => {
  it(`should be an instance of 'FileType'`, () => {
    expect(storiesTemplate instanceof FileType).toBe(true);
  });

  describe(`when 'componentName' is specified 
            and the 'makeFile' method is called`, () => {
    let result;
    const componentName = faker.random.word();

    beforeEach(() => {
      storiesTemplate.setProps({ componentName });
      result = storiesTemplate.makeFile();
    });

    it(`should return a result that contains the string:
        'export default {componentName}Stories;'`, () => {
      expect(result).toContain(`export default ${componentName}Stories;`);
    });
  });
});
