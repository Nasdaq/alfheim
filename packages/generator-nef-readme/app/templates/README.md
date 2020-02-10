# <%= name %>

<!-- STORY -->

## Introduction

`<%= name %>` is an easy-to-use component.

## Usage

```javascript
import { <%= name %> } from "@nef/core";
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
