# create-component

Generate one or multiple boilerplate components within `src`.

Note that this component uses `.scss` files instead of `.css` files by default. If you do not want to use `.scss` files, simply change the `.scss` file extension to `.css` and ensure that you update the reference in your component file import.

If you do want to use `.scss` files, in order to make those work - assuming you use webpack - you will also need to install `style-loader`, `css-loader`, `sass-loader`, `node-sass`, and `webpack`, as well as configure your webpack (which will require you to eject if you're using CRA). Details on how to do so can be found [here](https://github.com/webpack-contrib/sass-loader).

The test file assumes that you're using Jest and Enzyme for your testing needs.

_Note: the scripts are bash scripts and may not run on Windows machines. If that is the case, please use Git Bash._

## Usage

```sh
node ./index Test -d TestSetup
```

will create

```
src
├── components
  ├── TestSetup
    ├── Test
      ├── index.js
      ├── Test.js
      ├── Test.test.js
      ├── Test.stories.js
      ├── Test.scss
      ├── README.md
```

where the individual files look like the following:

`index.js`

```javascript
import Test from "./Test";

export default Test;
```

`Test.scss`

```css
/* todo: delete file if not needed */
@import "../../../styles/scss/main";

.Alfheim__TestSetup__Test {
  // extend bootstrap classes here

  // add custom styles here
}
```

`Test.js`

```javascript
import React from "react";
import PropTypes from "prop-types";
import "./Test.scss";

import { withStyleClassName } from "../../../util";

const Test = props => <div>This is a component called Test.</div>;

const TestPropTypes = {
  // always use prop types!
};

Test.propTypes = TestPropTypes;

export default withStyleClassName(Test, "Alfheim__TestSetup__Test");
```

`Test.test.js`

```javascript
import React from "react";
import { shallow, render, mount } from "enzyme";
import Test from "./Test";

describe("Test", () => {
  let props;
  let shallowTest;
  let renderTest;
  let mountTest;

  const shallowTestComponent = () => {
    if (!shallowTest) {
      shallowTest = shallow(<Test {...props} />);
    }
    return shallowTest;
  };

  const renderTestComponent = () => {
    if (!renderTest) {
      renderTest = render(<Test {...props} />);
    }
    return renderTest;
  };

  const mountTestComponent = () => {
    if (!mountTest) {
      mountTest = mount(<Test {...props} />);
    }
    return mountTest;
  };

  beforeEach(() => {
    props = {};
    shallowTest = undefined;
    renderTest = undefined;
    mountTest = undefined;
  });

  // Shallow / unit tests begin here

  // Render / mount / integration tests begin here
});
```

`Test.stories.js`

```javascript
import React from "react";
import { storiesOf } from "@storybook/react";

import Test from "./index";
import TestReadme from "./README.md";

import { withKnobs } from "@storybook/addon-knobs/react";
import { withMarkup } from "../../../../.storybook/config";

const TestStories = storiesOf("Tests/Test", module);

// add the knobs as a decorator
TestStories.addDecorator(withKnobs);

TestStories.add("basic use", withMarkup(TestReadme, () => <Test />));

export default TestStories;
```

## Options

To make creating new components quick and efficient, the following options are provided for your convenience.

| Flag(s)                        | Description                                                                                                                            | Default value |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `-h` / `--help`                | Logs available options to console                                                                                                      | no value      |
| `-o` / `--overwrite-existing`  | Will overwrite any file of the same name in the same directory that already exists, use with caution                                   | false         |
| `-d` / `--component-directory` | The parent directory that the component and its associated files should be in                                                          | Primitives    |
| `-f` / `--functional`          | The component should be initialized in functional form                                                                                 | true          |
| `-s` / `--shallow-tests`       | Shallow tests will be used in unit testing                                                                                             | true          |
| `-r` / `--render-tests`        | Render tests will be used in unit testing (most `alfheim-react` files don't need this, so you may find it useful to make this `false`) | true          |
| `-m` / `--mount-test`          | Mount tests will be used in unit testing (most `alfheim-react` files don't need this, so you may find it useful to make this `false`)  | true          |
| `--stories`                    | Will create a boilerplate `.stories.js` file for Storybook                                                                             | true          |
