import { TestBed } from '@angular/core/testing';

import { LoggerService, prodMode } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log message to console', () => {
    const message = 'Some test message';
    jest.spyOn(console, 'log');
    service.log(message);
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(message);
  });

  it('should log error to console', () => {
    const message = 'Some error';
    jest.spyOn(console, 'error');
    service.error(message);
    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(message);
  });

  it('should log warning message to console', () => {
    const message = 'Some warning message';
    jest.spyOn(console, 'warn');
    service.warn(message);
    expect(console.warn).toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(message);
  });
});

describe('prodMode Decorator', () => {
  it('should replace properDescriptor function with empty function if prodMode is on', () => {
    const mockConsole = Object.defineProperty({}, 'log', {
      value: (message: any) => message,
    });
    const decoratedMethodInProdMode = prodMode(false)(
      mockConsole,
      'log',
      mockConsole
    );
    expect(decoratedMethodInProdMode.value()).toEqual(undefined);
  });

  it('should not replace properDescriptor function with empty function if prodMode is off', () => {
    const logFunction = (message: unknown) => message;
    const mockConsole = Object.defineProperty({}, 'log', {
      value: logFunction,
    }) as Record<'log', PropertyDescriptor>;
    const decoratedMethodInDevMode = prodMode(true)(
      mockConsole,
      'log',
      mockConsole.log
    );
    expect(decoratedMethodInDevMode).toEqual(logFunction);
  });
});
