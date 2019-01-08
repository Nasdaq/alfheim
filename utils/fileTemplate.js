"use strict";

const chalk = require("chalk");

function fileTemplate(strings, ...values) {
  return props => {
    if (values.length > 0 && !props) {
      console.error(
        chalk.red(`
        Error: When dynamic values are interpolated, you MUST pass
        in an object when calling the inner template function. For
        example, if you have a string like so (note that the $ are
        spaced out to illustrate code without executing it):
        
            const fn = fileTemplate\`
              /* todo: delete file if not needed */
              @import "../../../styles/scss/main";
              
              .Alfheim__$ {p => p.parentDir}__$ {p => p.componentName} { 
            }\`
            
        then you must call the "fn" with an object. In most cases,
        this object will look like the following:
        
            const file = fn({ 
              parentDir: "Tests", 
              componentName: "Test" 
            });
      `)
      );
      process.exit(1);
    }

    let str = "";
    strings.forEach((string, i) => {
      str += string + (values[i] ? values[i](props) : "");
    });
    return str;
  };
}

module.exports = fileTemplate;
