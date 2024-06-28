import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRemittanceDto {
  @IsString()
  @IsNotEmpty()
  depositWalletId: string;

  @IsString()
  @IsNotEmpty()
  destinationWalletId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}