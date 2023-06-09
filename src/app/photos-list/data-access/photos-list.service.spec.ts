import { TestBed } from '@angular/core/testing';

import { PhotosListService } from './photos-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PhotosListService', () => {
  let service: PhotosListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PhotosListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
