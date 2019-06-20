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
  }

  writing() {
    for (let i = 0; i < this.args.length; i++) {
      const name = this.args[i];
      const dir = this.options["relative-path"] || "";

      this.fs.copyTpl(
        this.templatePath("Component.stories.tsx"),
        this.destinationPath(dir + name + "/" + name + ".stories.tsx"),
        { name }
      );
    }
  }
};
