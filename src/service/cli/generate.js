'use strict';

const {getRandomInt} = require(`./utils/getRandomInt`);
const {shuffle} = require(`./utils/shuffle`);
const {title,
  description,
  category,
  maxMockData,
  warning,
  offerType,
  defaultAmount,
  fileName,
  SumRestrict,
  ExitCode} = require(`./utils/constants`);
const {successTheme, errorTheme} = require(`./utils/theme`);
const fs = require(`fs`);

const getPictureFileName = () => {
  const randomImage = getRandomInt(1, 16);
  return `item${randomImage < 10 ? `0${randomImage}` : randomImage}.jpg`;
};

const generateDescription = (count) => (
  Array(count).fill({}).map(() => ({
    category: [category[getRandomInt(0, category.length - 1)]],
    description: shuffle(description).slice(1, 5).join(` `),
    picture: getPictureFileName(),
    title: title[getRandomInt(0, title.length - 1)],
    type: Object.keys(offerType)[Math.floor(Math.random() * Object.keys(offerType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || defaultAmount;
    const content = JSON.stringify(generateDescription(countOffer), null, 2);

    const generateMock = () => {
      return new Promise((resolve, reject) => {
        fs.writeFile(fileName, content, (err) => {
          if (err) {
            return reject(`Can't write data to file...`);
          }

          return resolve(`Operation success. File created.`);
        });
      });
    };

    if (count > maxMockData) {
      console.log(warning);
      process.exit(ExitCode.error);
    }

    try {
      const successMessage = await generateMock();
      console.log(successTheme(successMessage));
    } catch (e) {
      console.log(errorTheme(e));
    }
  }
};
