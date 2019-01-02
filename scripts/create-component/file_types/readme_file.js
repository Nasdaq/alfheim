const readPkg = require("read-pkg");
const pkg = readPkg.sync();

function makeFile(parent_dir, component_name) {
  return `# ${component_name}

<!-- STORY -->

## Introduction

\`${component_name}\` is an easy-to-use component.

## Usage

\`\`\`javascript
import { ${component_name} } from '${pkg.name}';
\`\`\`

## Example use

\`\`\`jsx
const myPage = props => {
  return (
    <main>
      <${component_name} />
    </main>
  );
};
\`\`\`

## Properties

| propName    | propType                           | defaultValue | isRequired | Description                                     |
| ----------- | ---------------------------------- | ------------ | ---------- | ----------------------------------------------- |
| \`children\`  | oneOfType( node, arrayOf( node ) ) | -            | -          | is the children to be passed into component     |
| \`className\` | string                             | -            | -          | is the class name of the component              |
| \`id\`        | string                             | -            | -          | name to be passed to the DOM                    |
| \`name\`      | string                             | -            | -          | id to be passed to the DOM                      |
| \`style\`     | object                             | -            | -          | is the style object to be passed into component |
`;
}

function makeFilename(component_name) {
  return "README.md";
}

module.exports = { makeFile, makeFilename };
