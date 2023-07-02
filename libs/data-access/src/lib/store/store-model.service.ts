import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions } from './posts/posts.actions';
import { selectPostsViewModel } from './posts/posts.selectors';

/** Facade service to wrap all store logic that feature libs want to use  */
@Injectable({
  providedIn: 'root',
})
export class StoreModelService {
  readonly postsViewModel$ = this.store.select(selectPostsViewModel);
  constructor(private readonly store: Store) {}

  loadPosts() {
    this.store.dispatch(PostsActions.loadPosts());
  }
}
