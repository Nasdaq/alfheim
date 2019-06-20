"use strict";

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("name", {
      description: "The name(s) of the component(s) being generated",
      type: String,
      required: true
    });

    this.option("relative-path", {
      description:
        "Relative path to directory that component should be generated in (must end in '/')",
      type: String,
      alias: "p"
    });

    this.option("mount-tests", {
      alias: "m",
      description: "Generate mounted enzyme tests",
      default: true,
      type: Boolean
    });

    this.option("render-tests", {
      alias: "r",
      description: "Generate render enzyme tests",
      default: true,
      type: Boolean
    });

    this.option("shallow-tests", {
      alias: "s",
      description: "Generate shallow enzyme tests",
      default: true,
      type: Boolean
    });
  }

  intializing() {
    if (
      this.options["relative-path"] &&
      this.options["relative-path"].substr(-1) !== "/"
    ) {
      this.log.error(
        "Error: Relative path to directory must end with a slash (i.e. '/'). You entered '" +
          this.options["relative-path"] +
          "'. Aborting..."
      );
      process.exit(1);
    }

    if (
      !this.options["mount-tests"] &&
      !this.options["render-tests"] &&
      !this.options["shallow-tests"]
    ) {
      this.log.error(
        "Error: You must have at least one kind of tests (i.e. shallow, render, or mount)."
      );
      process.exit(1);
    }
  }

  writing() {
    const mappings = {
      mount: this.options["mount-tests"],
      render: this.options["render-tests"],
      shallow: this.options["shallow-tests"]
    };

    const enabled = Object.keys(mappings).filter(function(key) {
      return mappings[key];
    });

    for (let i = 0; i < this.args.length; i++) {
      const name = this.args[i];
      const dir = this.options["relative-path"] || "";

      this.fs.copyTpl(
        this.templatePath("Component.test.tsx"),
        this.destinationPath(dir + name + "/" + name + ".test.tsx"),
        {
          name,
          ...mappings,
          enabled
        }
      );
    }
  }
};
