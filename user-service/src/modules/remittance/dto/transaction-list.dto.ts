import { PaginationDtoConstant } from "../../../app/constants/pagination-dto.constant";

export class TransactionListDto extends PaginationDtoConstant {
  from: string;
  to: string;
}