import winston from "winston";
const { json, prettyPrint, combine, timestamp, printf, colorize } =
  winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  const msg = typeof message === "object" ? JSON.stringify(message) : message;
  return `${timestamp} [${level}] : ${msg}`;
});
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combine.log" }),
    new winston.transports.Console({
      format: combine(timestamp(), colorize(), customFormat),
    }),
  ],
});

export default logger;
