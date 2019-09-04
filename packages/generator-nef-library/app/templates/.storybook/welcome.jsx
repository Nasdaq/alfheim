import { storiesOf } from "@storybook/react";
import marked from "marked";

import README from "../README.md";
import CHANGELOG from "../CHANGELOG.md";
import json from "../package.json";

const storyName = `Current Version: ${String(json.version)}`;

const GettingStartedStories = storiesOf("Getting Started", module)
  .add("Basic setup", () => null, {
    info: { text: marked(README), inline: true }
  })
  .add(storyName, () => null, {
    info: { text: marked(CHANGELOG), inline: true }
  });

export default GettingStartedStories;
