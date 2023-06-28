import { HttpErrorResponse } from '@angular/common/http';
import { LoadingState } from '../constants/loading-state';

export type CallState = LoadingState | HttpErrorResponse;

export interface GenericState<T> {
  data: T;
  callState: CallState;
}
