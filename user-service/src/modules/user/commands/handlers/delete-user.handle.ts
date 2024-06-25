import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../entities/user.entity";
import { Repository } from "typeorm";
import { DeleteUserCommand } from "../delete-user.command";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandle implements ICommandHandler<DeleteUserCommand> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,) {}

  async execute(command: DeleteUserCommand) {
    const { id } = command;

    await this.userRepo.delete({ id });
  }
}
