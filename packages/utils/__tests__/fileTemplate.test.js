"use strict";

import fileTemplate from "../fileTemplate";

// mock process.exit to prevent it from breaking tests
jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("Exit process!");
});

describe(`File template`, () => {
  const var1 = "hello";
  const var2 = "this is test";

  const fn = () => fileTemplate`My name is ${() => var1} and ${() => var2}.`;
  const fn2 = () => fileTemplate`My name is zoop and I'm here to 👉😎👉`;

  it(`should return a function`, () => {
    expect(typeof fn()).toBe("function");
  });

  describe(`if there is at least one interpolated value`, () => {
    let inner;
    beforeEach(() => {
      inner = fn();
    });

    describe(`if the inner function is called with args`, () => {
      let result;
      beforeEach(() => {
        result = inner({ mock: jest.fn() });
      });

      it(`should return a string`, () => {
        expect(typeof result).toBe("string");
      });

      it(`should return a value containing the all of the template string`, () => {
        const expected = [
          expect.stringContaining("My name is "),
          expect.stringContaining(" and ")
        ];

        expected.forEach(exp => {
          expect(result).toEqual(exp);
        });
      });
    });

    describe(`if the inner function is called WITHOUT args`, () => {
      it(`should call 'process.exit'`, () => {
        expect(() => inner()).toThrowError("Exit process!");
      });
    });
  });

  describe(`if there are no interpolated values`, () => {
    let inner;
    let result;
    beforeEach(() => {
      inner = fn2();
      result = inner();
    });

    it(`should return a string`, () => {
      expect(typeof result).toBe("string");
    });

    it(`should be exactly equal to the template string`, () => {
      expect(result).toBe("My name is zoop and I'm here to 👉😎👉");
    });
  });
});
