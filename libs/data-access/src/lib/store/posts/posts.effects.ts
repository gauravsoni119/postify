import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs';
import { PostsActions } from './posts.actions';
import { DataService } from '../../services/data.service';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      switchMap(() =>
        this.dataService
          .fetchPosts()
          .pipe(map(() => PostsActions.loadPostsSuccess()))
      )
    );
  });

  constructor(private actions$: Actions, private dataService: DataService) {}
}
