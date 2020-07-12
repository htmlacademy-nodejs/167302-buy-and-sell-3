'use strict';

const maxMockData = 1000;
const warning = `Не больше 1000 объявлений`;
const defaultAmount = 1;
const fileName = `mocks.json`;

const SumRestrict = {
  min: 1000,
  max: 10000,
};

const offerType = [
  `offer`,
  `sale`
];

const defaultCommand = `--help`;
const userArgvIndex = 2;
const ExitCode = {
  success: 0,
  error: 1,
};

module.exports = {
  maxMockData,
  warning,
  offerType,
  defaultAmount,
  fileName,
  SumRestrict,
  defaultCommand,
  userArgvIndex,
  ExitCode
};

