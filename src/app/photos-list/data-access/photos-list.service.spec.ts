import { TestBed } from '@angular/core/testing';

import { PhotosListService } from './photos-list.service';

describe('PhotosListService', () => {
  let service: PhotosListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotosListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
