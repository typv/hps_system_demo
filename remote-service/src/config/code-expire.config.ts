import { registerAs } from '@nestjs/config';
import { constants } from '../app/constants/common.constant';

export default registerAs('codeExpire', () => ({
  VERIFY_SIGNUP: {
    number: process.env.VERIFY_SIGNUP_EXPIRE_DATE_NUMBER
      ? Number(process.env.VERIFY_SIGNUP_EXPIRE_DATE_NUMBER)
      : constants.VERIFY_SIGNUP_CODE.EXPIRE_NUMBER,
    unit: process.env.VERIFY_SIGNUP_EXPIRE_DATE_UNIT || constants.VERIFY_SIGNUP_CODE.EXPIRE_UNIT,
  },
  RESET_PASSWORD: {
    number: process.env.RESET_PASSWORD_EXPIRE_DATE_NUMBER
      ? Number(process.env.RESET_PASSWORD_EXPIRE_DATE_NUMBER)
      : constants.CONFIRMATION_CODE.EXPIRE_NUMBER,
    unit: process.env.RESET_PASSWORD_EXPIRE_DATE_UNIT || constants.CONFIRMATION_CODE.EXPIRE_UNIT,
  },
  CODE_2FA: {
    number: process.env.CODE_2FA_EXPIRE_DATE_NUMBER
      ? Number(process.env.CODE_2FA_EXPIRE_DATE_NUMBER)
      : constants.VERIFY_2FA_CODE.EXPIRE_NUMBER,
    unit: process.env.CODE_2FA_EXPIRE_DATE_UNIT || constants.VERIFY_2FA_CODE.EXPIRE_UNIT,
  },
}));
