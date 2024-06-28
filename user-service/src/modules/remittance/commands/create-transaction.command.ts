export class CreateTransactionCommand {
  constructor(
    public readonly depositWalletId: string,
    public readonly destinationWalletId: string,
    public readonly amount: number,
  ) {}
}