# `@alfheim/generator-nef-readme`

<p>
  <a href="https://travis-ci.org/Nasdaq/alfheim">
    <img alt="Travis" src="https://img.shields.io/travis/Nasdaq/alfheim/master.svg">
  </a>
  <a href="https://www.npmjs.com/package/@alfheim/generator-nef-readme">
    <img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@alfheim/generator-nef-readme/latest">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/blob/master/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href="https://github.com/Nasdaq/alfheim/pulls">
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
  </a>
</p>

This package is part of the battery used to create new components for the Nasdaq Experience Framework. This package creates an `README.md` file, which provides documentation for the component. 

> _Note: It is recommended that you install and use [`generator-nef-component`](https://github.com/Nasdaq/alfheim/tree/9-add-readme-file/packages/generator-nef-component) rather than installing this package directly, unless you need to modify the individual file generators._

A README file created for a component named `Test` using this generator looks as follows:

⚠️ ⚠️ ⚠️ *BEGIN README HERE* ⚠️ ⚠️ ⚠️

# Test

<!-- STORY -->

## Introduction

`Test` is an easy-to-use component.

## Usage

```javascript
import { Test } from "@nef/core";
```

## Example use

See `Story` tab on the right.

## Properties

| propName            | propType                           | defaultValue | isRequired | Description                                        |
| ------------------- | ---------------------------------- | ------------ | ---------- | -------------------------------------------------- |
| `className`         | string                             | -            | -          | is the class name of the component                 |
| `children`          | oneOfType( node, arrayOf( node ) ) | -            | -          | is the children to be passed into component        |
| `style`             | object                             | -            | -          | is the style object to be passed into component    |
| `name`              | string                             | -            | -          | id to be passed to the DOM                         |
| `id`                | string                             | -            | -          | name to be passed to the DOM                       |

⚠️ ⚠️ ⚠️ *END README HERE* ⚠️ ⚠️ ⚠️

## Getting started

To install, simply run:

```
yarn add @alfheim/generator-nef-readme --dev
```

or

```
npm install @alfheim/generator-nef-readme --dev 
```

## Contributing

We'd love to have your helping hand on `alfheim`! Go over to our [issues](https://github.com/Nasdaq/alfheim/issues) section and see if there's anything we're looking for help with OR [open up a PR](https://github.com/Nasdaq/alfheim/pulls) if you have an idea for a way to improve the library.

## License

`Alfheim` is open source software [licensed as MIT](LICENSE).
