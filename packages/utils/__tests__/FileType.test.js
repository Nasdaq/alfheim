"use strict";

import FileType from "../FileType";
import faker from "faker";

// mock process.exit to prevent it from breaking tests
jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("Exit process!");
});

describe(`File type`, () => {
  let file;
  let args;
  let args2;

  beforeEach(() => {
    file = undefined;
    args = argsGenerator();
    args2 = argsGenerator();
  });

  const argsGenerator = () => {
    const keys = Array.from(Array(Math.floor(Math.random() * 10)).keys());

    let res = {};
    keys.forEach(() => {
      res[faker.random.word()] = faker.random.boolean();
    });

    return res;
  };

  it(`should be a class that takes in an arbitrary number of args in the constructor`, () => {
    const file = new FileType(argsGenerator());
    expect(typeof file).toBe("object");
    expect(file instanceof FileType).toBe(true);
  });

  describe(`when the class is initialized with args`, () => {
    beforeEach(() => {
      file = new FileType(args);
    });

    it(`should get an object containing the args
        via the 'getProps' method`, () => {
      expect(file.getProps()).toMatchObject(args);
    });

    it(`should overwrite and add to the props via the 'setProps' method`, () => {
      file.setProps(args2);

      expect(file.getProps()).toMatchObject({ ...args, ...args2 });
    });
  });

  describe(`when the class is NOT initialized with args`, () => {
    beforeEach(() => {
      file = new FileType();
    });

    it(`should get an empty object via the 'getProps' method`, () => {
      expect(file.getProps()).toEqual({});
    });

    it(`should add to the props via the 'setProps' method`, () => {
      const args = argsGenerator();
      file.setProps(args);

      expect(file.getProps()).toMatchObject(args);
    });
  });

  describe(`if 'template' key is defined in the props`, () => {
    beforeEach(() => {
      file = new FileType({ template: jest.fn(), ...args });
    });

    it(`should call 'template' value fn with object containing all props 
        except 'template' when 'makeFile' method is called`, () => {
      file.makeFile();

      const { template, ...rest } = file.getProps();

      expect(template).toHaveBeenCalled();
      expect(template).toHaveBeenCalledWith(rest);
    });
  });

  describe(`if 'template' key is NOT defined in the props`, () => {
    beforeEach(() => {
      file = new FileType();
    });

    it(`should call 'process.exit' and return none 
        when 'makeFile' method is called`, () => {
      expect(() => file.makeFile()).toThrowError("Exit process!");
    });
  });

  describe(`if 'filename' key is defined in the props`, () => {
    beforeEach(() => {
      file = new FileType({ filename: "filename", ...args });
    });

    it(`should return 'filename' when 'makeFilename' method is called`, () => {
      expect(file.makeFilename()).toBe(file.getProps().filename);
    });
  });

  describe(`if 'filename' key is NOT defined in the props`, () => {
    beforeEach(() => {
      file = new FileType();
    });

    describe(`if 'componentName' AND 'fileExtension' is defined in the props`, () => {
      beforeEach(() => {
        file.setProps({ componentName: "Hello", fileExtension: "js" });
      });

      it(`should return '{componentName}.{fileExtension}' 
          when 'makeFilename' method is called`, () => {
        const { componentName, fileExtension } = file.getProps();

        expect(file.makeFilename()).toBe(`${componentName}.${fileExtension}`);
      });
    });

    describe(`if 'componentName' OR 'fileExtension' is NOT defined in the props`, () => {
      beforeEach(() => {
        const keys = ["componentName", "fileExtension"];
        const randKey = keys[Math.floor(Math.random() * 2)];

        const obj = {};
        obj[randKey] = faker.random.word();
        file.setProps(obj);
      });

      it(`should call 'process.exit' and return none 
          when 'makeFilename' method is called`, () => {
        expect(() => file.makeFilename()).toThrowError("Exit process!");
      });
    });
  });
});
