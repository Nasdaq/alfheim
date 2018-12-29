function makeFile(parent_dir, component_name) {
  return `import React from "react";
import { storiesOf } from "@storybook/react";

import ${component_name} from "./index";
import ${component_name}Readme from "./README.md";

import { withKnobs } from "@storybook/addon-knobs/react";
import { withMarkup } from "../../../../.storybook/config";

const ${component_name}Stories = storiesOf("${parent_dir}/${component_name}", module);

// add the knobs as a decorator
${component_name}Stories.addDecorator(withKnobs);

${component_name}Stories.add("basic use", withMarkup(${component_name}Readme, () => (<${component_name} />)));

export default ${component_name}Stories;
`;
}

function makeFilename(component_name) {
  return `${component_name}.stories.tsx`;
}

module.exports = { makeFile, makeFilename };
