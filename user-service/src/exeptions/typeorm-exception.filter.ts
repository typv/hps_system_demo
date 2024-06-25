import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger
} from "@nestjs/common";
import { TypeORMError } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as process from 'process';
import { serviceName } from "../app/constants/microservice.constant";
import { RpcException } from "@nestjs/microservices";

@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter<TypeORMError> {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const errorData: { [key: string]: any } = {};
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    errorData.statusCode = statusCode;
    errorData.message = 'Internal server error';
    errorData.errorService = serviceName.USER;
    const isDebugMode = process.env.DEBUG === 'true';
    if (isDebugMode) {
      errorData.stack = exception?.stack;
      errorData.trace = exception;
    }

    this.logger.error('TypeORMError', exception);
    throw new RpcException(errorData);
  }
}
