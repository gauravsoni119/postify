import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from '../services/logger/logger.service';

@Injectable()
/**
 * Global error handler to handle either server or client side error.
 * We can use to get stacktrace of error and send it to some channels(like slack, hipchat etc)
 */
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private logger: LoggerService) {}
  handleError(error: Error | HttpErrorResponse) {
    this.logger.log(error);
    // Handle client/server side error here such as send stack trace to backend api to record errors etc.
  }
}
