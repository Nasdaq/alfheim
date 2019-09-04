"use strict";

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    if (this.args.length > 1) {
      console.error(
        "You can only create one component library at a time. Please try again with only one unnamed argument."
      );
      process.exit(1);
    }
  }

  async prompting() {
    const validateRequired = value => {
      if (value.length === 0) {
        return "You must enter a valid value.";
      }

      return true;
    };

    const validateName = value => {
      const atLength = (value.match(/[@]/g) || []).length;
      const slashLength = (value.match(/[\/]/g) || []).length;

      if (atLength > 1) {
        return "You may only have 1 '@' symbol at the beginning.";
      } else if (atLength === 1 && value.indexOf("@") !== 0) {
        return "The '@' symbol can only be used at the beginning";
      } else if (value.length === 0) {
        return "You must enter a valid name.";
      } else if (slashLength > 1) {
        return "You can only use slash once in the name.";
      }

      return true;
    };

    const validateVersion = value => {
      const re = new RegExp(
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/
      );

      if (value.match(re)) {
        return true;
      }

      return "Please ensure that your version follows valid semver without the 'v' character.";
    };

    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project/package name",
        default: this.appname,
        validate: validateName
      },
      {
        type: "input",
        name: "description",
        message: "Enter a description for your package",
        default: "This component library is going to be awesome!"
      },
      {
        type: "input",
        name: "version",
        message: "What version should we use?",
        default: "0.1.0",
        validate: validateVersion
      },
      {
        type: "input",
        name: "authorName",
        message: "What's your name?",
        default: "Haldun Anil",
        validate: validateRequired
      },
      {
        type: "input",
        name: "authorEmail",
        message: "What's your email?",
        default: "haldun.anil@nasdaq.com",
        validate: validateRequired
      },
      {
        type: "list",
        name: "pkg-mgr",
        message: "Use which package manager?",
        choices: ["Yarn", "NPM"],
        default: "Yarn"
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Use TypeScript?",
        default: true
      }
    ]);
  }

  _mergeSortObjects(object1, object2) {
    const unordered = { ...object1, ...object2 };
    const ordered = {};

    Object.keys(unordered)
      .sort()
      .forEach(key => {
        ordered[key] = unordered[key];
      });

    return ordered;
  }
};
