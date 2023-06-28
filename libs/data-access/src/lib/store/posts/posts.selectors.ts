import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPosts from './posts.reducer';
import { LoadingState } from '@postify/util';

export const selectPostsState = createFeatureSelector<fromPosts.PostState>(
  fromPosts.postsFeatureKey
);

const selectCallState = createSelector(
  selectPostsState,
  ({ callState }) => callState
);

export const selectPosts = createSelector(selectPostsState, ({ data }) => data);
export const selectLoading = createSelector(selectCallState, (callState) =>
  !(callState instanceof HttpErrorResponse) ? callState : LoadingState.IDLE
);
export const selectError = createSelector(selectCallState, (callState) =>
  callState instanceof HttpErrorResponse ? callState : undefined
);

export const selectPostsViewModel = createSelector(
  selectPosts,
  selectLoading,
  selectError,
  (posts, loading, error) => ({ posts, loading, error })
);
