const { stageOne, stageTwo } = require('./contract');

export const allowListChecker = (address) => {
  const allowList = stageOne.concat(stageTwo);
  return allowList.includes(address.toLowerCase());
}

export const stageChecker = (address) => {
  return stageOne.includes(address.toLowerCase());
}