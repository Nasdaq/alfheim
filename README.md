<h1 align="center" style="border-bottom: none;">🏞 alfheim</h1>
<h3 align="center">A package to help create, maintain, and grow JS component libraries</h3>
<p align="center">
  <a href="https://travis-ci.org/Nasdaq/alfheim">
    <img alt="Travis" src="https://img.shields.io/travis/Nasdaq/alfheim/master.svg">
  </a>
  <a href="https://lerna.js.org/">
    <img alt="Lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/blob/master/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/pulls">
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
  </a>
</p>

Create and maintain React component libraries with minimal fuss!

If something doesn’t work, please file an issue.

## Quick Overview

To install the dependencies, simply run:

```bash
yarn add @alfheim/cli --dev
```

Read on to discover the available commands via the library.

## `yarn alfheim create-component` or `npm run alfheim create-component`

Use this command to create new components from a boilerplate. The generated files will contain a main component file, a stylesheet that uses `styled-components`, a testing file, a README, and a stories file for `Storybook`.

### Options

Each component should be passed as an argument to `alfheim create-component`. For example, to create `MyComponent` and `AnotherComponent` components and their associated files like so:

```bash
yarn alfheim create-component MyComponent AnotherComponent
```

When a component is created, it will have the following directory structure:

```
⊢ src/
  ⊢ components/
    ⊢ MyComponent/
      ⊢ index.tsx
      ⊢ MyComponent.styles.tsx
      ⊢ MyComponent.test.tsx
      ⊢ MyComponent.stories.tsx
      ⊢ README.md
```

In addition, `alfheim create-component` supports the following options:

- [`--parent <dir>` or `-p <dir>`](#--parent)
- [`--class-component` or `-c`](#--class-component)
- [`--enable-jsx` or `-e`](#--enable-jsx)
- [`--no-mount-tests`](#--no-mount-tests)
- [`--no-render-tests`](#--no-render-tests)
- [`--no-shallow-tests`](#--no-shallow-tests)

#### `--parent`

Use this when you want to nest a component(s) inside another component. The typical use case for this is when you don't intend to use the component(s) outside the scope of the parent. As such, component(s) nested inside `parent` component(s) should not be exported globally. When using this flag, the directory structure will look as follows:

```
⊢ src/
  ⊢ components/
    ⊢ Parent/
      ⊢ index.tsx
      ⊢ ...
      ⊢ components/
        ⊢ Child/
          ⊢ index.tsx
          ⊢ Child.styles.tsx
          ⊢ Child.test.tsx
          ⊢ Child.stories.tsx
          ⊢ README.md
```

#### `--class-component`

Pass this flag when you want the outputted component to be a class-based React component. By default, the value of this flag is set to `false` and it is recommended that you only use this flag when creating a component that has any of the following requirements:
- needs to access lifecycle methods (e.g. `componentDidMount`, `componentDidUpdate`, etc.)
- needs to have state
- needs to have custom methods and event handlers

Note that in many cases, you can also accomplish the above by using [React hooks](https://reactjs.org/docs/hooks-intro.html) and forego the need to use a class component altogether.

#### `--enable-jsx`

By default, the styles file created will appear like this:

```typescript
import styled from 'styled-components';

const StyledExampleComponent = styled.div``;

export default StyledExampleComponent;
```

This may become an issue with more complex components that receive custom props, as `styled-components` simply forwards all props it receives to the DOM, potentially resulting in console error messages about unrecognized props. By using the `--enable-jsx` flag, your styled component will instead take the following appearance:

```typescript
import styled from 'styled-components';

const StyledExampleComponent = styled(({ ...props }) => <div {...props} />)``;

export default StyledExampleComponent;
```

Using this syntax, you can prevent the props you need in the styled-component from being passed down to the DOM by including it/them in the props destructuring. 

#### `--no-mount-tests`

Use this flag to prevent the import of enzyme's `mount` method and all associated setup work. Useful when your component is very low-level and doesn't need integration testing.

#### `--no-render-tests`

Use this flag to prevent the import of enzyme's `render` method and all associated setup work. Useful when your component is very low-level and doesn't need integration testing.

#### `--no-shallow-tests`

Use this flag to prevent the import of enzyme's `shallow` method and all associated setup work. Useful when your component is very high-level and you're primarily looking to do integration testing.

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
