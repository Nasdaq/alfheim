#!/usr/bin/env node
"use strict";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them.
process.on("unhandledRejection", err => {
  throw err;
});

const chalk = require("chalk");
const spawn = require("cross-spawn");

const args = process.argv.slice(2);
const log = console.log;

const scriptIndex = args.findIndex(
  x => x === "init" || x === "create-component"
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

switch (script) {
  case "create-component":
    const result = spawn.sync(
      "yo",
      nodeArgs
        .concat("@alfheim/nef-component")
        .concat(args.slice(scriptIndex + 1)),
      { stdio: "inherit" }
    );

    if (result.signal) {
      if (result.signal === "SIGKILL") {
        log(`
          The build failed because the process exited too early.
          This probably means the system ran out of memory or someone called
          kill -9" on the process.
        `);
      } else if (result.signal === "SIGTERM") {
        log(
          chalk.red(`
             The build failed because the process exited too early. 
             Someone might have called "kill" or "killall", or the system could 
             be shutting down.
           `)
        );
      }
      process.exit(1);
    }
    process.exit(result.status);
    break;

  case "init":
    const result = spawn.sync(
      "yo",
      nodeArgs
        .concat("@alfheim/nef-library")
        .concat(args.slice(scriptIndex + 1)),
      { stdio: "inherit" }
    );

    if (result.signal) {
      if (result.signal === "SIGKILL") {
        log(`
            The build failed because the process exited too early.
            This probably means the system ran out of memory or someone called
            kill -9" on the process.
          `);
      } else if (result.signal === "SIGTERM") {
        log(
          chalk.red(`
               The build failed because the process exited too early. 
               Someone might have called "kill" or "killall", or the system could 
               be shutting down.
             `)
        );
      }
      process.exit(1);
    }
    process.exit(result.status);
    break;

  case undefined:
    break;

  default:
    log(
      chalk.red(`
      Unknown script "${script}".
      Perhaps you need to update Alfheim?
    `)
    );
    break;
}
