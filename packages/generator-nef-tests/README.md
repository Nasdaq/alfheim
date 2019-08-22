# `@alfheim/generator-nef-tests`

<p>
  <a href="https://travis-ci.org/Nasdaq/alfheim">
    <img alt="Travis" src="https://img.shields.io/travis/Nasdaq/alfheim/master.svg">
  </a>
  <a href="https://www.npmjs.com/package/@alfheim/generator-nef-tests">
    <img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@alfheim/generator-nef-tests/latest">
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

By default, a testing file for the component named `Test` created using this generator looks as follows:

```typescript
import { mount, render, shallow } from "enzyme";
import React from "react";
import faker from "faker";

import StyledTest from "./Test.styles";

import Test from ".";

describe("Test", () => {
  let props;
  let mountedTest;
  let renderedTest;
  let shallowTest;

  const mountTestComponent = () => {
    if (!mountedTest) {
      mountedTest = mount(<Test {...props} />);
    }
    return mountedTest;
  };

  const renderTestComponent = () => {
    if (!renderedTest) {
      renderedTest = render(<Test {...props} />);
    }
    return renderedTest;
  };

  const shallowTestComponent = () => {
    if (!shallowTest) {
      shallowTest = shallow(<Test {...props} />);
    }
    return shallowTest;
  };

  beforeEach(() => {
    props = {
      children: faker.lorem.paragraph(),
      className: faker.random.word(),
      id: faker.random.word(),
      name: faker.random.word(),
      style: { color: faker.internet.color() }
    };
    mountedTest = undefined;
    renderedTest = undefined;
    shallowTest = undefined;
  });

  // Shallow / unit tests begin here
  it(`should always render a 'StyledTest' component`, () => {
    expect(shallowTestComponent().find(StyledTest).length).toBe(1);
  });

  it(`should always pass all its props to the 'StyledTest'`, () => {
    expect(
      shallowTestComponent()
        .find(StyledTest)
        .props()
    ).toMatchObject(props);
  });

  // Render / mount / integration tests begin here
});
```

### Options

Additionally, the following options can be provided when calling the generator: 
- `--no-mount-tests`: disable mount tests when generating the test file
- `--no-render-tests`: disable render tests when generating the test file
- `--no-shallow-tests`: disable shallow tests when generating the test file

## Getting started

To install, simply run:

```
yarn add @alfheim/generator-nef-tests --dev
```

or

```
npm install @alfheim/generator-nef-tests --dev 
```

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
