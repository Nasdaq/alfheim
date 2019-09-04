```
 <%= asciiName %>
```

[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://nef.git-pages.nasdaq.com/react/)

INTRO GOES HERE

## Getting started as a library user/consumer

EXPLAIN HOW TO ACCESS LIBRARY

### Using the components

EXPLAIN HOW TO ENABLE LIBRARY IN AN APP

### Enabling tree-shaking

To enable tree-shaking, you can follow three different methods depending on your setup:

1. `babel-plugin-imports` with unejected `create-react-app`: We anticipate most will fall into this category. You do _NOT_ need to eject to enable tree-shaking, simply follow the following steps.

   a) Install required dependencies:

   ```bash
   yarn add react-app-rewired customize-cra babel-plugin-import --dev
   ```

   b) Create file called `config-overrides.js` in your project root and add following:

   ```javascript
   /* config-overrides.js */

   const { override, fixBabelImports } = require("customize-cra");

   module.exports = override(
     fixBabelImports("<%= name %>", {
       libraryName: "<%= name %>",
       libraryDirectory: "lib/components",
       camel2DashComponentName: false,
       style: false
     })
   );
   ```

   c) Update your `package.json` such that your scripts look as follows:

   ```diff
     /* package.json */

     "scripts": {
   -   "start": "react-scripts start",
   +   "start": "react-app-rewired start",
   -   "build": "react-scripts build",
   +   "build": "react-app-rewired build",
   -   "test": "react-scripts test --env=jsdom",
   +   "test": "react-app-rewired test --env=jsdom",
       "eject": "react-scripts eject"
   }
   ```

   > NOTE: Your `eject` script should remain unchanged.

   d) Now, you can import `<%= name %>` modules in your app like so:

   ```javascript
   import { Button } from "<%= name %>";
   ```

   ... and they will get compiled to this:

   ```javascript
   import Button from "<%= name %>/lib/components/Button";
   ```

2. `babel-plugin-imports` with direct access to `.babelrc`: If your `create-react-app` is already ejected or you're using some other config that give you access to edit `.babelrc`, follow these steps.

   a) Install required dependencies:

   ```bash
   yarn add babel-plugin-import --dev
   ```

   b) Create `.babelrc` or add a `babel` object into your `package.json` with the following content:

   ```json
   {
     "plugins": [
       [
         "import",
         {
           "libraryName": "<%= name %>",
           "libraryDirectory": "lib/components",
           "camel2DashComponentName": false,
           "style": false
         }
       ]
     ]
   }
   ```

   c) Now, you can import `<%= name %>` modules in your app like so:

   ```javascript
   import { Alert } from "<%= name %>";
   ```

   ... and they will get compiled to this:

   ```javascript
   import Alert from "<%= name %>/lib/components/Alert";
   ```

3. Module imports: This is what the first two methods get compiled into when building your app, but results in more verbose code. To deploy super easy (but admittedly more space-taking) tree-shaking, by importing `<%= name %>` modules in your app like so:

   ```javascript
   import Alert from "<%= name %>/lib/components/Alert";
   ```

   > NOTE: Multiple imports when using this approach may result in more cluttered imports and, as a result, we recommend steps 1 or 2.

   ```javascript
   // very verbose imports
   import NavbarBadge from "<%= name %>/lib/components/NavbarBadge";
   import NavbarContent from "<%= name %>/lib/components/NavbarContent";
   import NavbarDropDownContent from "<%= name %>/lib/components/NavbarDropDownContent";
   import NavbarDropDownIndicator from "<%= name %>/lib/components/NavbarDropDownIndicator";
   import NavbarIcon from "<%= name %>/lib/components/NavbarIcon";
   import NavbarIconBlockText from "<%= name %>/lib/components/NavbarIconBlockText";
   import NavbarIconContainer from "<%= name %>/lib/components/NavbarIconContainer";
   import NavbarItem from "<%= name %>/lib/components/NavbarItem";
   import NavbarLink from "<%= name %>/lib/components/NavbarLink";
   import NavbarLogo from "<%= name %>/lib/components/NavbarLogo";

   // vs. simpler imports
   import {
     NavbarBadge,
     NavbarContent,
     NavbarDropDownContent,
     NavbarDropDownIndicator,
     NavbarIcon,
     NavbarIconBlockText,
     NavbarIconContainer,
     NavbarItem,
     NavbarLink,
     NavbarLogo
   } from "<%= name %>";
   ```

## Getting started as a library developer/contributor

EXPLAIN BASIC SET UP AS A LIBRARY DEV HERE

### Contribution guidelines

Please read our [contributing guide](#).

# Browser compatibility

EXPLAIN WHICH BROWSERS YOUR LIBRARY IS COMPATIBLE WITH OUT OF THE BOX

## Support for older browsers

If your application needs support for browsers not listed above, you may need to use shims and polyfills in your app
to make the components work properly. Recommended shims and polyfills are below.

### `core-js` library

The `core-js` library allows you to polyfill individual javascript functions selectively. This library is our
preferred method of polyfilling native javascript functionality via imports like:

```javascript
import "core-js/fn/array/find";
import "core-js/fn/array/includes";
import "core-js/fn/number/is-nan";
```

You can install the library at `yarn add core-js`. You will want to import this in your app's `index.js` file
before rendering your app.

### `es6-shims` library

The `es6-shim` library is another possible approach to polyfilling ES6 functions. You can install by typing
`yarn add es6-shim` and include it directly in your project via:

```javascript
import "es6-shim;";
```

in your `index.js` file before your app renders.

### `polyfill.io` service

Finally, you can include te `polyfill.io` script to retrieve browser-specific polyfills by adding this line to
`index.html`:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.includes"></script>
```

Note that `Array.prototype.includes` is specifically called out as a requested feature in the above example.
