#!/usr/bin/env node
"use strict";

const meow = require("meow");
const utils = require("./utils");
const chalk = require("chalk");
const log = console.log;
const error = console.error;

const cli = meow(
  `
    Usage
      alfheim create-component

    Example
      alfheim create-component -r false -m false

    Options 
      -o, --overwrite-existing              Will overwrite any file of the same name in the 
                                            same directory that already exists, use with caution
                                            Default: false
                                            
      -d, --component-directory             The parent directory that the component and its associated 
                                            files should be in
                                            Default: "Primitives"
                                            
      -f, --functional                      The component should be initialized in functional form; "false"
                                            initializes component as a class-based component
                                            Default: false
      
      -s, --shallow-tests                   Shallow tests will be included in testing files
                                            Default: true
      
      -r, --render-tests                    Render tests will be included in testing files (most UI 
                                            components don't need this, so you may find it useful 
                                            to make this false)
                                            Default: true
                                            
      -m, --mounted-tests                   Mount tests will be included in testing files (most UI 
                                            components don't need this, so you may find it useful 
                                            to make this false)
                                            Default: true
                                            
      --stories                             Will add boilerplate .stories.ts file for Storybook.js
                                            Default: true
    
    Additional Options
      Prepending boolean flags with "no" will result in their 
      value being set as "false". For instance, if you don't 
      want a "stories" file for your component, passing the 
      "--no-stories" flag will cause the stories file to be omitted. 
      
      You can also use this functionality with aliases. For instance,
      to omit mounted tests, simply pass either the "--no-m" or 
      "--no-mounted-tests" flags to omit mounted tests in your test file.                                            
`,
  {
    flags: {
      "overwrite-existing": {
        alias: "o"
      },
      "component-directory": {
        alias: "d"
      },
      functional: {
        alias: "f"
      },
      "shallow-tests": {
        alias: "s"
      },
      "render-tests": {
        alias: "r"
      },
      "mounted-tests": {
        alias: "m"
      }
    }
  }
);

// grab variables we need from the cli input
const flags = cli.flags;
const newComponents = cli.input;

// map flags to available component options
const options = utils.mapFlagsToOptions(cli.flags);

// throw error if no components mentioned
if (newComponents.length === 0) {
  error(
    chalk.red(`
      Error: You must create at least one new component.
    `)
  );
  process.exit(1);
}

// check that all of them begin with an upper character
newComponents.forEach(arg => {
  if (arg[0] !== arg[0].toUpperCase()) {
    error(
      chalk.red(`
        Error: All component names must begin with an uppercase letter.
      `)
    );
    process.exit(1);
  }
});

// warnings for missing options and default values, escape hatch
if (!options.hasOwnProperty("componentDirectory")) {
  const primitivesQuestion = utils.overwriteQuestion(
    chalk.cyan(
      "\nWarning: no directory specified, all components will be created in 'Primitives' directory. Continue?"
    )
  );
  if (!primitivesQuestion) {
    log(chalk.yellow("\nExiting...\n"));
    process.exit(1);
  }
}

// if all three types of tests are omitted, then raise an error
// stating that we need at least one type of testing
if (!options.shallowTests && !options.renderTests && !options.mountedTests) {
  error(
    chalk.red(`
      Error: you must create a new component with at least 1 type 
      of tests (shallow, render, and/or mount).  
    `)
  );
  process.exit(1);
}

// before creating our new files, let's start by ensuring
// that we have the right folder structure in place
const srcDirExists = utils.checkDirExists("src");

if (!srcDirExists.found) {
  error(
    chalk.red(`
      Error: No "/src" directory found. Please ensure that your project 
      is properly initialized with a "/src" directory and try again. 
  `)
  );
  process.exit(1);
}

// create components folder within 'src' if it doesn't already exist
utils.checkDirExists("src/components", true);

// now let's actually create the files!
for (let comp in newComponents) {
  if (newComponents.hasOwnProperty(comp)) {
    // fetch the desired name of the component
    const compName = newComponents[comp];

    // inform user that we're beginning to create component files
    console.log(`\nCreating "${compName}" component files...`);

    // check if required directories exist, if not create
    // check and/or create parent_dir
    const parentDirResults = utils.checkDirExists(
      `src/components/${options.componentDirectory}`,
      true
    );

    // if parent dir created, then also perform the actions below
    if (parentDirResults.created) {
      // create blank index.stories.ts in the folder
      utils.createFile(
        "components",
        options.componentDirectory,
        null,
        "index.stories.ts"
      );

      // add new line item to /src/stories/index.stories.ts to reference the file in 1
      utils.appendToFile(
        null,
        null,
        null,
        "index.stories.ts",
        `import "./components/${options.componentDirectory}/index.stories";\n`
      );
    }

    // check and/or create component dir
    utils.checkDirExists(
      `src/components/${options.componentDirectory}/${compName}`,
      true
    );

    // make list of files
    const templates = ["scss_file", "readme_file"];

    // create component.ts
    if (options.functional) {
      templates.push("functional_component");
    } else {
      templates.push("class_based_component");
    }

    // create stories.ts
    if (options.stories) {
      templates.push("stories_file");

      // add new line item to /src/stories/index.stories.ts to reference the file in 1
      utils.appendToFile(
        "components",
        options.componentDirectory,
        null,
        `index.stories.ts`,
        `import "./${compName}/${compName}.stories";\n`
      );
    }

    // batch create files from list
    for (let file in templates) {
      console.log(
        chalk.cyan(`\nCreating ${templates[file].replace("_", " ")}...`)
      );
      utils.createFileFromBoilerplate(
        templates[file],
        "components",
        options.componentDirectory,
        compName,
        options.overwriteExisting
      );
    }

    // create test file
    console.log(chalk.cyan(`\nCreating test file...`));
    utils.createFileFromBoilerplate(
      "test_file",
      "components",
      options.componentDirectory,
      compName,
      options.overwriteExisting,
      options.shallowTests,
      options.renderTests,
      options.mountedTests,
      options.stories
    );

    // log successful output
    console.log(`
      ${chalk.green("Created all files!")}
      Your new component directory looks like this:

      src
      ├── components
        ├── ${options.componentDirectory}
          ├── index.stories.ts ${
            parentDirResults.found ? chalk.cyan("-> already exists") : ""
          }
          ├── ${compName}
            ├── index.tsx
            ├── ${compName}.test.tsx
            ├── ${compName}.stories.tsx ${options.stories ? "" : "-> omitted"}
            ├── ${compName}.scss
            ├── README.md
    `);
  }
}

// done!
log(
  chalk.green(`
    --> All done!
  `)
);
