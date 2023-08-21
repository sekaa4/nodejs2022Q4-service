import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { EOL } from 'os';
import { CustomLogger } from 'src/logger/custom-logger.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly customLogger: CustomLogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, query, body } = request;
    this.customLogger.setContext(url);

    return next.handle().pipe(
      tap((resData) => {
        if (resData instanceof User) delete resData.password;

        const { statusCode } = response;
        this.customLogger.log(
          `Method: "${method}" URL: "${url}" Query: ${JSON.stringify(
            query,
            null,
            2,
          )} Status-code: ${statusCode}${EOL}Requests-body: ${JSON.stringify(
            body,
            null,
            2,
          )}${EOL}Response-body: ${JSON.stringify(
            resData,
            null,
            2,
          )}${EOL}Controller: ${context.getClass().name}${EOL}Handler: ${
            context.getHandler().name
          }${EOL}Time: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
