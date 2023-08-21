import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { EOL } from 'os';
import { CustomLogger } from 'src/logger/custom-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly customLogger: CustomLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const now = Date.now();
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const { method, url, query, body } = request;

    this.customLogger.setContext(url);

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();
      const message = exception.message;

      const httpResponseBody = {
        statusCode: httpStatus,
        message,
        timestamp: new Date().toISOString(),
        path: url,
      };

      this.customLogger.debug(
        `Method: "${method}" URL: "${url}" Query: ${JSON.stringify(
          query,
          null,
          2,
        )} Status-code: ${httpStatus}${EOL}Requests-body: ${JSON.stringify(
          body,
          null,
          2,
        )}${EOL}Error: ${JSON.stringify(
          httpResponseBody,
          null,
          2,
        )}${EOL}Time: ${Date.now() - now}ms`,
      );

      httpAdapter.reply(
        context.getResponse<Response>(),
        httpResponseBody,
        httpStatus,
      );
    } else {
      console.log('exception', exception);
      const httpResponseBody = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };

      this.customLogger.debug(
        `Method: "${method}" URL: "${url}" Query: ${JSON.stringify(
          query,
          null,
          2,
        )} Status-code: ${
          httpResponseBody.statusCode
        }${EOL}Requests-body: ${JSON.stringify(
          body,
          null,
          2,
        )}${EOL}Error: ${JSON.stringify(
          httpResponseBody,
          null,
          2,
        )}${EOL}Time: ${Date.now() - now}ms`,
      );

      httpAdapter.reply(
        context.getResponse<Response>(),
        httpResponseBody,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
