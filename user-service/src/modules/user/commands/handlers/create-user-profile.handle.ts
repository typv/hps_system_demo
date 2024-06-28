import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../entities/user.entity";
import { RpcException } from "@nestjs/microservices";
import { Repository } from "typeorm";
import { CreateUserProfileCommand } from "../create-user-profile.command";

@CommandHandler(CreateUserProfileCommand)
export class CreateUserProfileHandle implements ICommandHandler<CreateUserProfileCommand> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,) {}

  async execute(command: CreateUserProfileCommand) {
    const { id, avatar } = command;
    // await this.userRepo.update({ id }, { avatar });

    return { avatar };
  }
}
