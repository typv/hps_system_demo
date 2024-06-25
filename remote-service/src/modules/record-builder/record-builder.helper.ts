import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RmqRecordBuilder } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RecordBuilderHelper {
  constructor(
    @Inject(REQUEST) private readonly request: Request
  ) {}

  build(
    pattern: string,
    data: any = null,
    currentUserId: string = null,
    priority: number = 1
  ) {
    const authUser = this.request['user'];
    let authUserId: string;
    if (currentUserId) {
      authUserId = currentUserId.toString();
    } else if (authUser && authUser['id']) {
      authUserId = authUser['id'].toString();
    } else {
      authUserId = null;
    }

    return new RmqRecordBuilder<any>(pattern)
      .setOptions({
        headers: {
          currentUserId: authUserId,
        },
        priority: priority,
      })
      .setData(data)
      .build();
  }
}