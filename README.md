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

In addition, `alfheim create-component` supports the following options:

- [`--parent <dir>` or `-p <dir>`](#--parent)
- [`--class-component` or `-c`](#--class-component)
- [`--enable-jsx` or `-e`](#--enable-jsx)
- [`--no-mount-tests`](#--no-mount-tests)
- [`--no-render-tests`](#--no-render-tests)
- [`--no-shallow-tests`](#--no-shallow-tests)

#### `--parent`

#### `--class-component`

#### `--enable-jsx`

#### `--no-mount-tests`

#### `--no-render-tests`

#### `--no-shallow-tests`

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
