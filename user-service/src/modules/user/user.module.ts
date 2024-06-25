import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateUserHandle } from "./commands/handlers/create-user.handle";
import { CreateUserProfileHandle } from "./commands/handlers/create-user-profile.handle";
import { DeleteUserHandle } from "./commands/handlers/delete-user.handle";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserHandle,
    CreateUserProfileHandle,
    DeleteUserHandle,
  ],
})
export class UserModule {}
