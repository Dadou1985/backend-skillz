import winston from "winston";
import fs from "fs";
import "winston-daily-rotate-file";

const { combine, timestamp, errors, json } = winston.format;

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
  }

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({

        filename: "logs/app-%DATE%.log",
  
        datePattern: "YYYY-MM-DD",
  
        maxSize: "20m",
  
        maxFiles: "14d",
  
      }),
  
      new winston.transports.DailyRotateFile({
  
        filename: "logs/error-%DATE%.log",
  
        level: "error",
  
        datePattern: "YYYY-MM-DD",
  
        maxSize: "20m",
  
        maxFiles: "30d",
  
      }),
  ],
});