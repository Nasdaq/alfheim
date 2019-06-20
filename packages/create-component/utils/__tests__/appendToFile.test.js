import { appendToFile } from "../appendToFile";

import fs from "fs";
jest.mock("fs");

describe(`append to file`, () => {
  const section_dir = "section_dir";
  const parent_dir = "parent_dir";
  const component_name = "component_name";
  const filename = "filename";
  const content = "content";

  const fn = () =>
    appendToFile(section_dir, parent_dir, component_name, filename, content);
  let result;

  beforeEach(() => {
    fs.existsSync.mockClear();
    fs.createWriteStream.mockClear();
  });

  describe(`if file exists`, () => {
    beforeEach(() => {
      fs.existsSync.mockImplementation(() => true);
      result = fn();
    });

    it(`it should write content to file path with append flag`, () => {
      expect(fs.createWriteStream).toHaveBeenCalledTimes(1);
      expect(fs.createWriteStream).toHaveBeenCalledWith(
        `src/${section_dir}/${parent_dir}/${component_name}/${filename}`,
        { flags: "a" }
      );
    });

    it(`should return true`, () => {
      expect(result).toBe(true);
    });
  });

  describe(`if file does NOT exist`, () => {
    beforeEach(() => {
      fs.existsSync.mockImplementation(() => false);
      result = fn();
    });

    it(`it should NOT write content`, () => {
      expect(fs.createWriteStream).toHaveBeenCalledTimes(0);
    });

    it(`should return false`, () => {
      expect(result).toBe(false);
    });
  });
});
