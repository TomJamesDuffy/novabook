import { Request, Response, NextFunction } from "express";
import client from "prom-client";

// Setup default metrics collection
client.collectDefaultMetrics();

// Create a custom counter metric
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "statusCode"],
});

// Middleware to count HTTP requests
const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      statusCode: res.statusCode.toString(),
    });
  });
  next();
};

// Route to expose metrics
const metricsRoute = async (req: Request, res: Response) => {
  try {
    const metrics = await client.register.metrics();
    res.set("Content-Type", client.register.contentType);
    res.end(metrics);
  } catch (ex) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { metricsMiddleware, metricsRoute };
