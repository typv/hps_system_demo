import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MicroserviceHelper } from './microservice.helper';
import { serviceName } from "./microservice.constant";

@Global()
@Module({
  providers: [
    MicroserviceHelper,
    {
      provide: serviceName.USER,
      useFactory: (msHelper: MicroserviceHelper) => {
        const tokenServiceOptions = msHelper.createConfigRMQ(serviceName.USER);
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [MicroserviceHelper],
    },
    {
      provide: serviceName.ORDER,
      useFactory: (msHelper: MicroserviceHelper) => {
        const tokenServiceOptions = msHelper.createConfigRMQ(serviceName.ORDER);
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [MicroserviceHelper],
    },
  ],
  exports: [
    serviceName.USER,
    serviceName.ORDER,
  ],
})
export class MicroserviceModule {}
