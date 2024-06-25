import process from 'process';
import {constants} from '../constants/common.constant';

export const createRandomString = (
  length: number,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string => {
  let result = '';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const roundNumber = (num: number, decimalCnt: number = 2) => {
  if (!num) {
    return num;
  }
  const decimal = 10 ** decimalCnt;
  return Math.round((num + Number.EPSILON) * decimal) / decimal;
};

export const isTestingSubscriptionMode = (): Boolean => {
  return (
    [
      constants.APP_ENVIRONMENT.LOCAL,
      constants.APP_ENVIRONMENT.DEVELOPMENT,
      constants.APP_ENVIRONMENT.STAGING,
    ].includes(process.env.APP_ENVIRONMENT) &&
    (process.env.TESTING_SUBSCRIPTION === 'true' || false)
  );
};
