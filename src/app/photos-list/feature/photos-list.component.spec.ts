import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { PhotosListComponent } from './photos-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfiniteScrollModule } from 'src/app/shared/ui/infinite-scroll/infinite-scroll.module';
import { PhotoGridModule } from 'src/app/shared/ui/photo-grid/photo-grid.module';
import { PhotosListService, Photo } from '../data-access/photos-list.service';
import { FavoritesService } from 'src/app/favorites/data-access/favorites.service';

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;
  let photosListService: PhotosListService;
  let favoritesService: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosListComponent],
      imports: [HttpClientTestingModule, InfiniteScrollModule, PhotoGridModule],
      providers: [PhotosListService, FavoritesService],
    });
    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    photosListService = TestBed.inject(PhotosListService);
    favoritesService = TestBed.inject(FavoritesService);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more photos when triggered', () => {
    const loadMoreSpy = spyOn(
      photosListService,
      'loadMorePhotos'
    ).and.returnValue(of([]));
    const viewModel = { photos: [], loading: false };
    spyOn(photosListService.loadedPhotos$, 'pipe').and.returnValue(
      of(viewModel)
    );

    component.onLoadMore();

    expect(loadMoreSpy).toHaveBeenCalled();
  });

  it('should add a photo to favorites', () => {
    const photo: Photo = {
      id: '1',
      author: 'John Doe',
      height: 800,
      width: 600,
      download_url: 'https://example.com/photo1.jpg',
      url: 'https://example.com/photo1',
      isFavorite: false,
    };

    const updateOneSpy = spyOn(photosListService, 'updateOne');
    const addPhotoSpy = spyOn(favoritesService, 'addPhotoToFavorites');

    component.addPhotoToFavorites(photo);

    expect(updateOneSpy).toHaveBeenCalledWith(photo.id, { isFavorite: true });
    expect(addPhotoSpy).toHaveBeenCalledWith(photo);
  });

  it('should remove a photo from favorites', () => {
    const photo: Photo = {
      id: '1',
      author: 'John Doe',
      height: 800,
      width: 600,
      download_url: 'https://example.com/photo1.jpg',
      url: 'https://example.com/photo1',
      isFavorite: true,
    };

    const updateOneSpy = spyOn(photosListService, 'updateOne');
    const removePhotoSpy = spyOn(favoritesService, 'removePhotoFromFavorites');

    component.removePhotoFromFavorites(photo);

    expect(updateOneSpy).toHaveBeenCalledWith(photo.id, { isFavorite: false });
    expect(removePhotoSpy).toHaveBeenCalledWith(photo);
  });

  it('should display an alert when photo loading fails', () => {
    spyOn(window, 'alert');

    photosListService.failedToLoadPhotos$.subscribe();

    component.ngOnInit();

    photosListService.failedToLoadPhotos$.next(true);

    expect(window.alert).toHaveBeenCalledWith(
      'Could not load more photos. Please try again later'
    );
  });

  it('should unsubscribe from observables on component destruction', () => {
    const destroySpy = spyOn(component['_destroy$'], 'next');

    fixture.destroy();

    expect(destroySpy).toHaveBeenCalledWith(true);
  });
});
