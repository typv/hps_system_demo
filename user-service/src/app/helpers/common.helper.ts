import slugify from 'slugify';
import { AppDataSource } from '../../../ormconfig';
import dayjs from "dayjs";
import { constants } from "../constants/common.constant";
import { Currency } from "../enums/common.enum";

export class CommonHelper {
  private static instance: CommonHelper;

  private constructor() {}

  public static getInstance(): CommonHelper {
    if (!CommonHelper.instance) {
      CommonHelper.instance = new CommonHelper();
    }
    return CommonHelper.instance;
  }

  public async generateSlug(
      string: string,
      entity: any,
      checkColumn: string = 'slug',
      exceptId: number = null,
      options: {
        replacement?: string,  // replace spaces with replacement character, defaults to `-`
        remove?: RegExp,       // remove characters that match regex, defaults to `undefined`
        lower?: boolean,       // convert to lower case, defaults to `false`
        strict?: boolean,      // strip special characters except replacement, defaults to `false`
        locale?: string,       // language code of the locale to use
        trim?: boolean         // trim leading and trailing replacement chars, defaults to `true`
      } = {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
      }
    ): Promise<string> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    let tmpSlug = slugify(string, options);
    const queryBuilder = AppDataSource.getRepository(entity)
      .createQueryBuilder('t')
      .where(`t.${ checkColumn } = :slug`, { slug: tmpSlug });
    if (exceptId) {
      queryBuilder.andWhere('t.id <> :exceptId', { exceptId })
    }
    const exist = await queryBuilder.getOne();
    if (exist) {
      tmpSlug += `${options?.replacement || '-'}${Date.now()}`;
    }

    return tmpSlug;
  }

  public makeExpired(number, unit): string {
    return dayjs().add(number, unit).format(constants.DATE_TIME_FORMAT);
  }

  public makeRandomString(length, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let result = '';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  public makeRandomNumber(min: number, max: number): number {
    return Math.floor(min + Math.random() * max);
  }

  public canUpdateStep(currentStep, nextStep, targetStep): boolean {
    return currentStep == targetStep || nextStep == targetStep;
  }

  // Convert array of string to array unique of string (string to uc first)
  public arrayUniqueStrToUcFirst(arr: string[]): string[] {
    for (let key in arr) {
      let str = arr[key].trim();
      if (!str) {
        continue;
      }
      arr[key] = this.stringToUcFirst(str);
    }

    return arr.filter(function (item, pos) {
      return arr.indexOf(item) == pos;
    });
  }

  public stringToUcFirst(str: string): string {
    if (!str) {
      return null;
    }

    return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  }

  public convertIdsStringToArrUnique(ids: string, separator: string = ','): string[] {
    if (!ids || ids.length == 0) {
      return [];
    }
    const arrayOfIds = ids.split(separator);

    // Get unique value
    return arrayOfIds.filter((value, index, self) => {
      return value && self.indexOf(value) === index;
    });
  }

  public insertString(str: string, start: number, delCount: number, newSubStr: string): string {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
  }

  public makeRandomPassword(): string {
    const password =
      this.makeRandomString(1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') +
      this.makeRandomString(3, '!@#$%^&?') +
      this.makeRandomString(7);

    return password;
  }

  public trimSpaceAndConvertToLower(string: string): string {
    if (!string) {
      return null;
    }

    return string.replace(/\s/g, '').toLowerCase();
  }

  public getFileType(fileName: string): string {
    if (!fileName) return null;
    const splitted = fileName.split('.');
    return splitted[splitted.length - 1];
  }

  public trimSpaceAndConvertToUpper(string: string): string {
    if (!string) {
      return null;
    }

    return string.replace(/\s+/g, '').toUpperCase();
  }

  public searchCaseInsensitive(searchField: string): string {
    return `LOWER(REPLACE(${searchField}, ' ', '')) LIKE LOWER(REPLACE(:keyword, ' ', ''))`;
  }

  public convertPermissionNameToCode(string: string): string {
    if (!string) {
      return null;
    }

    return string.replace(/\s+/g, '_').toUpperCase();
  }

  public makeTextSearchKeyword(string: string, joinCharacter: string = '&') {
    // Convert to unaccent
    const unaccentString = string.normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

    // Remove fulltext search operators of Postgres: &, |, <>.
    return unaccentString.trim().replace(/[&|<>]/g, '')
      .replace(/\s+/g, joinCharacter);
  }

  public roundNumber(num: number, decimalCnt: number = 2) {
    if (!num) {
      return num;
    }
    const decimal = 10 ** decimalCnt;
    return Math.round((num + Number.EPSILON) * decimal) / decimal;
  }

  public convertAmountByCurrency(amount: number, currency: string) {
    if (currency === Currency.USD) {
      return this.roundNumber(amount / 100);
    }

    return amount;
  }

  public convertAmountToUSD(amount: number, exchangeRate: number) {
    if (isNaN(amount)) {
      return null;
    }
    if (isNaN(exchangeRate) || exchangeRate === 0) {
      return amount;
    }

    return this.roundNumber(amount / exchangeRate);
  }
}