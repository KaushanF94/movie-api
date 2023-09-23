import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log the incoming request
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);

    // Continue processing the request
    next();
  }
}
