"use strict";

const { camelCaseToDash, FileType } = require("@alfheim/utils");

const functionalTemplate = new FileType({ filename: "index.tsx" });

functionalTemplate.setTemplate`import React from "react";
import "./${p => p.componentName}.scss";

import { withStyleClassName } from "../../../util";

interface ${p =>
  p.componentName}Props extends React.HTMLAttributes<HTMLElement> {}

const Wrapped${p => p.componentName}: React.SFC<${p =>
  p.componentName}Props> = (props: ${p => p.componentName}Props) => (
  <div {...props} data-ut="${p => camelCaseToDash(p.componentName)}" />
);

const ${p => p.componentName} = withStyleClassName(
  Wrapped${p => p.componentName}, 
  "Alfheim__${p => p.parentDir}__${p => p.componentName}"
);

export default ${p => p.componentName};`;

module.exports = functionalTemplate;
