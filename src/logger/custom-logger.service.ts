import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { appendFileSync, mkdirSync, statSync } from 'fs';
import { EOL } from 'os';
import { LOG_LEVELS } from 'src/constants/constants';

const pathLogs = process.cwd() + '/logs';
let dateLogFile = '';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  maxFileSize: number;
  dateLogFile: string;
  constructor(private readonly configService: ConfigService) {
    super();

    let levels = this.configService.get<number>('LOG_LEVELS');
    this.setLogLevels(LOG_LEVELS.slice(0, ++levels));

    this.maxFileSize = this.configService.get<number>('MAX_FILE_SIZE') * 1024;
  }
  log(message: string) {
    if (this.isLevelEnabled('log')) {
      const formattedMessage = this.customFormatMessage(message, 'log');
      this.writeToFile('📢 ' + formattedMessage);
    }

    super.log('📢 ' + message);
  }

  error(message: string, trace: string) {
    if (this.isLevelEnabled('error')) {
      this.writeToFile('❌ ' + this.customFormatMessage(message, 'error'));
      this.writeToFile(
        '🔍 Stack Trace: ' + this.customFormatMessage(trace, 'error'),
      );
    }

    super.error('❌ ' + message);
    super.error('🔍 Stack Trace: ' + trace);
  }

  warn(message: string) {
    if (this.isLevelEnabled('warn')) {
      this.writeToFile('⚠️ ' + this.customFormatMessage(message, 'warn'));
    }

    super.warn('⚠️ ' + message);
  }

  debug(message: string) {
    if (this.isLevelEnabled('debug')) {
      this.writeToFile('🐞 ' + this.customFormatMessage(message, 'debug'));
    }

    super.debug('🐞 ' + message);
  }

  verbose(message: string) {
    if (this.isLevelEnabled('verbose')) {
      this.writeToFile(this.customFormatMessage(message, 'debug'));
    }

    super.verbose(message);
  }

  private writeToFile(message: string) {
    mkdirSync(resolve(pathLogs), {
      recursive: true,
    });

    const fileSize = statSync(
      resolve(pathLogs, `${dateLogFile}-combined.log`),
      {
        throwIfNoEntry: false,
      },
    );

    if (fileSize && fileSize.size < this.maxFileSize) {
      appendFileSync(resolve(pathLogs, `${dateLogFile}-combined.log`), message);
    } else {
      this.buildName();
      appendFileSync(resolve(pathLogs, `${dateLogFile}-combined.log`), message);
    }
  }

  private customFormatMessage(message: string, logLevel: LogLevel) {
    return (
      `[${logLevel.toLocaleUpperCase()}]` +
      [this.getTimestamp()] +
      ' ' +
      message +
      EOL
    );
  }

  private buildName() {
    const date = new Date();
    dateLogFile = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}_${date.getTime()}`;
  }
}
