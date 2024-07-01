import { constants } from './common.constant';

export class PaginationDtoConstant {
  limit: number = constants.PAGINATION.LIMIT_DEFAULT;
  page: number = constants.PAGINATION.PAGE_DEFAULT;
}
