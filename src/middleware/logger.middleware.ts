import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from 'src/logger/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly customLogger: CustomLogger) {}
  use(request: Request, response: Response, next: NextFunction) {
    const { method, url, query, body } = request;
    this.customLogger.setContext(url);
    this.customLogger.log('response');
    this.customLogger.log(
      `Method:${method} URL:${url} Query:${JSON.stringify(
        query,
        null,
        2,
      )} Body:${JSON.stringify(body, null, 2)}\nResponse Status Code: ${
        response.statusCode
      }`,
    );
    next();
  }
}
