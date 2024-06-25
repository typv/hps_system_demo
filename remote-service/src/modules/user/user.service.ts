import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from "../base/base.service";
import { serviceName } from "../microservice/microservice.constant";
import { ClientProxy } from "@nestjs/microservices";
import { RecordBuilderHelper } from "../record-builder/record-builder.helper";

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject(serviceName.SAGA_ORCHESTRATOR) private readonly orchestratorMicroService: ClientProxy,
    private readonly recordBuilderHelper: RecordBuilderHelper,
  ) {
    super();
  }

  async createUser(body) {
    const pattern = 'create-user-saga';
    const record = this.recordBuilderHelper.build(pattern, body);
    return this.serviceResponse(this.orchestratorMicroService.send(pattern, record));
  }
}
