import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";
import { serviceName } from "../microservice/microservice.constant";
import { RecordBuilderHelper } from "../record-builder/record-builder.helper";
import { BaseController } from "../base/base.controller";

@Controller('user')
export class UserController extends BaseController {
  constructor(
    @Inject(serviceName.USER) private readonly userMicroService: ClientProxy,
    private readonly recordBuilderHelper: RecordBuilderHelper,
  ) {
    super();
  }

  @MessagePattern('create-user-saga')
  async create(@Payload() payload: CreateUserDto): Promise<any> {
    let user;
    try {
      const createUserPattern = 'create-user';
      const record = this.recordBuilderHelper.build(createUserPattern, payload);
      user = await this.serviceResponse(this.userMicroService.send(createUserPattern, record));
    } catch (createUserErr) {
      console.log("createUserErr: ", createUserErr);
      throw new RpcException('Failed to create user');
    }

    try {
      const createProfilePattern = 'create-user-profile';
      const record = this.recordBuilderHelper.build(createProfilePattern, { id: user.id, ...payload });
      user['profile'] = await this.serviceResponse(this.userMicroService.send(createProfilePattern, record));
    } catch (createUserProfileErr) {
      // Remove user
      const deleteUserPattern = 'delete-user';
      const record = this.recordBuilderHelper.build(deleteUserPattern, { id: user.id });
      await this.serviceResponse(this.userMicroService.send(deleteUserPattern, record));

      console.log("createUserProfileErr: ", createUserProfileErr);
      throw new RpcException('Failed to create user profile');
    }

    return user;
  }
}
