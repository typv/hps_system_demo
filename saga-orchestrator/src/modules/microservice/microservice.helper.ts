import { Transport } from '@nestjs/microservices';

export class MicroserviceHelper {
  createConfigRMQ(serviceName: string, prefetchCount: number = null, durable: boolean = false): any {
    const options: { [key: string]: any } = {
      urls: [process.env.RABBITMQ_URL],
      queue: serviceName,
      queueOptions: {
        durable: durable,
      },
    }
    if (prefetchCount) {
      options.prefetchCount = prefetchCount;
    }

    return {
      name: serviceName,
      transport: Transport.RMQ,
      options: options,
    };
  }
}
