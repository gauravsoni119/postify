import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './error-handler/error-handler';

@NgModule({
  imports: [CommonModule],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class CoreModule {}
