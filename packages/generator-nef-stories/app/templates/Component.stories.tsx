import React from "react";
import { withKnobs } from "@storybook/addon-knobs/react";

import <%= name %> from ".";

const <%= name %>Stories = {
  title: "<%= name %>Stories",
  component: <%= name %>,
  decorators: [withKnobs]
};

export const BasicUse = () => <<%= name %> />;

export default <%= name %>Stories;
