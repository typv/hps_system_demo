export class DeleteTransactionCommand {
  constructor(
    public readonly transactionId: string,
  ) {}
}