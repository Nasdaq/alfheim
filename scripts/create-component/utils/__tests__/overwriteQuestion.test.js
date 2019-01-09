"use strict";

import { overwriteHelper } from "../overwriteQuestion";

const fs = require("fs");
const readlineSync = require("readline-sync");
jest.mock("fs");
jest.mock("readline-sync");

describe(`overwrite helper`, () => {
  describe(`if 'overwrite' is defined`, () => {
    let result;
    beforeEach(() => {
      result = overwriteHelper(true, "filepath");
    });

    it(`should return 'true' / write`, () => {
      expect(result).toBe(true);
    });
  });

  describe(`if 'overwrite' is NOT defined`, () => {
    let result;
    const fn = () => overwriteHelper(false, "filepath");

    describe(`if file to overwrite exists`, () => {
      beforeEach(() => {
        fs.existsSync = jest.fn(() => true);
        result = fn();
      });

      it(`should ask overwrite question`, () => {
        expect(readlineSync.keyInYNStrict).toHaveBeenCalled();
      });
    });

    describe(`if file to overwrite does NOT exist`, () => {
      beforeEach(() => {
        fs.existsSync = jest.fn(() => false);
        result = fn();
      });

      it(`should return 'true' / write`, () => {
        expect(result).toBe(true);
      });
    });
  });
});
