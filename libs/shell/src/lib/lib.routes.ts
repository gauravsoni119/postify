import { Route } from '@angular/router';
import { PostsComponent } from '@postify/feature';

export const shellRoutes: Route[] = [
  {
    path: '',
    component: PostsComponent,
  },
];
