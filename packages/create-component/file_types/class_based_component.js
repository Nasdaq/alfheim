"use strict";

const { camelCaseToDash, FileType } = require("@alfheim/utils");

const classTemplate = new FileType({ filename: "index.tsx" });

classTemplate.setTemplate`import React, { Component } from "react";
import "./${p => p.componentName}.scss";

import { withStyleClassName } from "../../../util";

export interface ${p =>
  p.componentName}Props extends React.HTMLAttributes<HTMLElement> {} 

class Wrapped${p => p.componentName} extends Component<${p =>
  p.componentName}Props> {
  public render() {
    return <div {...this.props} data-ut="${p =>
      camelCaseToDash(p.componentName)}" />;
  }
}

const ${p => p.componentName} = withStyleClassName(
  Wrapped${p => p.componentName}, 
  "Alfheim__${p => p.parentDir}__${p => p.componentName}"
);

export default ${p => p.componentName};`;

module.exports = classTemplate;
