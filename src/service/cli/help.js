'use strict';

const {helpTheme} = require(`./utils/theme`);

module.exports = {
  name: `--help`,
  run() {
    const infoText = `
    Программа запускает http-сервер и формирует файл с данными для API.

      Гайд:
      server <command>

      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
    `;

    console.info(helpTheme(infoText));
  }
};
