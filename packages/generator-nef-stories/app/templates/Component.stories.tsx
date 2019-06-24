import { storiesOf } from "@storybook/react";
import React from "react";
import { withKnobs } from "@storybook/addon-knobs/react";

import <%= name %>Readme from "./README.md";

import <%= name %> from ".";

const <%= name %>Stories = storiesOf("<%= name %>", module);

// add the knobs as a decorator and readme as a param
<%= name %>Stories.addDecorator(withKnobs).addParameters({
  readme: { content: <%= name %>Readme }
});

<%= name %>Stories.add("basic use", () => <<%= name %> />);

export default <%= name %>Stories;