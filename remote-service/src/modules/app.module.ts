import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";
import { join } from 'path';
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import { LogHelper } from "../app/helpers/log.helper";
import {ConfigModule, ConfigService} from '@nestjs/config';
import 'winston-daily-rotate-file';
import jwtConfiguration from 'src/config/jwt.config';
import googleConfiguration from 'src/config/google.config';
import s3Configuration from 'src/config/s3.config';
import { HealthModule } from "./health/health.module";
import { MicroserviceModule } from "./microservice/microservice.module";
import { UserModule } from './user/user.module';
import { RecordBuilderModule } from "./record-builder/record-builder.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "../interceptors/response.interceptor";
import { RemittanceModule } from './remittance/remittance.module';

const logHelper = LogHelper.getInstance();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        jwtConfiguration,
        googleConfiguration,
        s3Configuration,
      ],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      resolvers: [AcceptLanguageResolver],
      loaderOptions: {
        path: join(__dirname, '..', 'resources', '/lang/'),
        watch: true,
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        transports: [
          new winston.transports.DailyRotateFile(logHelper.winstonOptions('error')),
          new winston.transports.DailyRotateFile(logHelper.winstonOptions('debug')),
          new winston.transports.Console({
            handleExceptions: true,
            format: logHelper.logFormat(),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    MicroserviceModule,
    UserModule,
    RecordBuilderModule,
    RemittanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
