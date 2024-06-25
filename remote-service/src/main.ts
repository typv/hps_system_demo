import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Swagger
  const isDebug: boolean = process.env.DEBUG === 'true';
  if (isDebug) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(`${ process.env.APP_NAME } Swagger`)
      .setDescription(`The ${ process.env.APP_NAME } API description`)
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        persistAuthorization: isDebug,
      },
    });
  }

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
