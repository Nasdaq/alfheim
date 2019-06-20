"use strict";

import { checkDirExists } from "../checkDirExists";

import { isCwdRoot } from "../isCwdRoot";
const fs = require("fs");

jest.mock("fs");
jest.mock("../isCwdRoot", () => ({
  isCwdRoot: jest.fn()
}));

// mock process.exit to prevent it from breaking tests
jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("Exit process!");
});

describe(`check dir exists`, () => {
  describe(`if package.json is found in cwd`, () => {
    beforeEach(() => {
      isCwdRoot.mockImplementation(() => true);
    });

    describe(`if specified directory exists`, () => {
      beforeEach(() => {
        fs.existsSync = jest.fn(() => true);
      });

      it(`should return { found: true, created: false }`, () => {
        expect(checkDirExists("dirName")).toMatchObject({
          created: false,
          found: true
        });
      });
    });

    describe(`if specified directory does NOT exist`, () => {
      let result;
      beforeEach(() => {
        fs.existsSync = jest.fn(() => false);
      });

      describe(`if 'create' is defined`, () => {
        beforeEach(() => {
          result = checkDirExists("dirName", true);
        });

        it(`should create a new directory`, () => {
          expect(fs.mkdirSync).toHaveBeenCalled();
          expect(fs.mkdirSync).toHaveBeenCalledWith(expect.any(String));
        });

        it(`should return { found: false, created: true }`, () => {
          expect(result).toMatchObject({
            created: true,
            found: false
          });
        });
      });

      describe(`if 'create' is NOT defined'`, () => {
        beforeEach(() => {
          result = checkDirExists("dirName", false);
        });

        it(`should return { found: false, created: false }`, () => {
          expect(result).toMatchObject({
            created: false,
            found: false
          });
        });
      });
    });
  });

  describe(`if package.json is NOT found in cwd`, () => {
    beforeEach(() => {
      isCwdRoot.mockImplementation(() => false);
    });

    it(`should not return`, () => {
      expect(() => checkDirExists({ type: "not a string" })).toThrowError(
        "Exit process!"
      );
    });
  });
});
