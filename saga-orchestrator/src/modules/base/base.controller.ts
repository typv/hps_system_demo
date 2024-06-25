import { CommonHelper } from "../../app/helpers/common.helper";
import { HttpException, HttpStatus } from '@nestjs/common';
import { catchError, lastValueFrom, Observable, timeout } from 'rxjs';
import { RpcException } from "@nestjs/microservices";

export class BaseController {
  protected commonHelper: CommonHelper;
  constructor() {
    this.commonHelper = CommonHelper.getInstance();
  }

  async serviceResponse(res: Observable<any>): Promise<Observable<any>> {
    const pipe = res.pipe(
      timeout(+process.env.CALL_SERVICE_TIMEOUT),
      catchError((err) => {
        // When microservice throw error exception
        throw new RpcException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            errorService: err.errorService || err?.error?.errorService,
            stack: err?.stack || err?.error?.stack,
            trace: err?.trace || err?.error?.trace,
          }
        );
      }),
    );

    const lastValue = await lastValueFrom(pipe);
    if (lastValue?.statusCode && lastValue.statusCode != HttpStatus.OK) {
      // When microservice response error
      throw new RpcException(lastValue);
    }

    return lastValue?.data ? lastValue.data : lastValue;
  }
}
