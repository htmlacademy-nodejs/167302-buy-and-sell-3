'use strict';

const {Cli} = require(`./cli`);
const {
  defaultCommand,
  userArgvIndex,
  ExitCode
} = require(`./cli/utils/constants`);

const userArguments = process.argv.slice(userArgvIndex);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[defaultCommand].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));
