"use strict";

const { FileType } = require("../../../utils");

const storiesTemplate = new FileType({ fileExtension: "stories.tsx" });

storiesTemplate.setTemplate`import React from "react";

import { storiesOf } from "@storybook/react";

import ${p => p.componentName} from "./index";
import ${p => p.componentName}Readme from "./README.md";

import { withKnobs } from "@storybook/addon-knobs/react";
import { withMarkup } from "../../../../.storybook/config";

const ${p => p.componentName}Stories = storiesOf("${p => p.componentName}/${p =>
  p.componentName}", module);

// add the knobs as a decorator
${p => p.componentName}Stories.addDecorator(withKnobs);

${p => p.componentName}Stories.add("basic use", withMarkup(${p =>
  p.componentName}Readme, () => (<${p => p.componentName} />)));

export default ${p => p.componentName}Stories;
`;

module.exports = storiesTemplate;
