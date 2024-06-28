import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ClassSerializerInterceptor } from "@nestjs/common";
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { serviceName } from "./app/constants/microservice.constant";
import { RedisIoAdapter } from "./modules/websockets/adapters/redis-io.adapter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));

  // Socket adapter
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  // Microservice listener
  await app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: serviceName.NOTIFIER,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
