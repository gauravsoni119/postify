import { createFeature, createReducer, on } from '@ngrx/store';
import { PostsActions } from './posts.actions';

export const postsFeatureKey = 'posts';

export interface PostState {
  posts: any[];
}

export const initialState: PostState = {
  posts: [],
};

export const reducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => state)
);

export const postsFeature = createFeature({
  name: postsFeatureKey,
  reducer,
});
