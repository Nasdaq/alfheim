# `@alfheim/generator-nef-stories`

<p>
  <a href="https://travis-ci.org/Nasdaq/alfheim">
    <img alt="Travis" src="https://img.shields.io/travis/Nasdaq/alfheim/master.svg">
  </a>
  <a href="https://www.npmjs.com/package/@alfheim/generator-nef-stories">
    <img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@alfheim/generator-nef-stories/latest">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/blob/master/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/pulls">
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
  </a>
</p>

This package is part of the battery used to create new components for the Nasdaq Experience Framework. This package creates an `<ComponentName>.stories.tsx` file, which contains component stories to display in Storybook. 

> _Note: It is recommended that you install and use [`generator-nef-component`](https://github.com/Nasdaq/alfheim/tree/9-add-readme-file/packages/generator-nef-component) rather than installing this package directly, unless you need to modify the individual file generators._

By default, a component named `Test` created using this generator looks as follows:

```typescript
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import marked from "marked";

import TestReadme from "./README.md";

import Test from ".";

const TestStories = storiesOf("Test", module)
  .addDecorator(withKnobs)
  .addParameters({
    info: { text: marked(TestReadme) }
  })
  .add("basic use", () => <Test />);

export default TestStories;
```

## Getting started

To install, simply run:

```
yarn add @alfheim/generator-nef-stories --dev
```

or

```
npm install @alfheim/generator-nef-stories --dev 
```

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
