import { createLogger, format, transports, Logger } from "winston";
import TransportStream from "winston-transport";

import "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

let logger: Logger | null = null;

const loggerTransports: TransportStream[] = [
  new transports.DailyRotateFile({
    filename: "logs/application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  }),
];

if (process.env.LOG !== "TEST") {
  loggerTransports.push(new transports.Console());
  logger = createLogger({
    level: "info",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      colorize(),
      logFormat
    ),
    transports: loggerTransports,
  });
}

export default logger;
