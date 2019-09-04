import React from "react";
import { withInfo } from "@storybook/addon-info";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { create } from "@storybook/theming";
import { withA11y } from "@storybook/addon-a11y";
import "@storybook/addon-console";

// addon-info
addDecorator(
  withInfo({
    source: false,
    header: false,

    <%_ if (typescript) { -%>
    // todo: remove this line https://github.com/strothj/react-docgen-typescript-loader/issues/47 is addressed
    propTables: null
    <%_ } -%>
  })
);

// add theme
addDecorator(s => <div style={{ marginTop: "3rem" }}>{s()}</div>);

// add accessibility testing
addDecorator(withA11y);

// parameters
addParameters({
  options: {
    panelPosition: "right",
    theme: create({
      base: "light"
    })
  },
  backgrounds: [
    { name: "white", value: "#fff", default: true },
    { name: "gray", value: "#f4f4f5" }
  ]
});

// dynamically import all stories
<%_ if (typescript) { -%>
const req = require.context("../src/components", true, /\.stories\.tsx$/);
<%_ } else { -%>
const req = require.context("../src/components", true, /\.stories\.jsx$/);
<%_ } -%>

function loadStories() {
  require("./welcome");
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
