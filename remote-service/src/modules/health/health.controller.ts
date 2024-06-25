import { Controller, Get, Inject, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../app/decorators/public';
import * as process from 'process';
import { serviceName } from "../microservice/microservice.constant";
import { HealthCheck, HttpHealthIndicator, HealthCheckService } from "@nestjs/terminus";

@ApiTags('Health Check')
@Public()
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    @Inject(serviceName.USER) private readonly userService: ClientProxy,
    @Inject(serviceName.ORDER) private readonly paymentService: ClientProxy,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      () => this.http.pingCheck(process.env.APP_NAME, process.env.APP_URL),
    ]);
  }

  @Get('user-service')
  @HealthCheck()
  async heathCheckUserService() {
    const payload = {
      statusCode: 200,
      PONG: true,
    };
    return this.userService.send('PING', payload).pipe(
      timeout(5000),
      catchError((err) => {
        throw new InternalServerErrorException(`There is a problem with the ${ serviceName.USER }.`, err);
      }),
    );
  }

  @Get('order-service')
  @HealthCheck()
  async heathCheckOrderService() {
    const payload = {
      statusCode: 200,
      PONG: true,
    };
    return this.userService.send('PING', payload).pipe(
      timeout(5000),
      catchError((err) => {
        throw new InternalServerErrorException(`There is a problem with the ${ serviceName.USER }.`, err);
      }),
    );
  }
}
