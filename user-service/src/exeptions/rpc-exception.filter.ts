import { Catch, ExceptionFilter, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { serviceName } from "../app/constants/microservice.constant";

@Catch(RpcException)
export class AllRpcExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<any> {
    return throwError(() => {
      return {
        message: exception.getError(),
        errorService: serviceName.USER,
      };
    });
  }
}
