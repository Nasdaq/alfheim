function camelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
}

function makeFile(parent_dir, component_name) {
  return `import React, { Component } from "react";
import "./${component_name}.scss";

import { withStyleClassName } from "../../../util";

export interface ${component_name}Props extends React.HTMLAttributes<HTMLElement> {} 

class Wrapped${component_name} extends Component<${component_name}Props> {
  public render() {
    return <div {...this.props} data-ut="${camelCaseToDash(component_name)}" />;
  }
}

const ${component_name} = withStyleClassName(
  Wrapped${component_name}, 
  "Alfheim__${parent_dir}__${component_name}"
);

export default ${component_name};`;
}

function makeFilename() {
  return `index.tsx`;
}

module.exports = { makeFile, makeFilename };
