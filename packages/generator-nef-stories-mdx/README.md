# `@alfheim/generator-nef-stories-mdx`

<p>
  <a href="https://travis-ci.org/Nasdaq/alfheim">
    <img alt="Travis" src="https://img.shields.io/travis/Nasdaq/alfheim/master.svg">
  </a>
  <a href="https://www.npmjs.com/package/@alfheim/generator-nef-stories">
    <img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@alfheim/generator-nef-stories-mdx/latest">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/blob/master/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/pulls">
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
  </a>
</p>

This package is part of the battery used to create new components for the Nasdaq Experience Framework. This package creates an `<ComponentName>.stories.mdx` file, which contains component stories to display in Storybook.

**In order to use `MDX` files in your Storybook, you will need to install the `@storybook/addon-docs` addon. For more information on how to get set up, please see [here](https://storybook.js.org/docs/formats/mdx-syntax/).**

> _Note: It is recommended that you install and use [`generator-nef-component`](https://github.com/Nasdaq/alfheim/tree/9-add-readme-file/packages/generator-nef-component) rather than installing this package directly, unless you need to modify the individual file generators._

By default, a component named `Test` created using this generator looks as follows:

```jsx
import { Meta, Story, Preview } from "@storybook/addon-docs/blocks";
import { withKnobs } from "@storybook/addon-knobs/react";

import Test from ".";

<Meta title="Test" component={Test} decorators={[withKnobs]} />

# Test

<Preview>
  <Story name="basic use">
    <Test />
  </Story>
</Preview>

## Introduction

`Test` is a React component.

## Usage

\`\`\`javascript
import { Test } from "@nef/core";
\`\`\`

## Properties

| propName    | propType                           | defaultValue | isRequired | Description                                     |
| ----------- | ---------------------------------- | ------------ | ---------- | ----------------------------------------------- |
| `className` | string                             | -            | -          | is the class name of the component              |
| `children`  | oneOfType( node, arrayOf( node ) ) | -            | -          | is the children to be passed into component     |
| `style`     | object                             | -            | -          | is the style object to be passed into component |
| `name`      | string                             | -            | -          | id to be passed to the DOM                      |
| `id`        | string                             | -            | -          | name to be passed to the DOM                    |

```

## Getting started

To install, simply run:

```

yarn add @alfheim/generator-nef-stories-mdx --dev

```

or

```

npm install @alfheim/generator-nef-stories-mdx --dev

```

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
