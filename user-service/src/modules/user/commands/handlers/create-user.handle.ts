import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../create-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../entities/user.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateUserCommand)
export class CreateUserHandle implements ICommandHandler<CreateUserCommand> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,) {}

  async execute(command: CreateUserCommand) {
    const { email, password } = command;
    const user = await this.userRepo.save({ email, password });

    return user;
  }
}
