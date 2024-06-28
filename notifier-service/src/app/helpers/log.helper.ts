import * as winston from 'winston';
import { SPLAT } from 'triple-beam';
import { constants } from '../constants/common.constant';

const myFormatter = winston.format((info) => {
  const { message } = info;
  if (info.data) {
    info.message = `${message} ${JSON.stringify(info.data)}`;
    delete info.data;
  }

  return info;
})();

export class LogHelper {
  private static instance: LogHelper;

  private constructor() {}

  public static getInstance(): LogHelper {
    if (!LogHelper.instance) {
      LogHelper.instance = new LogHelper();
    }
    return LogHelper.instance;
  }

  public winstonOptions(level: string) {
    const logDir = process.env.LOG_DIR || 'src/tmp/logs';
    const maxLogFiles = process.env.MAX_LOG_FILES || 10;
    return {
      name: `${level}-log`,
      filename: `%DATE%.${level}.log`,
      dirname: `${logDir}/${level}`,
      datePattern: constants.DATE_FORMAT,
      maxFiles: maxLogFiles,
      format: this.logFormat(),
      auditFile: `${logDir}/${level}-audit.json`,
      level: level,
      options: {
        mode: process.env.LOG_FILE_PERMISSION ? +process.env.LOG_FILE_PERMISSION : 0o775,
      }
    };
  }

  public logFormat() {
    return winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      // myFormatter,
      winston.format.printf((info) => {
        let logContent = `${info.timestamp} [${info.level}]: `;
        if (info.message) {
          logContent += `${info.message}.`;
          if (info?.stack) {
            logContent += `\n    STACK: ${info.stack}.`;
          }
        } else {
          logContent += `${JSON.stringify(info)}.`;
        }
        if (info[SPLAT]) {
          logContent += `\n    SPLAT: ${JSON.stringify(info[SPLAT])}`;
        }
        logContent += `\n`;

        return logContent;
      }),
    );
  }

  public consoleLogFormat() {
    return winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((info) => {
        if (info.message) {
          return `${info.timestamp} [${info.level}]: ${info.message}.`;
        } else {
          return `${info.timestamp} [${info.level}]: ${JSON.stringify(info)}.`;
        }
      }),
    );
  }
}
