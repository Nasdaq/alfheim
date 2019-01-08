"use strict";

const { FileType } = require("../../../utils");

const readPkg = require("read-pkg");
const pkg = readPkg.sync();

const readmeTemplate = new FileType({ filename: "README.md" });

readmeTemplate.setTemplate`# ${p => p.componentName}

<!-- STORY -->

## Introduction

\`${p => p.componentName}\` is an easy-to-use component.

## Usage

\`\`\`javascript
import { ${p => p.componentName} } from '${() => pkg.name}';
\`\`\`

## Example use

\`\`\`jsx
const myPage = props => {
  return (
    <main>
      <${p => p.componentName} />
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

module.exports = readmeTemplate;
