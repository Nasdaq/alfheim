"use strict";

const fs = {
  createWriteStream: jest.fn(() => ({ write: jest.fn() })),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn()
};

module.exports = fs;
