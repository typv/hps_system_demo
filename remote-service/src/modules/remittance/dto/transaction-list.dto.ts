import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaginationDtoConstant } from "../../../app/constants/pagination-dto.constant";

export class TransactionListDto extends PaginationDtoConstant {
  @IsDateString()
  @IsNotEmpty()
  from: string;

  @IsDateString()
  @IsNotEmpty()
  to: string;
}