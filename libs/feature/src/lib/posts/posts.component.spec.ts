import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingState, Post } from '@postify/util';
import { StoreModelService } from '@postify/data-access';
import { POSTS } from '@postify/test-util';
import { PostsComponent } from './posts.component';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

describe('PostsComponent', () => {
  let fixture: ComponentFixture<PostsComponent>;
  const DEFAULT_VIEW_MODEL = {
    posts: [...POSTS],
    loading: LoadingState.IDLE,
    error: undefined,
  };
  const mockStoreModelService = {
    postsViewModel$: new BehaviorSubject<{
      posts: Post[];
      loading: LoadingState;
      error: HttpErrorResponse | undefined;
    }>({ ...DEFAULT_VIEW_MODEL }),
    loadPosts: jest.fn(),
  };

  const query = (q: string) => fixture.debugElement.query(By.css(q));

  const selectors = {
    posts: 'postify-post-list',
    loader: 'postify-skeleton-rect',
    errorState: 'postify-error-state',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        { provide: StoreModelService, useValue: mockStoreModelService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
  });

  it('should render posts', () => {
    expect(query(selectors.posts)).not.toBeNull();
  });

  it('should render loader', () => {
    mockStoreModelService.postsViewModel$.next({
      ...mockStoreModelService.postsViewModel$.value,
      loading: LoadingState.LOADING,
    });
    fixture.detectChanges();
    expect(query(selectors.loader)).not.toBeNull();
  });

  it('should render error state', () => {
    mockStoreModelService.postsViewModel$.next({
      ...mockStoreModelService.postsViewModel$.value,
      posts: [],
      error: new HttpErrorResponse({
        status: 500,
      }),
    });
    fixture.detectChanges();
    expect(query(selectors.errorState)).not.toBeNull();
  });

  afterEach(() =>
    mockStoreModelService.postsViewModel$.next({ ...DEFAULT_VIEW_MODEL })
  );
});
