"use strict";

import { createFile, createFileFromBoilerplate } from "../createFile";

import fs from "fs";
jest.mock("fs");
jest.mock("readline-sync");

const section_dir = "section_dir";
const parent_dir = "parent_dir";
const component_name = "component_name";

describe(`create file from boilerplate`, () => {
  const template_filename = "stories_file";
  const fn = overwrite =>
    createFileFromBoilerplate(
      template_filename,
      section_dir,
      parent_dir,
      component_name,
      overwrite
    );

  describe("if file doesn't exist", () => {
    let result;
    beforeEach(() => {
      fs.existsSync = jest.fn(() => false);
      result = fn(true);
    });

    it(`should create it with boilerplate content`, () => {
      expect(fs.writeFileSync).toBeCalledTimes(1);
      expect(fs.writeFileSync).toBeCalledWith(
        expect.any(String),
        expect.any(String)
      );
    });

    it(`should return 'true'`, () => {
      expect(result).toBe(true);
    });
  });

  describe("if file already exists", () => {
    beforeEach(() => {
      fs.existsSync = jest.fn(() => true);
    });

    describe(`if 'overwrite' is true`, () => {
      let result;
      beforeEach(() => {
        result = fn(true);
      });

      it(`should overwrite it with boilerplate content`, () => {
        expect(fs.writeFileSync).toBeCalledTimes(1);
        expect(fs.writeFileSync).toBeCalledWith(
          expect.any(String),
          expect.any(String)
        );
      });

      it(`should return 'true'`, () => {
        expect(result).toBe(true);
      });
    });

    describe(`if 'overwrite' is false`, () => {
      let result;
      beforeEach(() => {
        result = fn(false);
      });

      it(`should not attempt to create it`, () => {
        expect(fs.writeFileSync).not.toBeCalled();
      });

      it(`should return 'false'`, () => {
        expect(result).toBe(false);
      });
    });
  });
});

describe(`create file`, () => {
  const content = "content";
  const filename = "filename";
  const fn = () =>
    createFile(section_dir, parent_dir, component_name, filename, content);

  describe("if file doesn't exist", () => {
    let result;
    beforeEach(() => {
      fs.existsSync = jest.fn(() => false);
      result = fn();
    });

    it(`should create it with provided content`, () => {
      expect(fs.writeFileSync).toBeCalledTimes(1);
      expect(fs.writeFileSync).toBeCalledWith(expect.any(String), content);
    });

    it(`should return 'true'`, () => {
      expect(result).toBe(true);
    });
  });

  describe(`if file already exists`, () => {
    let result;
    beforeEach(() => {
      fs.existsSync = jest.fn(() => true);
      result = fn();
    });

    it(`should not attempt to create it`, () => {
      expect(fs.writeFileSync).not.toBeCalled();
    });

    it(`should return false`, () => {
      expect(result).toBe(false);
    });
  });
});
