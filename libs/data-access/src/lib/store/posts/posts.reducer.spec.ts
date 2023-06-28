import { LoadingState } from '@postify/util';
import { PostsActions } from './posts.actions';
import { reducer, initialState } from './posts.reducer';
import { HttpErrorResponse } from '@angular/common/http';

const POSTS = [
  {
    userId: 1,
    id: 1,
    title: 'Post title 1',
    body: 'Post body 1',
  },
];

describe('Posts Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    it('should update callState', () => {
      const result = reducer(initialState, PostsActions.loadPosts());

      expect(result.callState).toEqual(LoadingState.LOADING);
    });

    it('should update posts', () => {
      const result = reducer(
        initialState,
        PostsActions.loadPostsSuccess({ posts: POSTS })
      );

      expect(result.data).toEqual(POSTS);
    });

    it('should update error state', () => {
      const error = new HttpErrorResponse({ status: 500 });
      const result = reducer(
        initialState,
        PostsActions.loadPostsError({ error })
      );

      expect(result.callState).toEqual(error);
    });
  });
});
