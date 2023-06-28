import { createFeature, createReducer, on } from '@ngrx/store';
import { PostsActions } from './posts.actions';
import { GenericState, LoadingState, Post } from '@postify/util';

export const postsFeatureKey = 'posts';

export type PostState = GenericState<Post[]>;

export const initialState: PostState = {
  data: [],
  callState: LoadingState.IDLE,
};

export const reducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    data: posts,
    callState: LoadingState.IDLE,
  })),
  on(PostsActions.loadPostsError, (state, { error }) => ({
    ...state,
    callState: error,
  }))
);

export const postsFeature = createFeature({
  name: postsFeatureKey,
  reducer,
});
