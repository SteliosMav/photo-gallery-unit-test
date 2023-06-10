import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PhotosListService, Photo } from './photos-list.service';
import { environment } from 'src/environments/environment';

describe('PhotosListService', () => {
  let service: PhotosListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PhotosListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method to load more photos', () => {
    expect(service.loadMorePhotos).toBeTruthy();
  });

  it('should have a method to initialize photos', () => {
    expect(service.initPhotos).toBeTruthy();
  });

  it('should have a method to update a photo', () => {
    expect(service.updateOne).toBeTruthy();
  });

  it('should have a private method to push loaded photos', () => {
    expect((service as any)._pushLoadedPhotos).toBeTruthy();
  });

  it('should have a private method to get photos', () => {
    expect((service as any)._getPhotos).toBeTruthy();
  });

  it('should have a private behavior subject to hold loaded photos', () => {
    expect((service as any)._loadedPhotos).toBeTruthy();
  });

  it('should have a private behavior subject to track loading state', () => {
    expect((service as any)._loading).toBeTruthy();
  });

  it('should have a public observable to expose loaded photos', () => {
    expect(service.loadedPhotos$).toBeTruthy();
  });

  it('should have a public observable to expose loading state', () => {
    expect(service.loading$).toBeTruthy();
  });

  it('should have a public observable to expose failed to load photos', () => {
    expect(service.failedToLoadPhotos$).toBeTruthy();
  });

  it('should load more photos and update the loaded photos state', () => {
    const mockPhotos: Photo[] = [
      {
        id: '1',
        author: 'John Doe',
        height: 800,
        width: 600,
        download_url: 'https://example.com/photo1.jpg',
        url: 'https://example.com/photo1',
        isFavorite: false,
      },
    ];

    service.loadMorePhotos().subscribe(() => {
      expect(service['_loadedPhotos'].getValue()).toEqual(mockPhotos);
    });

    const req = httpMock.expectOne(`${environment.api}/v2/list?page=2`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });

  it('should initialize photos and update the loaded photos state', () => {
    const mockPhotos: Photo[] = [
      {
        id: '1',
        author: 'John Doe',
        height: 800,
        width: 600,
        download_url: 'https://example.com/photo1.jpg',
        url: 'https://example.com/photo1',
        isFavorite: false,
      },
    ];

    service.initPhotos().subscribe(() => {
      expect(service['_loadedPhotos'].getValue()).toEqual(mockPhotos);
    });

    const req = httpMock.expectOne(`${environment.api}/v2/list?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });

  it('should handle failed photo loading and emit error', () => {
    spyOn(console, 'log');
    spyOn(service.failedToLoadPhotos$, 'next');

    service.initPhotos().subscribe(() => {
      expect(console.log).toHaveBeenCalled();
      expect(service.failedToLoadPhotos$.next).toHaveBeenCalledWith(true);
    });

    const req = httpMock.expectOne(`${environment.api}/v2/list?page=1`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });

  it('should update a photo with new data', () => {
    const mockPhotos: Photo[] = [
      {
        id: '1',
        author: 'John Doe',
        height: 800,
        width: 600,
        download_url: 'https://example.com/photo1.jpg',
        url: 'https://example.com/photo1',
        isFavorite: false,
      },
    ];

    const updatedPhoto: Partial<Photo> = {
      isFavorite: true,
    };

    service.initPhotos().subscribe(() => {
      expect(service['_loadedPhotos'].getValue()).toEqual(mockPhotos);

      service.updateOne('1', updatedPhoto);

      const updatedPhotos = service['_loadedPhotos'].getValue();
      expect(updatedPhotos[0].isFavorite).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.api}/v2/list?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });
});
