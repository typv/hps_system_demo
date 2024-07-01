import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Transaction } from "../../../../entities/transaction.entity";
import { TransactionListQuery } from "../transaction-list.query";
import { constants } from "../../../../app/constants/common.constant";

@QueryHandler(TransactionListQuery)
export class TransactionListHandle implements IQueryHandler<TransactionListQuery> {
  constructor(@InjectRepository(Transaction) private transactionRepo: Repository<Transaction>) {}

  async execute(query: TransactionListQuery) {
    const { from, to, page, limit } = query.params;
    const queryBuilder = this.transactionRepo.createQueryBuilder('trans')
      .where('trans.transactionDate BETWEEN :from AND :to', { from, to });

    return await this.paginate(queryBuilder, page, limit);
  }

  async paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    page: number = constants.PAGINATION.PAGE_DEFAULT,
    limit: number = constants.PAGINATION.LIMIT_DEFAULT,
  ) {
    page = +page;
    limit = +limit;
    const start = (page - 1) * limit;
    const result = await queryBuilder.skip(start).take(limit).getManyAndCount();
    const items = result[0];
    const totalItems = result[1];
    const totalPage = limit > 0 ? Math.ceil(totalItems / limit) : 1;

    return {
      items: items,
      meta: {
        totalItems: totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: totalPage,
        currentPage: page,
      },
    };
  }
}