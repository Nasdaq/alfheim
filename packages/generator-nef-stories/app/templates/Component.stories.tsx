import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import marked from "marked";

import <%= name %>Readme from "./README.md";

import <%= name %> from ".";

const <%= name %>Stories = storiesOf("<%= name %>", module)
  .addDecorator(withKnobs)
  .addParameters({
    info: { text: marked(<%= name %>Readme) }
  })
  .add("basic use", () => <<%= name %> />);

export default <%= name %>Stories;
