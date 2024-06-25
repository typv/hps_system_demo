import { Injectable } from '@nestjs/common';
import { BaseController } from "./base/base.controller";

@Injectable()
export class AppService extends BaseController {
  constructor() {
    super();
  }
  getHello(): string {
    return 'Hello world';
  }
}
