import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configDotEnv = app.get(ConfigService);
  const logger = app.get(CustomLogger);
  app.useLogger(logger);

  // process.on('uncaughtException', (err, origin) => {
  //   const message =
  //     `Caught exception: ${err}\n` + `Exception origin: ${origin}`;
  //   logger.error(message, err.stack);
  // });

  // process.on('unhandledRejection', (reason, promise) => {
  //   logger.debug(`Unhandled Rejection at: ${promise},${EOL}reason: ${reason}`);
  // });

  const port = configDotEnv.get<number>('PORT_API');

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('HLS API with CRUD functionality')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();

  SwaggerModule.setup('doc', app, document);
  await app.listen(port || 4000);
}

bootstrap();

process.on('uncaughtException', (err, origin) => {
  const message = `Caught exception: ${err}\n` + `Exception origin: ${origin}`;
  console.log(message, err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});
