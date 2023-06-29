import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const extraModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    autoPause: true,
    trace: false,
    traceLimit: 75,
  }),
];
