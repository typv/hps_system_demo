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
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import dataSourceDefaultOptions from "../../ormconfig";
import s3Configuration from 'src/config/s3.config';
import { APP_FILTER } from "@nestjs/core";
import { AllRpcExceptionFilter } from "../exeptions/rpc-exception.filter";
import { TypeormExceptionFilter } from "../exeptions/typeorm-exception.filter";
import { RemittanceModule } from './remittance/remittance.module';

const logHelper = LogHelper.getInstance();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceDefaultOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        jwtConfiguration,
        s3Configuration,
      ],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      resolvers: [AcceptLanguageResolver],
      loaderOptions: {
        path: join(__dirname, '..', '..', 'resources', '/lang/'),
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
    UserModule,
    RemittanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllRpcExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeormExceptionFilter,
    },
  ],
})
export class AppModule {}
