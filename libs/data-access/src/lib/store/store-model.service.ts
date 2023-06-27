import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions } from './posts/posts.actions';

@Injectable({
  providedIn: 'root',
})
export class StoreModelService {
  constructor(private readonly store: Store) {}

  loadPosts() {
    console.log('loading posts...')
    this.store.dispatch(PostsActions.loadPosts());
  }
}
