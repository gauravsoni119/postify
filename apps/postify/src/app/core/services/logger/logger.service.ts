import { Injectable, isDevMode } from '@angular/core';

/**
 * Decorator to check if application is running in prodMode and based on that log message to console
 * @param args contains target, propertyname and PropertyDescriptor
 * @returns function
 */
export function prodMode(devMode: boolean) {
  return function (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (!devMode) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      descriptor.value = () => {};
    }
    return descriptor;
  };
}

/**
 * Global service to log error.
 * Use it to send stack trace to other channels(e.g slack etc) to notify about errors.
 * Can also be used for logging additional info such as timestamp or file etc
 */

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  @prodMode(isDevMode())
  log(message: unknown) {
    console.log(message);
  }

  @prodMode(isDevMode())
  error(error: unknown) {
    console.error(error);
  }

  @prodMode(isDevMode())
  warn(message: unknown) {
    console.warn(message);
  }
}
