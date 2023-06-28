import { LoadingState } from '@postify/util';
import * as fromPosts from './posts.reducer';
import {
  selectError,
  selectLoading,
  selectPosts,
  selectPostsState,
  selectPostsViewModel,
} from './posts.selectors';
import { HttpErrorResponse } from '@angular/common/http';

const POSTS = [
  {
    userId: 1,
    id: 1,
    title: 'Post title 1',
    body: 'Post body 1',
  },
];

describe('Posts Selectors', () => {
  const state: fromPosts.PostState = {
    data: POSTS,
    callState: LoadingState.IDLE,
  };
  it('should select the feature state', () => {
    const result = selectPostsState({
      [fromPosts.postsFeatureKey]: {},
    });

    expect(result).toEqual({});
  });

  it('should select posts', () => {
    const result = selectPosts.projector(state);
    expect(result).toEqual(POSTS);
  });

  describe('Loading state', () => {
    it('should select loading state', () => {
      const result = selectLoading({ [fromPosts.postsFeatureKey]: state });
      expect(result).toEqual(LoadingState.IDLE);
    });

    it('should select loading state with idle', () => {
      const result = selectLoading.projector(
        new HttpErrorResponse({ status: 500 })
      );
      expect(result).toEqual(LoadingState.IDLE);
    });
  });

  describe('Error state', () => {
    it('should select error state', () => {
      const error = new HttpErrorResponse({ status: 500 });
      const result = selectError.projector(error);
      expect(result).toEqual(error);
    });
    it('should select error state with undefined', () => {
      const result = selectError.projector(LoadingState.IDLE);
      expect(result).toBeUndefined();
    });
  });

  it('should select viewModel', () => {
    const result = selectPostsViewModel.projector(
      POSTS,
      LoadingState.IDLE,
      undefined
    );
    expect(result).toEqual({
      posts: POSTS,
      loading: LoadingState.IDLE,
      error: undefined,
    });
  });
});
