import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ClassSerializerInterceptor } from "@nestjs/common";
import { serviceName } from "./app/constants/microservice.constant";
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: serviceName.SAGA_ORCHESTRATOR,
      queueOptions: {
        durable: false,
      },
    },
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen();
}
bootstrap();
