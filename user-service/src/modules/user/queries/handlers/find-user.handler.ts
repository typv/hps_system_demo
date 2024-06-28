import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Wallet } from "../../../../entities/wallet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindUserQuery } from "../find-user.query";
import { User } from "../../../../entities/user.entity";

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async execute(query: FindUserQuery): Promise<User> {
    const { id } = query;
    return await this.userRepo.findOneBy({id});
  }
}