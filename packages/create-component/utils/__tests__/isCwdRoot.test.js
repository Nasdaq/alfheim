"use strict";

import { isCwdRoot } from "../isCwdRoot";

import readPkg from "read-pkg";
jest.mock("read-pkg");

describe(`Check cwd root`, () => {
  describe(`if error`, () => {
    beforeEach(() => {
      readPkg.sync.mockImplementation(() => {
        throw new Error();
      });
    });

    it(`should return false`, () => {
      expect(isCwdRoot()).toBe(false);
    });
  });

  describe(`if no error`, () => {
    describe(`if package.json in cwd`, () => {
      beforeEach(() => {
        readPkg.sync.mockImplementation(() => true);
      });

      it(`should return true`, () => {
        expect(isCwdRoot()).toBe(true);
      });
    });

    describe(`if package.json NOT in cwd`, () => {
      beforeEach(() => {
        readPkg.sync.mockImplementation(() => false);
      });

      it(`should return false`, () => {
        expect(isCwdRoot()).toBe(false);
      });
    });
  });
});
