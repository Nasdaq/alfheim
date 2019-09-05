"use strict";

const Generator = require("yeoman-generator");
const figlet = require("figlet");
const validateNpmPkgName = require("validate-npm-package-name");

module.exports = class extends Generator {
  constructor(args, optns) {
    super(args, optns);

    this.option("skip-install", {
      description: "Skips yarn/npm install command. Useful for dry runs.",
      type: Boolean
    });

    this.option("skip-git", {
      description: "Skips all git commands. Useful for dry runs.",
      type: Boolean
    });
  }

  initializing() {
    if (this.args.length > 1) {
      console.error(
        "You can only create one component library at a time. Please try again with only one unnamed argument."
      );
      process.exit(1);
    }
  }

  async prompting() {
    const validateRequired = value => {
      if (value.length === 0) {
        return "You must enter a valid value.";
      }

      return true;
    };

    const validateName = value => {
      const result = validateNpmPkgName(value);

      if (!result.validForNewPackages) {
        const errors = result.errors || [];
        const warnings = result.warnings || [];

        const merged = [...errors, ...warnings];

        return merged.join("\n>> ");
      }

      return true;
    };

    const validateVersion = value => {
      const re = new RegExp(
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/
      );

      if (value.match(re)) {
        return true;
      }

      return "Please ensure that your version follows valid semver without the 'v' character.";
    };

    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project/package name",
        default: this.appname.replace(" ", "-").toLowerCase(),
        validate: validateName
      },
      {
        type: "input",
        name: "description",
        message: "Enter a description for your package",
        default: "This component library is going to be awesome!"
      },
      {
        type: "input",
        name: "version",
        message: "What version should we use?",
        default: "0.1.0",
        validate: validateVersion
      },
      {
        type: "input",
        name: "authorName",
        message: "What's your name?",
        default: "Haldun Anil",
        validate: validateRequired
      },
      {
        type: "input",
        name: "authorEmail",
        message: "What's your email?",
        default: "haldun.anil@nasdaq.com",
        validate: validateRequired
      },
      {
        type: "list",
        name: "pkg-mgr",
        message: "Use which package manager?",
        choices: ["Yarn", "NPM"],
        default: "Yarn"
      },
      {
        type: "input",
        name: "host",
        message: "What is your repository host?",
        default: "https://github.com"
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Use TypeScript?",
        default: true
      }
    ]);
  }

  _initializeGitRepo() {
    if (!this.options["skip-git"]) {
      // run git init
      this.spawnCommandSync("git", ["init"]);

      // add .gitignore
      this.fs.copyTpl(
        this.templatePath(`./.gitignore`),
        this.destinationPath(".gitignore")
      );
    }
  }

  _mergeSortObjects(object1, object2) {
    const unordered = { ...object1, ...object2 };
    const ordered = {};

    Object.keys(unordered)
      .sort()
      .forEach(key => {
        ordered[key] = unordered[key];
      });

    return ordered;
  }

  _generatePackageJson() {
    const {
      authorName,
      authorEmail,
      description,
      name,
      typescript,
      version
    } = this.answers;
    const simpleName = name.replace(/[\W_]+/g, "-");

    // add basics
    const pkgJson = {
      name,
      private: true,
      version,
      description,
      main: `dist/${simpleName}.min.js`,
      cjs: `dist/${simpleName}.cjs.js`,
      module: `dist/${simpleName}.es.js`,
      "jsnext:main": `dist/${simpleName}.es.js`,
      jsdelivr: `dist/${simpleName}.es.js`,
      unpkg: `dist/${simpleName}.min.js`,
      cdn: `dist/${simpleName}.min.js`
    };

    // add types
    if (typescript) {
      pkgJson.types = "lib/index.d.ts";
    }

    pkgJson.files = ["dist", "lib", "./README.md"];

    // add scripts
    const baseScripts = {
      start: "start-storybook -p 3000 -c .storybook",
      prebuild: "rimraf dist && rimraf lib",
      test: "jest",
      "test:ci": "CI=true jest --env=jsdom --coverage",
      "test:watch": "jest --watch",
      "create-component": "alfheim create-component",
      changelog:
        "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 -c conventional-changelog.json",
      version: "yarn changelog && git add CHANGELOG.md",
      "build:storybook": "build-storybook -c .storybook -o .html"
    };

    const typescriptScripts = {
      build: "rollup -c && npm run build:ts",
      "build:ts": "tsc --p tsconfig.build.json && cp -r ./src/@types ./lib/",
      lint: "eslint src/ --ext .ts,.tsx --fix",
      "lint:ci": "eslint src/ --ext .ts,.tsx --quiet"
    };

    const javascriptScripts = {
      build: "rollup -c",
      lint: "eslint src/ --ext .js,.jsx --fix",
      "lint:ci": "eslint src/ --ext .js,.jsx --quiet"
    };

    if (typescript) {
      pkgJson.scripts = this._mergeSortObjects(baseScripts, typescriptScripts);
    } else {
      pkgJson.scripts = this._mergeSortObjects(baseScripts, javascriptScripts);
    }

    // add dependencies
    pkgJson.dependencies = {
      "styled-components": "~4.1.1"
    };

    if (!typescript) {
      pkgJson.dependencies["prop-types"] = "^15.7.2";
    }

    // add peer dependencies
    pkgJson.peerDependencies = {
      react: "^16.8.0",
      "react-dom": "^16.8.0"
    };

    // add dev dependencies
    const baseDevDependencies = {
      "@alfheim/cli": "^0.2.0",
      "@babel/core": "^7.1.2",
      "@babel/helper-module-imports": "^7.0.0",
      "@babel/plugin-proposal-object-rest-spread": "^7.0.0",
      "@babel/plugin-transform-runtime": "^7.1.0",
      "@babel/preset-env": "^7.1.0",
      "@babel/preset-react": "^7.0.0",
      "@commitlint/cli": "^7.2.1",
      "@commitlint/config-conventional": "^7.1.2",
      "@storybook/addon-a11y": "^5.1.10",
      "@storybook/addon-actions": "^5.1.3",
      "@storybook/addon-backgrounds": "^5.1.3",
      "@storybook/addon-console": "^1.1.0",
      "@storybook/addon-info": "^5.1.10",
      "@storybook/addon-knobs": "^5.1.3",
      "@storybook/addon-storyshots": "^5.1.3",
      "@storybook/addon-storysource": "^5.1.3",
      "@storybook/addon-viewport": "^5.1.3",
      "@storybook/react": "^5.1.3",
      "@storybook/theming": "^5.1.3",
      "@typescript-eslint/eslint-plugin": "^1.11.0",
      "@typescript-eslint/parser": "^1.11.0",
      "babel-eslint": "^10.0.3",
      "babel-jest": "=24.7.1",
      "babel-loader": "^8.0.4",
      "clean-css-cli": "^4.2.1",
      "conventional-changelog-cli": "^2.0.11",
      enzyme: "=3.9.0",
      "enzyme-adapter-react-16": "=1.12.1",
      eslint: "^6.3.0",
      "eslint-config-react-app": "^5.0.1",
      "eslint-plugin-flowtype": "^4.3.0",
      "eslint-plugin-import": "^2.18.2",
      "eslint-plugin-jsx-a11y": "^6.2.3",
      "eslint-plugin-react": "^7.14.3",
      "eslint-plugin-react-hooks": "^2.0.1",
      "eslint-config-prettier": "^4.2.0",
      "eslint-plugin-jsx-a11y": "^6.2.1",
      "eslint-plugin-prettier": "^3.0.1",
      "extract-text-webpack-plugin": "^3.0.2",
      faker: "^4.1.0",
      husky: "^1.1.0",
      "identity-obj-proxy": "^3.0.0",
      jest: "=24.7.1",
      "jest-styled-components": "=6.3.1",
      "lint-staged": "^7.3.0",
      "markdown-loader-jest": "^0.1.1",
      marked: "^0.7.0",
      "npm-run-all": "^4.1.3",
      "optimize-css-assets-webpack-plugin": "^3.2.0",
      "postcss-url": "^8.0.0",
      prettier: "^1.17.0",
      react: "^16.8.0",
      "react-dom": "^16.8.0",
      "readline-sync": "^1.4.9",
      rimraf: "^2.6.2",
      rollup: "^0.66.6",
      "rollup-plugin-babel": "^4.0.3",
      "rollup-plugin-babel-minify": "^6.1.1",
      "rollup-plugin-commonjs": "^9.2.0",
      "rollup-plugin-json": "^3.1.0",
      "rollup-plugin-node-resolve": "^3.4.0",
      "rollup-plugin-postcss": "^1.6.2",
      "rollup-plugin-replace": "^2.1.0",
      "rollup-plugin-url": "^2.0.1",
      rosie: "^2.0.1"
    };

    const typescriptDevDependencies = {
      "@types/enzyme": "^3.1.14",
      "@types/enzyme-adapter-react-16": "^1.0.3",
      "@types/faker": "^4.1.5",
      "@types/jest": "^24.0.13",
      "@types/node": "^12.0.7",
      "@types/react": "^16.4.14",
      "@types/react-dom": "^16.0.8",
      "@types/storybook__react": "^4.0.2",
      "awesome-typescript-loader": "^5.2.1",
      "react-docgen-typescript-loader": "^3.1.0",
      "rollup-plugin-typescript": "^1.0.1",
      "ts-jest": "=24.0.2",
      tslib: "^1.9.3",
      typescript: "^3.4.5",
      "typescript-plugin-styled-components": "^1.4.2"
    };

    if (typescript) {
      pkgJson.devDependencies = this._mergeSortObjects(
        baseDevDependencies,
        typescriptDevDependencies
      );
    } else {
      pkgJson.devDependencies = {
        ...baseDevDependencies
      };
    }

    // add author to contributors
    pkgJson.contributors = [`${authorName} <${authorEmail}>`];

    const baseJestConfig = {
      coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
        "/styles/",
        "(/test/.*|\\.styles)\\.(ts|tsx|js|jsx)$"
      ],
      coverageDirectory: "<rootDir>/coverage/",
      coverageThreshold: {
        global: {
          branches: 90,
          functions: 90,
          lines: 95,
          statements: 95
        }
      },
      verbose: true,
      testPathIgnorePatterns: ["/node_modules/", "/lib/", "/es/"],
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
      moduleNameMapper: {
        "\\.(mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
          "identity-obj-proxy"
      }
    };

    const typescriptJestConfig = {
      setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
      globals: {
        "ts-jest": {
          tsConfig: "tsconfig.test.json"
        }
      },
      transform: {
        "^.+\\.js$": "<rootDir>/tests/jest.transform.ts",
        "^.+\\.md?$": "markdown-loader-jest",
        ".(ts|tsx)": "ts-jest"
      },
      testRegex: "(/test/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$",
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
    };

    const javascriptJestConfig = {
      setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
      transform: {
        "^.+\\.js$": "<rootDir>/tests/jest.transform.js",
        "^.+\\.md?$": "markdown-loader-jest"
      },
      testRegex: "(/test/.*|\\.(test|spec))\\.(js|jsx)$",
      moduleFileExtensions: ["js", "jsx", "json"]
    };

    if (typescript) {
      pkgJson.jest = this._mergeSortObjects(
        baseJestConfig,
        typescriptJestConfig
      );
    } else {
      pkgJson.jest = this._mergeSortObjects(
        baseJestConfig,
        javascriptJestConfig
      );
    }

    // define husky config
    pkgJson.husky = {
      hooks: {
        "pre-commit": "lint-staged",
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
      }
    };

    // define lint-staged config
    if (typescript)
      pkgJson["lint-staged"] = {
        "src/**/*.{js,jsx,ts,tsx,json}": [
          "yarn lint:ci",
          "jest --bail --findRelatedTests",
          "git add"
        ]
      };
    else {
      pkgJson["lint-staged"] = {
        "src/**/*.{js,jsx,json}": [
          "yarn lint:ci",
          "jest --bail --findRelatedTests",
          "git add"
        ]
      };
    }

    // write package.json
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }

  _generateTestConfig() {
    const dir = "tests";
    const { typescript } = this.answers;

    // copy eslintrc
    this.fs.copyTpl(
      this.templatePath(`./${dir}/.eslintrc`),
      this.destinationPath(`${dir}/.eslintrc`)
    );

    // copy setup file
    this.fs.copyTpl(
      this.templatePath(`./${dir}/jest.setup.js`),
      this.destinationPath(`${dir}/jest.setup.${typescript ? "ts" : "js"}`)
    );

    // copy transform file
    this.fs.copyTpl(
      this.templatePath(`./${dir}/jest.transform.js`),
      this.destinationPath(`${dir}/jest.transform.${typescript ? "ts" : "js"}`)
    );
  }

  _generateStorybookConfig() {
    const dir = ".storybook";
    const { typescript } = this.answers;

    // copy addons file
    this.fs.copyTpl(
      this.templatePath(`./${dir}/addons.js`),
      this.destinationPath(`${dir}/addons.${typescript ? "ts" : "js"}`)
    );

    // copy config file
    this.fs.copyTpl(
      this.templatePath(`./${dir}/config.jsx`),
      this.destinationPath(`${dir}/config.${typescript ? "tsx" : "jsx"}`),
      { typescript }
    );

    // copy webpack config file
    if (typescript) {
      this.fs.copyTpl(
        this.templatePath(`./${dir}/webpack.config.js`),
        this.destinationPath(`${dir}/webpack.config.js`)
      );
    }

    // copy webpack ts transformers file
    if (typescript) {
      this.fs.copyTpl(
        this.templatePath(`./${dir}/webpack.ts-transformers.js`),
        this.destinationPath(`${dir}/webpack.ts-transformers.js`)
      );
    }

    // copy welcome file
    this.fs.copyTpl(
      this.templatePath(`./${dir}/welcome.jsx`),
      this.destinationPath(`${dir}/welcome.${typescript ? "tsx" : "jsx"}`)
    );
  }

  _generateCommitConfig() {
    const { host, name, version } = this.answers;

    // generate commitlint config file
    this.fs.copyTpl(
      this.templatePath("./commitlint.config.js"),
      this.destinationPath("commitlint.config.js")
    );

    // generate conventional config config json
    this.fs.copyTpl(
      this.templatePath("./conventional-changelog.json"),
      this.destinationPath("conventional-changelog.json"),
      { host, name }
    );

    // generate a basic changelog
    this.fs.copyTpl(
      this.templatePath("./CHANGELOG.md"),
      this.destinationPath("CHANGELOG.md"),
      {
        date: new Date().toISOString().split("T")[0],
        name,
        version
      }
    );
  }

  _generateCustomTypesAndTSConfig() {
    const { typescript } = this.answers;

    if (typescript) {
      // create tsconfig.json file
      this.fs.copyTpl(
        this.templatePath("./tsconfig.json"),
        this.destinationPath("tsconfig.json")
      );

      // create tsconfig.json to be used during builds
      this.fs.copyTpl(
        this.templatePath("./tsconfig.build.json"),
        this.destinationPath("tsconfig.build.json")
      );

      // create tsconfig.json to be used during tests
      this.fs.copyTpl(
        this.templatePath("./tsconfig.test.json"),
        this.destinationPath("tsconfig.test.json")
      );

      // create images.d.ts file
      this.fs.copyTpl(
        this.templatePath("./images.d.ts"),
        this.destinationPath("images.d.ts")
      );

      // create jest/index.d.ts file
      this.fs.copyTpl(
        this.templatePath("./src/@types/jest/index.d.ts"),
        this.destinationPath("src/@types/jest/index.d.ts")
      );

      // create jest/markdown.d.ts file
      this.fs.copyTpl(
        this.templatePath("./src/@types/markdown/index.d.ts"),
        this.destinationPath("src/@types/markdown/index.d.ts")
      );
    }
  }

  _generateBasicSetupConfig() {
    const { name, typescript } = this.answers;

    // .eslintrc
    this.fs.copyTpl(
      this.templatePath("./.eslintrc"),
      this.destinationPath(".eslintrc")
    );

    // .npmignore
    this.fs.copyTpl(
      this.templatePath("./.npmignore"),
      this.destinationPath(".npmignore")
    );

    // rollup config
    this.fs.copyTpl(
      this.templatePath("./rollup.config.js"),
      this.destinationPath("rollup.config.js"),
      { name, typescript }
    );

    // basic travis.ci file
    this.fs.copyTpl(
      this.templatePath("./.travis.yml"),
      this.destinationPath(".travis.yml")
    );

    // readme file
    const asciiName = figlet.textSync(name, {
      font: "ANSI Shadow",
      horizontalLayout: "default",
      verticalLayout: "default"
    });

    this.fs.copyTpl(
      this.templatePath("./README.md"),
      this.destinationPath(`README.md`),
      { name, asciiName }
    );

    // an index file as entry point into the lib
    this.fs.copyTpl(
      this.templatePath("./src/index.js"),
      this.destinationPath(`src/index.${typescript ? "ts" : "js"}`)
    );
  }

  _generateBasicComponents() {
    const { typescript } = this.answers;

    // STEP 1: generate flex component
    const flexDir = "src/components/Flex";

    // component file
    this.fs.copyTpl(
      this.templatePath(`./${flexDir}/index.${typescript ? "tsx" : "jsx"}`),
      this.destinationPath(`${flexDir}/index.${typescript ? "tsx" : "jsx"}`)
    );

    // style sheet
    this.fs.copyTpl(
      this.templatePath(
        `./${flexDir}/Flex.styles.${typescript ? "tsx" : "jsx"}`
      ),
      this.destinationPath(
        `${flexDir}/Flex.styles.${typescript ? "tsx" : "jsx"}`
      ),
      { typescript }
    );

    // testing file
    this.fs.copyTpl(
      this.templatePath(`./${flexDir}/Flex.test.jsx`),
      this.destinationPath(`${flexDir}/Flex.test.${typescript ? "tsx" : "jsx"}`)
    );

    // stories file
    this.fs.copyTpl(
      this.templatePath(`./${flexDir}/Flex.stories.jsx`),
      this.destinationPath(
        `${flexDir}/Flex.stories.${typescript ? "tsx" : "jsx"}`
      )
    );

    // README file
    this.fs.copyTpl(
      this.templatePath(`./${flexDir}/README.md`),
      this.destinationPath(`${flexDir}/README.md`)
    );
  }

  _gitCommitGeneratedFiles() {
    if (!this.options["skip-git"]) {
      // first add everything
      this.spawnCommandSync("git", ["add", "."]);

      // next, commit it
      this.spawnCommandSync("git", [
        "commit",
        '-m "First commit in my new component library!"'
      ]);
    }
  }

  writing() {
    // begin by initializing the git repo
    this._initializeGitRepo();

    // continue by generating a package.json file
    this._generatePackageJson();

    // create the test config
    this._generateTestConfig();

    // now create the storybook config files
    this._generateStorybookConfig();

    // next, create the commitlint config
    this._generateCommitConfig();

    // create ts config
    this._generateCustomTypesAndTSConfig();

    // create basic misc setup
    this._generateBasicSetupConfig();

    // get some basic components in there
    this._generateBasicComponents();

    // commit everything that was generated
    this._gitCommitGeneratedFiles();
  }

  install() {
    if (!this.options["skip-install"]) {
      switch (this.answers["pkg-mgr"]) {
        case "Yarn":
          return this.yarnInstall();
        case "NPM":
        default:
          return this.npmInstall();
      }
    }
  }
};
