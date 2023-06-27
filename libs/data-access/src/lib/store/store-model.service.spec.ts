import { TestBed } from '@angular/core/testing';

import { StoreModelService } from './store-model.service';

describe('StoreModelService', () => {
  let service: StoreModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
