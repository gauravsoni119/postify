import * as fromPosts from './posts.reducer';
import { selectPostsState } from './posts.selectors';

describe('Posts Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPostsState({
      [fromPosts.postsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
