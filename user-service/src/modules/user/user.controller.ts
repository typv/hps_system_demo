import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create-user')
  async create(@Payload() payload: CreateUserDto): Promise<any> {
    return await this.userService.createUser(payload);
  }

  @MessagePattern('create-user-profile')
  async createProfile(@Payload() payload: CreateUserDto): Promise<any> {
    return await this.userService.createUserProfile(payload);
  }

  @MessagePattern('delete-user')
  async deleteUser(@Payload('id') id: number): Promise<any> {
    await this.userService.deleteUser(id);

    return true;
  }
}
