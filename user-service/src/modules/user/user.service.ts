import { Injectable } from '@nestjs/common';
import { BaseService } from "../base/base.service";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./commands/create-user.command";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserProfileCommand } from "./commands/create-user-profile.command";
import { DeleteUserCommand } from "./commands/delete-user.command";

@Injectable()
export class UserService extends BaseService {
  constructor(private commandBus: CommandBus) {
    super();
  }

  async createUser(payload: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(payload.email, payload.password)
    );
  }

  async createUserProfile(payload: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserProfileCommand(payload.id, payload.avatar)
    );
  }

  async deleteUser(id: number) {
    return this.commandBus.execute(
      new DeleteUserCommand(id)
    );
  }
}
