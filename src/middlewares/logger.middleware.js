import logger from "../utils/logger.js";

const loggerMiddleware = (req, res, next) => {
  const { method, originalUrl } = req;
  const start = Date.now();

  res.on("finish", () => {
    const finish = Date.now() - start;
    logger.info(`${method} ${originalUrl} ${res.statusCode} - ${finish}ms`);
  });
  next();
};
export default loggerMiddleware;
