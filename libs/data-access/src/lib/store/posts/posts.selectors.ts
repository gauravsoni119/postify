import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPosts from './posts.reducer';

export const selectPostsState = createFeatureSelector<fromPosts.State>(
  fromPosts.postsFeatureKey
);
