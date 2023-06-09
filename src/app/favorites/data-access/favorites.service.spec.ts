import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { Photo } from 'src/app/photos-list/data-access/photos-list.service';
import { FAVORITE_PHOTOS_STORAGE_KEY } from 'src/environments/constants';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize favorite photos', () => {
    const favoritePhotos: Photo[] = [
      {
        id: '1',
        author: 'John',
        height: 200,
        width: 300,
        download_url: 'https://example.com',
        url: 'https://example.com',
        isFavorite: true,
      },
      {
        id: '2',
        author: 'Jane',
        height: 400,
        width: 600,
        download_url: 'https://example.com',
        url: 'https://example.com',
        isFavorite: true,
      },
    ];

    beforeEach(() => {
      localStorage.setItem(
        FAVORITE_PHOTOS_STORAGE_KEY,
        JSON.stringify(favoritePhotos)
      );
      service.initFavoritePhotos();
    });

    it('should initialize favorite photos from local storage', () => {
      service.favoritePhotos$.subscribe((photos) => {
        expect(photos).toEqual(favoritePhotos);
      });
    });

    it('should initialize empty favorite photos when local storage is empty', () => {
      localStorage.removeItem(FAVORITE_PHOTOS_STORAGE_KEY);
      service.initFavoritePhotos();

      service.favoritePhotos$.subscribe((photos) => {
        expect(photos).toEqual([]);
      });
    });
  });

  describe('add a photo to favorite photos', () => {
    const photoToAdd: Photo = {
      id: '3',
      author: 'Alice',
      height: 300,
      width: 400,
      download_url: '...',
      url: '...',
      isFavorite: false,
    };
    const previousPhotos: Photo[] = [
      {
        id: '1',
        author: 'John',
        height: 200,
        width: 300,
        download_url: '...',
        url: '...',
        isFavorite: true,
      },
      {
        id: '2',
        author: 'Jane',
        height: 400,
        width: 600,
        download_url: '...',
        url: '...',
        isFavorite: true,
      },
    ];
    const expectedPhotos: Photo[] = [
      ...previousPhotos,
      { ...photoToAdd, isFavorite: true },
    ];

    beforeEach(() => {
      service['_favoritePhotos'].next(previousPhotos);
      service.addPhotoToFavorites(photoToAdd);
    });

    it('should add a photo to favorite photos', () => {
      service.favoritePhotos$.subscribe((photos) => {
        expect(photos).toEqual(expectedPhotos);
      });
    });

    it('should update the storage', () => {
      const storageData = JSON.parse(
        localStorage.getItem(FAVORITE_PHOTOS_STORAGE_KEY) || '[]'
      );
      expect(storageData).toEqual(expectedPhotos);
    });
  });

  describe('remove a photo from favorite photos', () => {
    const photoToRemove: Photo = {
      id: '2',
      author: 'Jane',
      height: 400,
      width: 600,
      download_url: '...',
      url: '...',
      isFavorite: true,
    };
    const previousPhotos: Photo[] = [
      {
        id: '1',
        author: 'John',
        height: 200,
        width: 300,
        download_url: '...',
        url: '...',
        isFavorite: true,
      },
      { ...photoToRemove },
    ];
    const expectedPhotos: Photo[] = [previousPhotos[0]];

    beforeEach(() => {
      service['_favoritePhotos'].next(previousPhotos);
      service.removePhotoFromFavorites(photoToRemove);
    });

    it('should remove a photo from favorite photos', () => {
      service.favoritePhotos$.subscribe((photos) => {
        expect(photos).toEqual(expectedPhotos);
      });
    });

    it('should update the storage', () => {
      const storageData = JSON.parse(
        localStorage.getItem(FAVORITE_PHOTOS_STORAGE_KEY) || '[]'
      );
      expect(storageData).toEqual(expectedPhotos);
    });
  });

  it('should find a photo by ID in favorite photos', () => {
    const photos: Photo[] = [
      {
        id: '1',
        author: 'John',
        height: 200,
        width: 300,
        download_url: '...',
        url: '...',
        isFavorite: true,
      },
      {
        id: '2',
        author: 'Jane',
        height: 400,
        width: 600,
        download_url: '...',
        url: '...',
        isFavorite: true,
      },
      {
        id: '3',
        author: 'Alice',
        height: 300,
        width: 400,
        download_url: '...',
        url: '...',
        isFavorite: true,
      },
    ];

    service['_favoritePhotos'].next(photos);
    const idToFind = '2';
    const expectedPhoto: Photo = photos[1];

    const foundPhoto = service.findOne(idToFind);

    expect(foundPhoto).toEqual(expectedPhoto);
  });
});
