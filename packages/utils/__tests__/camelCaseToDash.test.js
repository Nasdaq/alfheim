"use strict";

import camelCaseToDash from "../camelCaseToDash";

// mock process.exit to prevent it from breaking tests
jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("Exit process!");
});

describe(`camelcase to dash`, () => {
  describe(`if 'str' is of type 'string'`, () => {
    let value;
    beforeEach(() => {
      value = camelCaseToDash("thisIsSomeString");
    });

    it(`should return a dashified version in lowercase`, () => {
      expect(value).toBe("this-is-some-string");
    });
  });

  describe(`if 'str' is NOT of type 'string'`, () => {
    it(`should not return`, () => {
      expect(() => camelCaseToDash({ type: "not a string" })).toThrowError(
        "Exit process!"
      );
    });
  });
});
