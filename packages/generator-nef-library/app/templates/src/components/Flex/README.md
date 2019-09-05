# Flex

<!-- STORY -->

## Introduction

`Flex` is a flexbox component that provides a wrapper around components you may want to
turn into a flexbox. See below on how to use.

## Usage

```javascript
import { Flex } from "@nef/react";
```

## Example use: string values

```javascript
const myPage = props => {
  return (
    <main>
      <Flex justifyContent="center" alignItems="center" textAlign="center">
        <span>Some content</span>
      </Flex>
    </main>
  );
};
```

## Example use: array values

```javascript
const myPage = props => {
  return (
    <main>
      <Flex
        justifyContent={[
          { justify: "center", size: "xs" },
          { justify: "start", size: "md" }
        ]}
        alignItems="center"
        textAlign="center"
      >
        <span>Some content</span>
      </Flex>
    </main>
  );
};
```

## Properties

| propName         | propType                              | defaultValue | isRequired | Description                                     |
| ---------------- | ------------------------------------- | ------------ | ---------- | ----------------------------------------------- |
| `className`      | string                                | -            | -          | is the class name of the component              |
| `children`       | oneOfType( node, arrayOf( node ) )    | -            | -          | is the children to be passed into component     |
| `style`          | object                                | -            | -          | is the style object to be passed into component |
| `name`           | string                                | -            | -          | id to be passed to the DOM                      |
| `id`             | string                                | -            | -          | name to be passed to the DOM                    |
| `alignItems`     | oneOfType( string, arrayOf( string )) | -            | -          | vertically align items                          |
| `inlineFlex`     | bool                                  | -            | -          | make the flexbox inline                         |
| `justifyContent` | oneOfType( string, arrayOf( string )) | -            | -          | horizontally align items                        |
| `textAlign`      | string                                | -            | -          | horizontally align text within a DOM element    |
| `tag`            | oneOfType( string, function )         | "div"        | -          | tag to be rendered to the DOM                   |
