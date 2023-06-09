import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PhotoDetailsService } from './photo-details.service';
import { PhotosListService } from 'src/app/photos-list/data-access/photos-list.service';

describe('PhotoDetailsService', () => {
  let service: PhotoDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosListService],
    });
    service = TestBed.inject(PhotoDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
