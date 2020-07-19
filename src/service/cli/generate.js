"use strict";

const {getRandomInt} = require(`./utils/getRandomInt`);
const {shuffle} = require(`./utils/shuffle`);
const path = require(`path`);
const {
  maxMockData,
  warning,
  offerType,
  defaultAmount,
  SumRestrict,
  ExitCode,
} = require(`./utils/constants`);
const {successTheme, errorTheme} = require(`./utils/theme`);
const fs = require(`fs`).promises;

const getPictureFileName = () => {
  const randomImage = getRandomInt(1, 16);
  return `item${randomImage < 10 ? `0${randomImage}` : randomImage}.jpg`;
};

const getTypeIndex = () => {
  return Math.floor(Math.random() * offerType.length);
};

const saveMockToFile = async (content, inputFileName = `mocks.json`) => {
  try {
    await fs.writeFile(
        path.resolve(__dirname, `../../../${inputFileName}`),
        content
    );
    return `Operation success. File created.`;
  } catch (e) {
    throw new Error(`Can't write data to file...`);
  }
};

const getTestData = async (outputFileName) => {
  try {
    const data = await fs.readFile(
        path.resolve(__dirname, `../../../data/${outputFileName}`),
        `utf8`
    );
    return data.split(`\r\n`);
  } catch (e) {
    throw new Error(`Test data was not create`);
  }
};

const generateDescription = async (count) => {
  let mockData = [];

  const title = await getTestData(`titles.txt`);
  const description = await getTestData(`sentences.txt`);
  const category = await getTestData(`categories.txt`);

  const generateEntry = () => ({
    category: [category[getRandomInt(0, category.length - 1)]],
    description: shuffle(description).slice(1, 5).join(` `),
    picture: getPictureFileName(),
    title: title[getRandomInt(0, title.length - 1)],
    type: offerType[getTypeIndex()],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  });

  for (let i = 0; i < count; i++) {
    const mock = generateEntry();
    mockData.push(mock);
  }

  return mockData;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count, fileName] = args;

    if (count > maxMockData) {
      console.log(warning);
      process.exit(ExitCode.error);
    }

    const countOffer = Number.parseInt(count, 10) || defaultAmount;
    try {
      const content = JSON.stringify(await generateDescription(countOffer), null, 2);
      const successMessage = await saveMockToFile(content, fileName);
      console.log(successTheme(successMessage));
    } catch (e) {
      console.log(errorTheme(e));
    }
  },
};
