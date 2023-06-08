import { TestBed } from '@angular/core/testing';

import { PhotoDetailsService } from './photo-details.service';

describe('PhotoDetailsService', () => {
  let service: PhotoDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
