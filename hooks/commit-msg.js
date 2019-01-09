#!/usr/bin/env node

// import * as fs from "fs";
const fs = require("fs");

/* If message title:
 * * Doesn't start with square brackets []
 * * Doesn't start with Merge branch
 * * Doesn't start with Merge pull request
 * * Doesn't start with #
 * * Doesn't end with parentheses ()
 * and
 * branch name starts with ${TAG} (e.g. 123-branch-description)
 * then append the issue tag to the commit message
 *
 * My awesome commit -> My awesome commit (#123)
 */

const startsWithBraces = str => str.match(/^\[[^\]]/);
const startsWithMergeBranch = str => str.indexOf("Merge branch") === 0;
const startsWithMergePR = str => str.indexOf("Merge pull request") === 0;
const startsWithHash = str => str.indexOf("#") === 0;
const endsWithParentheses = str => str.match(/\(([^)]+)\)$/);
const isInvalidMessage = str =>
  !startsWithBraces(str) &&
  !startsWithMergeBranch(str) &&
  !startsWithMergePR(str) &&
  !startsWithHash(str) &&
  !endsWithParentheses(str);
const tagMatcher = new RegExp(`\\d+`, "i");
const getIssueTagFromBranchName = str => {
  const matched = str.match(tagMatcher);
  return matched && matched[0];
};

const messageFile = `./${process.env.HUSKY_GIT_PARAMS}`;
const message = fs.readFileSync(messageFile, { encoding: "utf-8" });
const messageTitle = message.split("\n")[0];
const branchName = require("child_process")
  .execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf-8" })
  .split("\n")[0];
const issueTag = getIssueTagFromBranchName(branchName);

if (issueTag && isInvalidMessage(messageTitle)) {
  // Apply the issue tag to message title
  const messageLines = message.split("\n");
  messageLines[0] = `${messageTitle} (#${issueTag.toUpperCase()})`;
  fs.writeFileSync(messageFile, messageLines.join("\n"), { encoding: "utf-8" });
  console.log(`New message title: ${messageLines[0]}`);
}
