import { CommonHelper } from "../../app/helpers/common.helper";
import { HttpException, HttpStatus } from '@nestjs/common';
import { catchError, lastValueFrom, Observable, timeout } from 'rxjs';

export class BaseService {
  protected commonHelper: CommonHelper;
  constructor() {
    this.commonHelper = CommonHelper.getInstance();
  }

  async serviceResponse(res: Observable<any>): Promise<Observable<any>> {
    const pipe = res.pipe(
      timeout(+process.env.CALL_SERVICE_TIMEOUT),
      catchError((err) => {
        // console.log('err: ', err);
        // When microservice throw error exception
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            errorService: err.errorService,
            stack: err?.stack,
            trace: err?.trace,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );

    const lastValue = await lastValueFrom(pipe);
    if (lastValue?.statusCode && lastValue.statusCode != HttpStatus.OK) {
      // When microservice response error
      throw new HttpException(lastValue, lastValue.statusCode);
    }

    return lastValue?.data ? lastValue.data : lastValue;
  }
}
