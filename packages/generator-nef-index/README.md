# `@alfheim/generator-nef-index`

<p>
  <a href="https://travis-ci.org/Nasdaq/alfheim">
    <img alt="Travis" src="https://img.shields.io/travis/Nasdaq/alfheim/master.svg">
  </a>
  <a href="https://www.npmjs.com/package/@alfheim/generator-nef-index">
    <img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@alfheim/generator-nef-index/latest">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/blob/master/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/pulls">
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
  </a>
</p>

This package is part of the battery used to create new components for the Nasdaq Experience Framework. This package creates an `index.tsx` file, which contains the component. 

> _Note: It is recommended that you install and use [`generator-nef-component`](https://github.com/Nasdaq/alfheim/tree/9-add-readme-file/packages/generator-nef-component) rather than installing this package directly, unless you need to modify the individual file generators._

By default, a component named `Test` created using this generator looks as follows:

```typescript
import React from "react";

import StyledTest from "./Test.styles";

export interface TestProps extends React.HTMLAttributes<HTMLElement> {}

const Test: React.FC<TestProps> = (props: TestProps) => (
  <StyledTest {...props} />
);

export default Test;
```

If you pass in the `--class-component`/`-c` flag while creating this component, it will instead look like the following:

```typescript
import React, { Component } from "react";

import StyledTest from "./Test.styles";

export interface TestProps extends React.HTMLAttributes<HTMLElement> {} 

class Test extends Component<TestProps> {
  public render() {
    return <StyledTest {...this.props} />;
  }
}

export default Test;
```

## Getting started

To install, simply run:

```
yarn add @alfheim/generator-nef-index --dev
```

or

```
npm install @alfheim/generator-nef-index --dev 
```

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
