import { storiesOf } from "@storybook/react";
import marked from "marked";
import React from "react";
import { withKnobs } from "@storybook/addon-knobs/react";

import <%= name %>Readme from "./README.md";

import <%= name %> from ".";

const <%= name %>Stories = storiesOf("<%= name %>", module)
  .addDecorator(withKnobs)
  .addParameters({
    info: { text: marked(<%= name %>Readme) }
  })
  .add("basic use", () => <<%= name %> />);

export default <%= name %>Stories;
