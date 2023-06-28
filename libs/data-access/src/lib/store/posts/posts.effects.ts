import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, map, switchMap, catchError } from 'rxjs';
import { PostsActions } from './posts.actions';
import { DataService } from '../../services/data.service';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      switchMap(() =>
        this.dataService.loadPosts().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) => of(PostsActions.loadPostsError({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private dataService: DataService) {}
}
