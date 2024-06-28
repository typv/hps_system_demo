import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from "../base/base.service";
import { CreateRemittanceDto } from "./dto/create-remittance.dto";
import { serviceName } from "../microservice/microservice.constant";
import { ClientProxy } from "@nestjs/microservices";
import { RecordBuilderHelper } from "../record-builder/record-builder.helper";

@Injectable()
export class RemittanceService extends BaseService {
  constructor(
    @Inject(serviceName.SAGA_ORCHESTRATOR) private readonly orchestratorMicroService: ClientProxy,
    private readonly recordBuilderHelper: RecordBuilderHelper,
  ) {
    super();
  }

  async createRemittance(body: CreateRemittanceDto) {
    const pattern = 'create-remittance-saga';
    const start = process.hrtime();
    this.orchestratorMicroService.emit(pattern, { ...body, start });

    return 'Request has been created. Please wait..';
  }
}
