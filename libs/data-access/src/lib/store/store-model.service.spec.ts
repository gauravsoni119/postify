import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { StoreModelService } from './store-model.service';
import {
  PostState,
  initialState,
  postsFeatureKey,
} from './posts/posts.reducer';

describe('StoreModelService', () => {
  let service: StoreModelService;
  let storeStub: MockStore<{ postsFeatureKey: PostState }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [postsFeatureKey]: {
              ...initialState,
            },
          },
        }),
      ],
    });
    service = TestBed.inject(StoreModelService);
    storeStub = TestBed.inject(MockStore);
    jest.spyOn(storeStub, 'dispatch');
  });

  it('should dispatch load posts action', () => {
    service.loadPosts();
    expect(storeStub.dispatch).toHaveBeenCalled();
  });
});
