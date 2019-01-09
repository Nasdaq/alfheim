"use strict";

const chalk = require("chalk");
const fileTemplate = require("./fileTemplate");

/**
 *
 * @param {Object} [props] - Object containing parameters
 * @param {string} [props.filename] - Name of the file to be created, including ext.
 * @param {string} [props.parentDir] - Name of directory to create component subdirectory in
 * @param {string} [props.componentName] - Optional unless 'filename' is undefined
 * @param {string} [props.fileExtension] - Optional unless 'filename' is undefined
 * @param {function} [props.template] - Tagged template literal to be used as file template
 * @constructor
 */
class FileType {
  constructor(props) {
    this.props = { ...props };
  }

  getProps() {
    return this.props;
  }

  setProps(props) {
    this.props = { ...this.props, ...props };
  }

  setTemplate(strings, ...values) {
    this.props.template = fileTemplate(strings, ...values);
  }

  makeFile() {
    const { template, ...rest } = this.props;

    if (!template) {
      console.error(
        chalk.red(`
          Error: No template file found. Did you forget to
          call the "setTemplate" method?
        `)
      );
      process.exit(1);
    }

    return template(rest);
  }

  makeFilename() {
    const { filename, componentName, fileExtension } = this.props;

    if (!filename && (!componentName || !fileExtension)) {
      console.error(
        chalk.red(`
        Error: To call this function, you must set either:
        - a filename OR 
        - a componentName AND a fileExtension, 
      `)
      );
      process.exit(1);
    }

    return filename || `${componentName}.${fileExtension}`;
  }
}

module.exports = FileType;
