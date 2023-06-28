import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { PostsEffects } from './posts.effects';
import { DataService } from '../../services/data.service';
import { PostsActions } from './posts.actions';
import { HttpErrorResponse } from '@angular/common/http';

const POSTS = [
  {
    userId: 1,
    id: 1,
    title: 'Post title 1',
    body: 'Post body 1',
  },
];

describe('PostsEffects', () => {
  let actions$: Observable<any>;
  let effects: PostsEffects;
  const mockDataService = {
    loadPosts: jest.fn(() => of(POSTS)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useValue: mockDataService },
      ],
    });

    effects = TestBed.inject(PostsEffects);
  });

  it('should dispatch posts successful action', (done) => {
    actions$ = of(PostsActions.loadPosts());
    effects.loadPosts$.subscribe((postsSuccessAction) => {
      expect(postsSuccessAction).toEqual({
        type: PostsActions.loadPostsSuccess.type,
        posts: POSTS,
      });
      done();
    });
  });

  it('should not dispatch posts error action', (done) => {
    const error = new HttpErrorResponse({ status: 500 });
    mockDataService.loadPosts.mockReturnValue(throwError(() => error));
    actions$ = of(PostsActions.loadPosts());
    effects.loadPosts$.subscribe((postsSuccessAction) => {
      expect(postsSuccessAction).toEqual({
        type: PostsActions.loadPostsError.type,
        error,
      });
      done();
    });
  });
});
