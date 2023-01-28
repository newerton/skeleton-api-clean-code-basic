import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreApiResponse } from '@core/@shared/domain/api/CoreApiResponse';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CoreApiResponse<void>> {
    const request: Request = context.switchToHttp().getRequest();
    const requestStartDate: number = Date.now();

    if (request.method && request.path) {
      return next.handle().pipe(
        tap((): void => {
          const requestFinishDate: number = Date.now();

          const message: string =
            `Method: ${request.method}; ` +
            `Path: ${request.path}; ` +
            `SpentTime: ${requestFinishDate - requestStartDate}ms`;

          Logger.log(message, HttpLoggingInterceptor.name);
        }),
      );
    } else {
      return next.handle();
    }
  }
}
