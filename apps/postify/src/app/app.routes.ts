import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'postify',
    loadChildren: () =>
      import('@postify/shell').then((shell) => shell.ShellModule),
  },
  {path: '**', redirectTo: 'postify'}
];
