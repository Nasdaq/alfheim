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

    this.option("parent", {
      description:
        "Name of the parent component to nest new component(s) under",
      type: String,
      alias: "p"
    });

    this.option("class-component", {
      description: "Generate class-based React component",
      type: Boolean,
      alias: "c"
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

  writing() {
    const relativePath = this.options.parent
      ? "components/" + this.options.parent + "/components/"
      : "components/";

    // create index file
    this.composeWith(require.resolve("@alfheim/generator-nef-index/app"), {
      arguments: this.args,
      c: this.options["class-component"],
      p: relativePath
    });

    // create stories file
    this.composeWith(
      require.resolve("@alfheim/generator-nef-stories-mdx/app"),
      {
        arguments: this.args,
        p: relativePath
      }
    );

    // create tests file
    this.composeWith(require.resolve("@alfheim/generator-nef-tests/app"), {
      arguments: this.args,
      p: relativePath,
      m: this.options["mount-tests"],
      r: this.options["render-tests"],
      s: this.options["shallow-tests"]
    });
  }
};
