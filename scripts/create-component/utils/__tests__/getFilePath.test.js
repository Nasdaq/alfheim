"use strict";

import { getFilePath } from "../getFilePath";

describe(`get file path`, () => {
  describe(`if no parameters are defined`, () => {
    it(`should return 'src/'`, () => {
      expect(getFilePath()).toBe("src/");
    });
  });

  describe(`if up to 4 parameters are defined`, () => {
    const tfRandom = () => Math.floor(Math.random() * 2) === 1;
    const rand = [tfRandom(), tfRandom(), tfRandom(), tfRandom()];

    it(`should return 'src/' followed by those parameters separated by slashes 
        (in order: sectionDir, parentDir, componentName, filename)`, () => {
      const res = getFilePath(
        rand[0] && "sectionDir",
        rand[1] && "parentDir",
        rand[2] && "componentName",
        rand[3] && "filename"
      );
      const params = res.split("/");

      expect(params.length).toBe(rand.filter(str => str).length + 1);
    });
  });
});
