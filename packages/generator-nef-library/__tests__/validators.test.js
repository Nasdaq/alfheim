const {
  validateRequired,
  validateName,
  validateVersion
} = require("../app/validators");
const faker = require("faker");
const expect = require("chai").expect;

const shouldReturnAStringWith = (fn, value) => {
  it(`should return a string when called with '${value}'`, () => {
    expect(fn(value)).to.be.a("string");
  });
};

const shouldReturnTrueWith = (fn, value) => {
  it(`should return true when called with '${value}'`, () => {
    expect(fn(value)).to.be.true;
  });
};

describe(`validateRequired`, () => {
  describe(`when the value is invalid`, () => {
    shouldReturnAStringWith(validateRequired);
    shouldReturnAStringWith(validateRequired, "");
  });

  describe(`when the value is valid`, () => {
    shouldReturnTrueWith(validateRequired, faker.random.word());
  });
});

describe(`validateName`, () => {
  describe(`when the name is invalid`, () => {
    shouldReturnAStringWith(validateName);
    shouldReturnAStringWith(validateName, "@alfheim/@cli");
    shouldReturnAStringWith(validateName, ".pkg");
    shouldReturnAStringWith(validateName, "_pkg");
    shouldReturnAStringWith(validateName, "pkg)");
    shouldReturnAStringWith(validateName, "pkg!");
    shouldReturnAStringWith(validateName, "pkg(");
  });

  describe(`when the name is valid`, () => {
    shouldReturnTrueWith(validateName, "@alfheim/cli");
    shouldReturnTrueWith(validateName, "alfheim");
    shouldReturnTrueWith(validateName, "123alfheim");
    shouldReturnTrueWith(validateName, "alfheim-hello");
    shouldReturnTrueWith(validateName, "nasdaq.com");
  });
});

describe(`validateVersion`, () => {
  describe(`when the version is invalid`, () => {
    shouldReturnAStringWith(validateVersion, "0");
    shouldReturnAStringWith(validateVersion, "1");
    shouldReturnAStringWith(validateVersion, "v1");
    shouldReturnAStringWith(validateVersion, "v0.0.1");
  });

  describe(`when the version is valid`, () => {
    shouldReturnTrueWith(validateVersion, "0.0.1");
    shouldReturnTrueWith(validateVersion, "0.1.1");
    shouldReturnTrueWith(validateVersion, "1.0.1");
    shouldReturnTrueWith(validateVersion, "2.10.1");
  });
});
