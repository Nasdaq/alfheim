import React from "react";
import { storiesOf } from "@storybook/react";
import marked from "marked";
import {
  boolean,
  object,
  select,
  text,
  withKnobs
} from "@storybook/addon-knobs/react";

import FlexReadme from "./README.md";

import Flex from ".";

const FlexStories = storiesOf("Flex", module)
  .addDecorator(withKnobs)
  .addParameters({
    info: { text: marked(FlexReadme) }
  })
  .add("alignItems and justifyContent as strings", () => (
    <Flex
      inlineFlex={boolean("Inline flex", false)}
      alignItems={select(
        "Align items",
        ["baseline", "start", "center", "stretch", "end"],
        "baseline"
      )}
      textAlign={select(
        "Text alignment",
        ["left", "center", "right", "justify"],
        "left"
      )}
      justifyContent={select("Justify content", [
        "start",
        "center",
        "around",
        "between",
        "end"
      ])}
      flexDirection={select(
        "Flex direction",
        ["row", "row-reverse", "column", "column-reverse"],
        "row"
      )}
      wrap={select("Wrap", ["wrap", "nowrap", "wrap-reverse"], "nowrap")}
      style={{ height: 300 }}
    >
      <span style={{ width: "50%", height: "50%", border: "1px solid grey" }}>
        {text("Content", "some content")}
      </span>
    </Flex>
  ))
  .add("alignItems and justifyContent as array of objects", () => (
    <Flex
      inlineFlex={boolean("Inline flex", false)}
      alignItems={object("Align items", [
        {
          align: "start",
          size: "xs"
        },
        {
          align: "center",
          size: "md"
        },
        {
          align: "end",
          size: "xl"
        }
      ])}
      textAlign={select(
        "Text alignment",
        ["left", "center", "right", "justify"],
        "left"
      )}
      justifyContent={object("Justify content", [
        {
          justify: "start",
          size: "xs"
        },
        {
          justify: "center",
          size: "sm"
        },
        {
          justify: "end",
          size: "lg"
        }
      ])}
      flexDirection={select(
        "Flex direction",
        ["row", "row-reverse", "column", "column-reverse"],
        "row"
      )}
      wrap={select("Wrap", ["wrap", "nowrap", "wrap-reverse"], "nowrap")}
      style={{ height: 300 }}
    >
      <span style={{ width: "50%", height: "50%", border: "1px solid grey" }}>
        {text("Content", "some content")}
      </span>
    </Flex>
  ));

export default FlexStories;
