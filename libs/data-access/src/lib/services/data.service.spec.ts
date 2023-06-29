import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { POSTS } from '@postify/test-util';

import { BASE_PATH, DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let basePath: string;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        {
          provide: BASE_PATH,
          useValue: 'https://jsonplaceholder.typicode.com',
        },
      ],
    });
    service = TestBed.inject(DataService);
    basePath = TestBed.inject(BASE_PATH);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get list of posts', (done) => {
    service.loadPosts().subscribe((loadedPosts) => {
      expect(loadedPosts).toEqual(POSTS);
      done();
    });
    const request = httpTestingController.expectOne(`${basePath}/posts`);
    request.flush(POSTS);
  });

  afterEach(() => httpTestingController.verify());
});

describe('BASE_PATH', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should have default value for BASE_PATH', () => {
    const basePath = TestBed.inject(BASE_PATH);
    expect(basePath).toEqual('');
  });
});
