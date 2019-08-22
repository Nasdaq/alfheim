# `@alfheim/generator-nef-styles`

<p>
  <a href="https://travis-ci.org/Nasdaq/alfheim">
    <img alt="Travis" src="https://img.shields.io/travis/Nasdaq/alfheim/master.svg">
  </a>
  <a href="https://www.npmjs.com/package/@alfheim/generator-nef-styles">
    <img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@alfheim/generator-nef-styles/latest">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/blob/master/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/pulls">
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
  </a>
</p>

This package is part of the battery used to create new components for the Nasdaq Experience Framework. This package creates an `<ComponentName>.styles.ts[x]` file, which contains styles for the created component. 

> _Note: It is recommended that you install and use [`generator-nef-component`](https://github.com/Nasdaq/alfheim/tree/9-add-readme-file/packages/generator-nef-component) rather than installing this package directly, unless you need to modify the individual file generators._

By default, a stylesheet for the component named `Test` created using this generator looks as follows:

```typescript
// todo: delete file if not needed
import styled from "styled-components";

const StyledTest = styled.div``;

export default StyledTest;
```

If you pass `--enable-jsx` when running this generator, your styles will be changed as follows:

```typescript
// todo: delete file if not needed
import React from "react";
import styled from "styled-components";

const StyledTest = styled(({ ...props }) => <div {...props} />)``;

export default StyledTest;
```

The purpose of the alternative syntax above is to allow the prevention of props being passed all the way down to the DOM, potentially causing console errors.

## Getting started

To install, simply run:

```
yarn add @alfheim/generator-nef-styles --dev
```

or

```
npm install @alfheim/generator-nef-styles --dev 
```

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
