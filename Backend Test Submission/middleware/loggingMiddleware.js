import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'request_logs.txt');

export const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const body = JSON.stringify(req.body);

  const logEntry = `[${timestamp}] ${method} ${url} - Body: ${body}\n`;

  
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to log request');
    }
  });

  next();
};
