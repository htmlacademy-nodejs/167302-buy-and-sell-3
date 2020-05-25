'use strict';

const packageJsonFile = require(`../../../package.json`);
const {versionTheme} = require(`./utils/theme`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    console.info(versionTheme(version));
  }
};
