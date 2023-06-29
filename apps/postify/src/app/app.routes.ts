import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'postify',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'postify',
        loadChildren: () =>
          import('./pages/posts-bundle.module').then(
            (bundle) => bundle.PostsBundleModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'postify' },
];
